import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Components } from '../../../components'
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db, friendRequestRef, usersRef } from '../../../../firebase/firebaseConfig';
import {navigate} from "../../../utils/NavigationUtils.tsx";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/Store.ts';
const FriendsScreen = () => {
  const userDetails = useSelector((state: RootState) => state.user?.userDetails);
const [usersList, setUsersList] = React.useState<any[]>([]);
const [friendList , setFriendList] = React.useState<any[]>([]);
console.log('userDetails.uid',userDetails.uid)
useEffect(() => {
 
  getFriendRequestList();

}, []);

const getFriendRequestList = async () => {
  try {

 
  if (!userDetails?.uid) return;

  const friendRequestDocRef = doc(friendRequestRef, userDetails.uid);
  const requestListRef = collection(friendRequestDocRef, 'requestList');

  const q = query(requestListRef, orderBy('createdAt', 'desc'));

  const snapshot = await getDocs(q);

  const requests = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
 
  console.log('Friend Requests:  ', requests);
  setFriendList(requests);
   getUsers(requests);
  } catch (error) {
    console.error("Error fetching friend requests:", error);
  }
}



const getUsers = async (requests: any[]) => {
  try {
    const querySnapshot = await getDocs(usersRef);

    // 👉 Extract all sender IDs from request list
    const requestSenderIds = requests.map(
      item => item.request_sender_id
    );

    const users = querySnapshot.docs
      .filter(doc => {
        const userData = doc.data();

        return (
          userData.uid !== userDetails?.uid && // exclude self
          !requestSenderIds.includes(userData.uid) // exclude requested users
        );
      })
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

    setUsersList(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
    const   onPressUser =(user)=>{
    navigate("FriendsDetails", { user });
  }
  return (
    <Components.Background>
     <Components.SafeAreaContainer>
      <Components.FriendRequestList users={friendList} onPressUser={onPressUser} />
<Components.UsersList users={usersList} onPressUser={onPressUser} />
  </Components.SafeAreaContainer>
  </Components.Background>
  )
}

export default FriendsScreen

const styles = StyleSheet.create({})