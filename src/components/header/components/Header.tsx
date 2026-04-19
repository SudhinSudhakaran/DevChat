import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { goBack } from "../../../utils/NavigationUtils.tsx";
import { Colors } from "../../../constants/index.ts";

interface Props {
    title?: string;
    showBack?: boolean;
    rightComponent?: React.ReactNode;
}

const Header: React.FC<Props> = ({
    title = "",
    showBack = true,
    rightComponent,
}) => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Left (Back Button) */}
            <View style={styles.left}>
                {showBack && (
                    <TouchableOpacity onPress={() => goBack()}>
                        <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY_COLOR} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Title */}
            <View style={styles.center}>
                <Text style={styles.title}>{title}</Text>
            </View>

            {/* Right */}
            <View style={styles.right}>{rightComponent}</View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        height: 60,

        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,

    },
    left: {
        width: 40,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    center: {
        flex: 1,
        alignItems: "center",
    },
    right: {
        width: 40,
        alignItems: "flex-end",
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});