import React from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import {Components} from "../../index.ts";
import GetImage from "../../getImage";

interface User {
    id: string;
    name: string;
    email: string;
    profile_pic?: string;
    uid: string;
}

interface Props {
    users: User[];
    onPressUser?: (user: User) => void;
}

const FriendRequestList: React.FC<Props> = ({ users, onPressUser }) => {
    const renderItem = ({ item }: { item: User }) => {
    console.log('item ====', item)
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => onPressUser?.(item)}
            >


                    <GetImage source={  item.profile_pic || '' } style={styles.avatar} />


                {/* User Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default FriendRequestList;

const styles = StyleSheet.create({
    list: {
        padding: 16,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#f5f5f5",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow:'hidden'
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#6200ee",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    infoContainer: {
        marginLeft: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
    },
    email: {
        fontSize: 13,
        color: "#666",
    },
});