import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import { Components } from "../../../components";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "../../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/Store";

import {
    doc,
    deleteDoc,
    setDoc,
    Timestamp,
} from "firebase/firestore";

import { db } from "../../../../firebase/firebaseConfig";
import { IS_FROM } from "../../../constants/enums/Enums";
import { checkErrorMessage } from "../../../helpers/errorHandler/checkErrorMessage";
import { goBack } from "../../../utils/NavigationUtils";

interface User {
    id?: string; // optional (don't use this)
    name: string;
    email: string;
    profile_pic?: string;
    uid: string; // ✅ always use this
    about?: string;
    request_sender_id?: string;
}

interface Props {
    route: {
        params: {
            user: User;
            isFrom: IS_FROM;
            getFriendRequestList: () => void;
        };
    };
}

const FriendDetails: React.FC<Props> = ({ route }) => {
    const { user, isFrom, getFriendRequestList } = route.params;

    const userDetails = useSelector((state: RootState) => state.user?.userDetails);

    // =========================================================
    // ✅ SEND FRIEND REQUEST
    // =========================================================
    const addUserToFriends = async (data: User) => {
        try {
            if (!userDetails?.uid) return;

            const senderId = userDetails.uid;
            const receiverId = data.uid;

            const friendRequest = {
                name: userDetails.name,
                email: userDetails.email,
                profile_pic: userDetails.profile_pic || "",
                request_sender_id: senderId,
                request_receiver_id: receiverId,
                createdAt: Timestamp.now(),
            };

            /**
             * 🔥 STRUCTURE:
             * friendRequests
             *   └── receiverId
             *         └── requestList
             *               └── senderId (DOC ID)
             */

            await setDoc(
                doc(db, "friendRequests", receiverId, "requestList", senderId),
                friendRequest
            );

            console.log("✅ Friend request sent");
        } catch (error) {
            console.log("❌ Error sending request:", error);
        }
    };

    // =========================================================
    // ✅ ACCEPT FRIEND REQUEST
    // =========================================================
    const acceptFriendRequest = async (data: User) => {

        console.log('Data:', data)


        try {
            if (!userDetails?.uid) return;

            const currentUserId = userDetails.uid;
            const otherUserId = data?.id; // ✅ FIXED (was data.id ❌)

            /**
             * 🔥 Create friend object for both users
             */
            const currentUserData = {
                name: userDetails.name || "",
                email: userDetails.email || "",
                profile_pic: userDetails.profile_pic || "",
                uid: currentUserId,
                createdAt: Timestamp.now(),
            };

            const otherUserData = {
                name: data.name || "",
                email: data.email || "",
                profile_pic: data.profile_pic || "",
                uid: otherUserId,
                createdAt: Timestamp.now(),
            };
            console.log("DEBUG IDS:", {
                currentUserId,
                otherUserId,
                data
            });
            /**
             * 🔥 STRUCTURE:
             * friendList
             *   └── userId
             *         └── friends
             *               └── friendId
             */

            // Add friend to current user
            await setDoc(
                doc(db, "friendList", currentUserId, "friends", otherUserId),
                otherUserData
            );

            // Add current user to other user
            await setDoc(
                doc(db, "friendList", otherUserId, "friends", currentUserId),
                currentUserData
            );

            console.log("✅ Friend added successfully");

            // 🔥 Remove request after accepting
            await removeAcceptedUserFromFriendRequest(currentUserId, otherUserId);

        } catch (error) {
            console.log("❌ Error accepting request:", error);
            checkErrorMessage(error);
        }
    };

    // =========================================================
    // ✅ REMOVE REQUEST (AFTER ACCEPT / REJECT)
    // =========================================================
    const removeAcceptedUserFromFriendRequest = async (
        currentUserId: string,
        otherUserId: string
    ) => {
        try {
            /**
             * 🔥 Same path used during creation
             */
            await deleteDoc(
                doc(db, "friendRequests", currentUserId, "requestList", otherUserId)
            );

            console.log("✅ Friend request removed");

            getFriendRequestList?.();
            goBack();

        } catch (error) {
            console.log("❌ Error removing request:", error);
        }
    };




    // =========================================================
    // ❌ REJECT REQUEST
    // =========================================================
    const rejectFriendRequest = async (data: User) => {
        try {
            if (!userDetails?.uid) return;

            const currentUserId = userDetails.uid;
            const otherUserId = data.uid;

            await deleteDoc(
                doc(db, "friendRequests", currentUserId, "requestList", otherUserId)
            );

            console.log("✅ Friend request rejected");

        } catch (error) {
            console.log("❌ Error rejecting request:", error);
        }
    };

    return (
        <Components.SafeAreaContainer>
            <Components.Header />
            <Components.SizedBox verticalSpace={4} />

            {/* Profile Image */}
            <View style={styles.imageContainer}>
                <Components.GetImage
                    source={user?.profile_pic || ""}
                    style={styles.image}
                    resizeMode="cover"
                />
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

            {/* ACTION BUTTONS */}
            {isFrom !== IS_FROM.FRIEND_REQUEST ? (
                <Components.RtlContainer style={{ paddingHorizontal: 8 }}>
                    <TouchableOpacity
                        onPress={() => addUserToFriends(user)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Add Friend</Text>
                    </TouchableOpacity>
                </Components.RtlContainer>
            ) : (
                <Components.RtlContainer style={{ paddingHorizontal: 8 }}>
                    <TouchableOpacity
                        onPress={() => acceptFriendRequest(user)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>

                    <Components.SizedBox horizontalSpace={4} />

                    <TouchableOpacity
                        onPress={() => rejectFriendRequest(user)}
                        style={[styles.button, { backgroundColor: "red" }]}
                    >
                        <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                </Components.RtlContainer>
            )}
        </Components.SafeAreaContainer>
    );
};

export default FriendDetails;

// =========================================================
// 🎨 STYLES
// =========================================================
const styles = StyleSheet.create({
    image: {
        width: responsiveWidth(40),
        height: responsiveWidth(40),
    },
    imageContainer: {
        width: responsiveWidth(40),
        height: responsiveWidth(40),
        borderRadius: responsiveWidth(60),
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#6200ee",
        alignSelf: "center",
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
        flex: 1,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});