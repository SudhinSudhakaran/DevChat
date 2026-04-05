import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,

} from "react-native";
import {Components} from "../../../components";
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

    return (
        <Components.SafeAreaContainer
        >
            <Components.Header />
            {/* Profile Image */}

                <Components.GetImage source={ user.profile_pic } style={styles.image} />


            {/* Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>

                <View style={styles.aboutContainer}>
                    <Text style={styles.aboutTitle}>About</Text>
                    <Text style={styles.aboutText}>
                        {user.about || "No details available"}
                    </Text>
                </View>
            </View>
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
        width: "100%",
        height: 250,
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
});