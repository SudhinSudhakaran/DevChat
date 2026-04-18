import { StyleSheet, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Components } from '../../../components'
import { query, where, onSnapshot, getDocs } from "firebase/firestore";
import { usersRef, friendRequestRef, friendsListRef } from '../../../../firebase/firebaseConfig';
import { navigate } from "../../../utils/NavigationUtils.tsx";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/Store.ts';
import { IS_FROM } from '../../../constants/enums/Enums.ts';

const FriendsScreen = () => {
  const userDetails = useSelector((state: RootState) => state.user?.userDetails);
  const [friendRequestList, setFriendRequestList] = React.useState<any[]>([]);
  const [usersList, setUsersList] = React.useState<any[]>([]);

  // Keep unsub functions in refs so we can clean up properly
  const unsubRequestsRef = useRef<(() => void) | null>(null);
  const unsubFriendsRef = useRef<(() => void) | null>(null);
  const unsubSentRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!userDetails?.uid) return;

    listenToFriendRequests();
    listenToUsersList();

    // Cleanup all listeners on unmount
    return () => {
      unsubRequestsRef.current?.();
      unsubFriendsRef.current?.();
      unsubSentRef.current?.();
    };
  }, [userDetails?.uid]);

  // ─────────────────────────────────────────────────────────────
  // 1️⃣  Real-time: incoming pending friend requests
  //     Fires instantly when someone sends / cancels a request
  // ─────────────────────────────────────────────────────────────
  const listenToFriendRequests = () => {
    const q = query(
      friendRequestRef,
      where("toUserId", "==", userDetails?.uid),
      where("status", "==", "pending")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("📥 Friend Requests:", requests);
      setFriendRequestList(requests);
    });

    unsubRequestsRef.current = unsub;
  };

  // ─────────────────────────────────────────────────────────────
  // 2️⃣  Real-time: "People You May Know"
  //     Two onSnapshot listeners share mutable refs so that
  //     whenever EITHER fires, the full filtered list re-renders.
  //
  //     Excludes:
  //       • self
  //       • already friends      (friendsList array-contains me)
  //       • I already requested  (friendRequest fromUserId == me, pending)
  //       • they requested me    (already shown in section above)
  // ─────────────────────────────────────────────────────────────
  const listenToUsersList = () => {
    // Mutable state shared between both listeners
    let friendIds: string[] = [];
    let sentToIds: string[] = [];
    let allUsers: any[] = [];

    const rebuild = () => {
      const excludeIds = new Set([
        userDetails?.uid,
        ...friendIds,
        ...sentToIds,
      ]);
      const filtered = allUsers.filter((u: any) => !excludeIds.has(u.uid));
      setUsersList(filtered);
    };

    // Listener A: my accepted friends
    const unsubFriends = onSnapshot(
      query(friendsListRef, where("users", "array-contains", userDetails?.uid)),
      (snap) => {
        friendIds = snap.docs.flatMap(doc => {
          const users: string[] = doc.data().users || [];
          return users.filter((uid: string) => uid !== userDetails?.uid);
        });
        rebuild();
      }
    );

    // Listener B: requests I already sent (pending)
    const unsubSent = onSnapshot(
      query(
        friendRequestRef,
        where("fromUserId", "==", userDetails?.uid),
        where("status", "==", "pending")
      ),
      (snap) => {
        sentToIds = snap.docs.map(doc => doc.data().toUserId);
        rebuild();
      }
    );

    // One-time fetch: base users list (static enough for a one-time load)
    getDocs(usersRef).then(snapshot => {
      allUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      rebuild();
    });

    unsubFriendsRef.current = unsubFriends;
    unsubSentRef.current = unsubSent;
  };

  const onPressUser = (user: any, isFrom: IS_FROM) => {
    navigate("FriendsDetails", { user, isFrom });
  };

  return (
    <Components.Background>
      <Components.SafeAreaContainer>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          {friendRequestList.length > 0 && (
            <Components.FriendRequestList
              friendList={friendRequestList}
              onPressUser={onPressUser}
            />
          )}
          <Components.UsersList
            users={usersList}
            onPressUser={onPressUser}
          />
        </View>
      </Components.SafeAreaContainer>
    </Components.Background>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});