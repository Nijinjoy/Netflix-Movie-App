import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import MoviecardComponent from '../components/MoviecardComponent';

const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent />
            <View style={styles.content}>
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
                <FlatList
                    data={Genres}
                    horizontal
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.movieCardContainer}>
                            <MoviecardComponent />
                        </View>
                    )}
                />
            </View>
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
        height: 40,
        marginRight: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        justifyContent: "center",
        marginTop: 10,
    },
    genreText: {
        fontSize: 16,
        color: '#333',
    },
    movieCardContainer: {
        marginHorizontal: 10,
        marginTop: 10,
    },
});

export default HomeScreen;
