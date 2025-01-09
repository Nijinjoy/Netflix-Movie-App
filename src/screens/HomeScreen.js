import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';

const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent />
            <FlatList
                data={Genres}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.genreItem}>
                        <Text style={styles.genreText}>{item}</Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.genreList}
            />
            {/* <View style={styles.content}>
                <Text>HomeScreen Content</Text>
            </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    genreList: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    genreItem: {
        width: 100,
        height: 30,
        marginRight: 10,
        paddingHorizontal: 15,
        // paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    genreText: {
        fontSize: 16,
        color: '#333',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
