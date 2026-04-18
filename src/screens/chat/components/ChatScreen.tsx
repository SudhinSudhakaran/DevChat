import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db, usersRef } from '../../../../firebase/firebaseConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/Store';
import { Components } from '../../../components';
import { navigate } from '../../../utils/NavigationUtils';

const ChatScreen = () => {
  const userDetails = useSelector((state: RootState) => state.user?.userDetails);


  const [friends, setFriends] = React.useState<any[]>([]);

  const userId = userDetails?.uid;

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = getFriendsList(userId, setFriends);

    return () => unsubscribe && unsubscribe(); // cleanup
  }, [userId]);


  const getFriendsList = (userId: string, callback: (data: any[]) => void) => {
    try {
      const friendsRef = collection(db, "friendList", userId, "friends");

      // 🔥 Real-time listener
      return onSnapshot(friendsRef, (snapshot) => {
        const friends: any[] = [];

        snapshot.forEach((doc) => {
          friends.push({
            id: doc.id, // friend uid
            ...doc.data(),
          });
        });

        console.log("✅ Friends List:", friends);
        callback(friends);
      });

    } catch (error) {
      console.log("❌ Error fetching friends:", error);
    }
  };
  const onPressUser = (user: any) => {
    navigate("MessageScreen", { user });
  }
  return (
    <Components.Background>
      <Components.SafeAreaContainer>
        <Components.UsersList users={friends} onPressUser={onPressUser} />
      </Components.SafeAreaContainer>
    </Components.Background>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})