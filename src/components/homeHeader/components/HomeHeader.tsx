import React, { FC, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {
    responsiveScreenWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Colors, Fonts } from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface HomeHeaderProps { }

const HomeHeader: FC<HomeHeaderProps> = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.container}>
            {/* ── Row 1: Title + Icons ── */}
            <View style={styles.topRow}>
                <Text style={styles.title}>DevChat</Text>

                <View style={styles.iconRow}>
                    {/* QR / Grid icon */}
                    <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                        <MaterialCommunityIcons
                            name="grid"
                            size={22}
                            color={Colors.WHITE_COLOR}
                        />
                    </TouchableOpacity>

                    {/* Camera icon */}
                    <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                        <Ionicons
                            name="camera-outline"
                            size={22}
                            color={Colors.WHITE_COLOR}
                        />
                    </TouchableOpacity>

                    {/* More (kebab) icon */}
                    <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                        <Ionicons
                            name="ellipsis-vertical"
                            size={22}
                            color={Colors.WHITE_COLOR}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* ── Row 2: Search Bar ── */}
            <View style={styles.searchRow}>
                <View style={styles.searchContainer}>
                    <Ionicons
                        name="search-outline"
                        size={16}
                        color="#8A8A8E"
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#8A8A8E"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>
            </View>

            {/* ── Bottom glow line ── */}
            <View style={styles.line} />
        </View>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(100),
        backgroundColor: Colors.TAB_BACKGROUND_COLOR,
        paddingTop: 12,
        paddingBottom: 8,
    },

    /* ── Top row ── */
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    title: {
        color: Colors.WHITE_COLOR,
        fontSize: responsiveFontSize(2.6),

        letterSpacing: 0.3,
        fontFamily: Fonts.ORBITRON_EXTRABOLD,
        fontWeight: '800',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    iconBtn: {
        padding: 6,
    },

    /* ── Search row ── */
    searchRow: {
        paddingHorizontal: 12,
        marginBottom: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E2A35',   // slightly lighter than bg — matches WA dark search
        borderRadius: 100,
        paddingHorizontal: 10,
        height: 38,
    },
    searchIcon: {
        marginRight: 6,
    },
    searchInput: {
        flex: 1,
        color: Colors.WHITE_COLOR,
        fontSize: responsiveFontSize(1.8),
        paddingVertical: 0,   // removes extra Android padding
    },

    /* ── Glow divider ── */
    line: {
        width: responsiveScreenWidth(100),
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#22C55E',
        opacity: 0.45,
        shadowColor: '#22C55E',
        shadowOpacity: 0.6,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 6,
        marginTop: 5
    },
});