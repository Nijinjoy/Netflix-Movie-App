import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const SettingsScreen = ({ route }) => {
    const likedMovies = route?.params?.likedMovies || [];


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liked Movies</Text>
            {likedMovies.length === 0 ? (
                <Text style={styles.noMovies}>No liked movies yet.</Text>
            ) : (
                <FlatList
                    data={likedMovies}
                    renderItem={({ item }) => (
                        <View style={styles.movieCard}>
                            <Text style={styles.movieTitle}>{item.title}</Text>
                            <Text>Rating: {item.vote_average}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noMovies: {
        fontSize: 16,
        color: 'gray',
    },
    movieCard: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SettingsScreen;

