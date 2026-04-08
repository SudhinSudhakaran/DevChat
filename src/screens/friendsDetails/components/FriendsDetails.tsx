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
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
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
        };
    };
}

const FriendDetails: React.FC<Props> = ({ route }) => {
    const { user } = route.params;
 
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
    const friendRequestRef = collection(docRef, 'requestList');

    // Add document
    await addDoc(friendRequestRef, friendRequest);

    console.log('Friend request sent successfully');
  } catch (error) {
    console.log('Error sending friend request:', error);
  }
};



    
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
            <Components.RtlContainer  >
                <TouchableOpacity onPress={() => addUserToFriends(user)} style={styles.button}>
                    <Text style={styles.buttonText}>Add Friend</Text>
                </TouchableOpacity>
                <Components.SizedBox horizontalSpace={4} />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Block</Text>
                </TouchableOpacity>
            </Components.RtlContainer>
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