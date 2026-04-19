import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Components } from '../../../components';
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









  useFocusEffect(
    useCallback(() => {
      if (!userDetails?.uid) return;

      // ─────────────────────────────────────────────
      // 1️⃣ Friend Requests (Incoming)
      // ─────────────────────────────────────────────
      const requestsQuery = query(
        friendRequestRef,
        where("toUserId", "==", userDetails.uid),
        where("status", "==", "pending")
      );

      const unsubRequests = onSnapshot(requestsQuery, (snapshot) => {
        const requests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("📥 Friend Requests:", requests);
        setFriendRequestList(requests);
      });

      // ─────────────────────────────────────────────
      // Shared state for Users List
      // ─────────────────────────────────────────────
      let friendIds: string[] = [];
      let sentToIds: string[] = [];
      let allUsers: any[] = [];

      const rebuild = () => {
        const excludeIds = new Set([
          userDetails.uid,
          ...friendIds,
          ...sentToIds,
        ]);

        const filtered = allUsers.filter(
          (u: any) => !excludeIds.has(u.uid)
        );

        setUsersList(filtered);
      };

      // ─────────────────────────────────────────────
      // 2️⃣ Friends List Listener
      // ─────────────────────────────────────────────
      const unsubFriends = onSnapshot(
        query(friendsListRef, where("users", "array-contains", userDetails.uid)),
        (snap) => {
          friendIds = snap.docs.flatMap(doc => {
            const users: string[] = doc.data().users || [];
            return users.filter(uid => uid !== userDetails.uid);
          });
          rebuild();
        }
      );

      // ─────────────────────────────────────────────
      // 3️⃣ Sent Requests Listener
      // ─────────────────────────────────────────────
      const unsubSent = onSnapshot(
        query(
          friendRequestRef,
          where("fromUserId", "==", userDetails.uid),
          where("status", "==", "pending")
        ),
        (snap) => {
          sentToIds = snap.docs.map(doc => doc.data().toUserId);
          rebuild();
        }
      );

      // ─────────────────────────────────────────────
      // 4️⃣ Users List (One-time fetch)
      // ─────────────────────────────────────────────
      getDocs(usersRef).then(snapshot => {
        allUsers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        rebuild();
      });

      // ✅ Cleanup when screen loses focus
      return () => {
        unsubRequests();
        unsubFriends();
        unsubSent();
      };

    }, [userDetails?.uid])
  );

  const onPressUser = (user: any, isFrom: IS_FROM) => {
    navigate("FriendsDetails", { user, isFrom });
  };

  return (
    <Components.Background>
      <Components.SafeAreaContainer>
        <View style={{ flex: 1, backgroundColor: "#0F172A", }}>
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

