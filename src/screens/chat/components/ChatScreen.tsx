import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { getDocs } from 'firebase/firestore';
import { usersRef } from '../../../../firebase/firebaseConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/Store';
import { Components } from '../../../components';
import { navigate } from '../../../utils/NavigationUtils';

const ChatScreen = () => {
  const userDetails = useSelector((state: RootState) => state.user?.userDetails);
  const [usersList, setUsersList] = React.useState<any[]>([]);

  useEffect(() => {
    getUsers();
  }, []);
  
  
  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(usersRef);
  
  const users = querySnapshot.docs
    .filter(doc => doc.data().uid !== userDetails?.uid)
    .map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  
     
      setUsersList(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
     const   onPressUser =(user:any)=>{
      navigate("MessageScreen", { user });
    }
  return (
    <Components.Background>
     <Components.SafeAreaContainer>
<Components.UsersList users={usersList} onPressUser={onPressUser} />
  </Components.SafeAreaContainer>
  </Components.Background>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})