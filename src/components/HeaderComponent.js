import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, StatusBar } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const HeaderComponent = ({ onSearch, onPress }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery);
        }
    };

    useEffect(() => {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('#212121');  // Dark Gray
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Profile Icon on the Left */}
                <TouchableOpacity style={styles.profileIcon}>
                    <AntDesign name="user" size={24} color="#fff" />
                    <Text style={styles.username}>John Doe</Text> {/* Username */}
                </TouchableOpacity>

                {/* Bookmark Icon on the Right */}
                <TouchableOpacity style={styles.bookmarkIcon}>
                    <MaterialIcons name="bookmark" size={24} color="#28A745" /> {/* Green for bookmark */}
                </TouchableOpacity>
            </View>

            {/* Search Input below Profile and Bookmark Icons */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Movies"
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
                    <MaterialIcons name="search" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#212121',  // Dark Gray background
        height: 140,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 40,
    },
    profileIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        marginLeft: 10,
        color: '#B0B0B0',  // Light Gray text for the username
        fontSize: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',  // Dark background for search input
        borderRadius: 20,
        height: 40,
        marginTop: 20, // Added margin to create space below the profile and bookmark icons
        marginHorizontal: 15, // Space between search input and screen edges
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#333',  // Dark background for the input field
        color: '#fff',  // White text inside the input field
        paddingLeft: 15,
        fontSize: 16,
    },
    searchIcon: {
        position: 'absolute',
        right: 10,
    },
    bookmarkIcon: {
    // Bookmark icon with a vibrant green color
    },
});

export default HeaderComponent;

