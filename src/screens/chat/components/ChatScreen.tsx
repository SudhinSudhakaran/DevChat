import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { usersRef, friendsListRef } from '../../../../firebase/firebaseConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/Store';
import { Components } from '../../../components';
import { navigate } from '../../../utils/NavigationUtils';
import { IS_FROM } from '../../../constants/enums/Enums';

/**
 * ✅ FIRESTORE COLLECTIONS (matches firebaseConfig.ts exports):
 *
 *  friendsList  (friendsListRef)  ← collection(db, "friendsList")
 *   └── {docId}
 *         users:     [userId1, userId2]
 *         createdAt: Timestamp
 *
 *  users  (usersRef)              ← collection(db, "users")
 *   └── {userId}
 *         uid:      string
 *         name:     string
 *         email:    string
 *         photoURL: string
 *
 * Query pattern:
 *   friendsList where users array-contains currentUserId
 *   → extract other uid → lookup in users collection
 */

const ChatScreen = () => {
  const userDetails = useSelector((state: RootState) => state.user?.userDetails);
  const [friends, setFriends] = React.useState<any[]>([]);

  useEffect(() => {
    if (!userDetails?.uid) return;

    const userId = userDetails.uid;

    // ✅ Real-time listener: all friendsList docs that include me
    const unsubscribe = onSnapshot(
      query(friendsListRef, where("users", "array-contains", userId)),
      async (snapshot) => {
        // Extract the OTHER person's uid from each doc
        const friendIds = snapshot.docs
          .map(doc => {
            const users: string[] = doc.data().users || [];
            return users.find((uid: string) => uid !== userId);
          })
          .filter(Boolean) as string[];

        if (friendIds.length === 0) {
          setFriends([]);
          return;
        }

        // Fetch all user profiles, then filter to only friends
        // (Firestore "in" limited to 30 — getDocs + client filter is fine here)
        const usersSnapshot = await getDocs(usersRef);
        const friendProfiles = usersSnapshot.docs
          .filter(doc => friendIds.includes(doc.data().uid))
          .map(doc => ({ id: doc.id, ...doc.data() }));

        setFriends(friendProfiles);
      }
    );

    return () => unsubscribe();
  }, [userDetails?.uid]);

  const onPressUser = (user: any) => {
    navigate("MessageScreen", { user });
  };

  return (
    <Components.Background>
      <Components.SafeAreaContainer>
        <View style={styles.container}>


          <Components.UsersList users={friends} onPressUser={onPressUser} isFrom={IS_FROM.CHAT_SCREEN} />
        </View>
      </Components.SafeAreaContainer>
    </Components.Background>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // dark futuristic

  }
});