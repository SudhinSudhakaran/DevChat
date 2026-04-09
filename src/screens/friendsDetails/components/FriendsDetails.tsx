import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,

} from "react-native";
import { Components } from "../../../components";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "../../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/Store";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import { db, friendRequestRef } from "../../../../firebase/firebaseConfig";
import { IS_FROM } from "../../../constants/enums/Enums";
import { checkErrorMessage } from "../../../helpers/errorHandler/checkErrorMessage";
import { goBack } from "../../../utils/NavigationUtils";
interface User {
    id: string;
    name: string;
    email: string;
    profile_pic?: string;
    uid: string;
    about?: string;
}

interface Props {
    route: {
        params: {
            user: User;
            isFrom: IS_FROM;
        };
    };
}

const FriendDetails: React.FC<Props> = ({ route }) => {
    const { user,isFrom } = route.params;
 
 const userDetails = useSelector((state: RootState) => state.user?.userDetails);


 
const addUserToFriends = async (data: User) => {
  try {
    console.log('User details', userDetails);

    if (!userDetails?.uid) {
      console.log('User not logged in');
      return;
    }

    const friendRequest = {
      name: userDetails.name,
      email: userDetails.email,
      profile_pic: userDetails.profile_pic,
      request_sender_id: userDetails.uid, // sender
      request_receiver_id: user.uid, // receiver
      createdAt: Timestamp.now(),
    };

    console.log('Friend request', friendRequest);

    // Reference: friendRequest/{receiverUid}/requestList
    const docRef = doc(db, 'friendRequest', data.uid);
   

    // Add document
    await addDoc(friendRequestRef, friendRequest);

    console.log('Friend request sent successfully');
  } catch (error) {
    console.log('Error sending friend request:', error);
  }
};

 const acceptFriendRequest = async (data: User) => {

    console.log('Accepting friend request from:', data);
  try {
    if (!userDetails?.uid) {
      console.log('❌ current user uid missing');
      return;
    }

    if (!data?.id) {
      console.log('❌ other user uid missing', data);
      return;
    }

    const currentUserId = userDetails.uid;
    const otherUserId = data.id;

    console.log('✅ currentUserId:', currentUserId);
    console.log('✅ otherUserId:', otherUserId);

    const user1 = {
      name: userDetails?.name || '',
      email: userDetails?.email || '',
      profile_pic: userDetails?.profile_pic || '',
      uid: currentUserId,
      createdAt: Timestamp.now(),
    };

    const user2 = {
      name: data?.name || '',
      email: data?.email || '',
      profile_pic: data?.profile_pic || '',
      uid: otherUserId,
      createdAt: Timestamp.now(),
    };

    console.log('✅ user1 (current user):', user1);
    console.log('✅ user2 (other user):', user2);

    // ✅ Add both sides
    await setDoc(
      doc(db, 'friendList', currentUserId, 'friends', otherUserId),
      user2
    );

    await setDoc(
      doc(db, 'friendList', otherUserId, 'friends', currentUserId),
      user1
    );
  

    console.log('✅ Friend request accepted');
    removeAcceptedUserFromFriendRequest(currentUserId, otherUserId);
  } catch (error) {
    console.log('❌ Error accepting friend request:', error);
    checkErrorMessage(error);
  }
};

 const removeAcceptedUserFromFriendRequest = async (currentUserId: string, otherUserId: string) => {
    try {
          // 🔹 OPTIONAL: remove friend request
    await deleteDoc(
      doc(db, 'friendRequests', currentUserId, 'requestList', otherUserId)
    );
    goBack()
    } catch (error) {
        console.log('❌ Error removing friend request:', error);
    }
      }

const rejectFriendRequest = async (data: User) => {
    try {
        if (!userDetails?.uid) {
            console.log('User not logged in');
            return;
        }

        const currentUserId = userDetails.uid;
        const otherUserId = data.id;

        // Remove the friend request document
        await deleteDoc(
            doc(db, 'friendRequests', currentUserId, 'requestList', otherUserId)
        );

        console.log('Friend request rejected successfully');
    } catch (error) {
        console.log('Error rejecting friend request:', error);
    }
}


    return (
        <Components.SafeAreaContainer
        >
            <Components.Header />
            <Components.SizedBox verticalSpace={4} />
            {/* Profile Image */}
            <View style={styles.imageContainer}>
                <Components.GetImage source={user?.profile_pic || ""} style={styles.image} resizeMode="cover" />
            </View>


            {/* Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.email}>{user?.email}</Text>

                <View style={styles.aboutContainer}>
                    <Text style={styles.aboutTitle}>About</Text>
                    <Text style={styles.aboutText}>
                        {user.about || "No details available"}
                    </Text>
                </View>

            </View>



{isFrom !== IS_FROM.FRIEND_REQUEST ?
            <Components.RtlContainer style={{paddingHorizontal:8}}  >
                <TouchableOpacity onPress={() => addUserToFriends(user)} style={styles.button}>
                    <Text style={styles.buttonText}>Add Friend</Text>
                </TouchableOpacity>
                <Components.SizedBox horizontalSpace={4} />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Block</Text>
                </TouchableOpacity>
            </Components.RtlContainer>
            :
               <Components.RtlContainer style={{paddingHorizontal:8}}  >
                <TouchableOpacity onPress={() => acceptFriendRequest(user)} style={styles.button}>
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <Components.SizedBox horizontalSpace={4} />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
            </Components.RtlContainer>
        
        
        
        }




        </Components.SafeAreaContainer>
    );
};

export default FriendDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    image: {
        width: responsiveWidth(40),
        height: responsiveWidth(40),

    }, imageContainer: {
        width: responsiveWidth(40),
        height: responsiveWidth(40),
        borderRadius: responsiveWidth(60),
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#6200ee",
        alignSelf: "center",
    },
    placeholder: {
        width: "100%",
        height: 250,
        backgroundColor: "#6200ee",
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        fontSize: 50,
        color: "#fff",
        fontWeight: "bold",
    },
    detailsContainer: {
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
    },
    email: {
        fontSize: 16,
        color: "#666",
        marginTop: 4,
    },
    aboutContainer: {
        marginTop: 20,
    },
    aboutTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 6,
    },
    aboutText: {
        fontSize: 14,
        color: "#444",
    },
    button: {
        backgroundColor: Colors.PRIMARY_COLOR,
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
        flex: 1
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});