import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import { Components } from "../../../components";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "../../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/Store";
import {
    query,
    where,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    Timestamp,
} from "firebase/firestore";
import { db, friendRequestRef, friendsListRef } from "../../../../firebase/firebaseConfig";
import { IS_FROM } from "../../../constants/enums/Enums";
import { goBack } from "../../../utils/NavigationUtils";

/**
 * ✅ FIRESTORE COLLECTIONS (matches firebaseConfig.ts exports):
 *
 *  friendRequest  (friendRequestRef)  ← collection(db, "friendRequest")
 *   └── {docId}
 *         fromUserId:       string
 *         toUserId:         string
 *         status:           "pending" | "accepted" | "rejected"
 *         senderName:       string
 *         senderEmail:      string
 *         senderProfilePic: string
 *         createdAt:        Timestamp
 *
 *  friendsList  (friendsListRef)      ← collection(db, "friendsList")
 *   └── {docId}
 *         users:     [userId1, userId2]
 *         createdAt: Timestamp
 */

interface User {
    id?: string;
    name: string;
    email: string;
    profile_pic?: string;
    uid: string;
    about?: string;
    fromUserId?: string; // populated when navigating from a friend request
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
    const { user, isFrom } = route.params;
    const userDetails = useSelector((state: RootState) => state.user?.userDetails);

    // =========================================================
    // ✅ SEND FRIEND REQUEST
    //    Writes one doc to friendRequest collection.
    //    FriendsScreen's outgoing-pending listener auto-hides
    //    this user from "People You May Know" immediately.
    // =========================================================
    const addUserToFriends = async (data: User) => {
        try {
            if (!userDetails?.uid) return;

            // Guard: prevent duplicate pending requests
            const duplicateQuery = query(
                friendRequestRef,
                where("fromUserId", "==", userDetails.uid),
                where("toUserId", "==", data.uid),
                where("status", "==", "pending")
            );
            const duplicateSnap = await getDocs(duplicateQuery);
            if (!duplicateSnap.empty) {
                console.log("⚠️ Request already sent");
                goBack();
                return;
            }

            await addDoc(friendRequestRef, {
                fromUserId: userDetails.uid,
                toUserId: data.uid,
                status: "pending",
                // Denormalised sender info so receiver can display it
                // without an extra users lookup
                senderName: userDetails.name || "",
                senderEmail: userDetails.email || "",
                senderProfilePic: userDetails.profile_pic || "",
                createdAt: Timestamp.now(),
            });

            console.log("✅ Friend request sent");
            goBack();
        } catch (error) {
            console.log("❌ Error sending request:", error);
        }
    };

    // =========================================================
    // ✅ ACCEPT FRIEND REQUEST
    //    1. Find the pending request doc (fromUserId → toUserId)
    //    2. Update its status → "accepted"
    //    3. Create one doc in friendsList with users: [id1, id2]
    //
    //    After step 2:
    //      • FriendsScreen incoming-requests listener drops it (status != pending)
    //    After step 3:
    //      • ChatScreen friends listener picks up the new friendship
    //      • FriendsScreen "People You May Know" listener drops the user
    // =========================================================
    const acceptFriendRequest = async (data: User) => {
        try {
            if (!userDetails?.uid) return;

            const currentUserId = userDetails.uid;
            // fromUserId is who SENT the request (the other person)
            const otherUserId = data.fromUserId || data.uid;

            // Step 1: locate the pending request document
            const requestQuery = query(
                friendRequestRef,
                where("fromUserId", "==", otherUserId),
                where("toUserId", "==", currentUserId),
                where("status", "==", "pending")
            );
            const requestSnap = await getDocs(requestQuery);

            if (requestSnap.empty) {
                console.log("❌ No pending request found");
                return;
            }

            // Step 2: mark request as accepted
            await updateDoc(
                doc(db, "friendRequest", requestSnap.docs[0].id),
                { status: "accepted" }
            );

            // Step 3: create the bi-directional friendship entry
            await addDoc(friendsListRef, {
                users: [currentUserId, otherUserId],
                createdAt: Timestamp.now(),
            });

            console.log("✅ Friend request accepted");
            goBack();
        } catch (error) {
            console.log("❌ Error accepting request:", error);
        }
    };

    // =========================================================
    // ❌ REJECT FRIEND REQUEST
    //    Updates status → "rejected".
    //    FriendsScreen incoming-requests listener auto-removes it
    //    because the query filters on status == "pending".
    //    The rejected user reappears in "People You May Know"
    //    automatically (no longer in pending requests).
    // =========================================================
    const rejectFriendRequest = async (data: User) => {
        try {
            if (!userDetails?.uid) return;

            const otherUserId = data.fromUserId || data.uid;

            const requestQuery = query(
                friendRequestRef,
                where("fromUserId", "==", otherUserId),
                where("toUserId", "==", userDetails.uid),
                where("status", "==", "pending")
            );
            const requestSnap = await getDocs(requestQuery);

            if (requestSnap.empty) {
                console.log("❌ No pending request found");
                return;
            }

            await updateDoc(
                doc(db, "friendRequest", requestSnap.docs[0].id),
                { status: "rejected" }
            );

            console.log("✅ Friend request rejected");
            goBack();
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