import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import MoviecardComponent from '../components/MoviecardComponent';
import { getNowPlayingMovies, getUpcomingMovies, getTopRated } from '../services/movieService';
import { useNavigation } from '@react-navigation/native';

const Genres = ["All", "Upcoming", "Top-Rated"];

const HomeScreen = () => {
    const navigation = useNavigation();
    const [activeGenre, setActiveGenre] = useState("All");
    const [nowPlayingMovies, setNowPlayingMovies] = useState({});
    const [upcomingMovies, setUpcomingMovies] = useState({});
    const [topratedMovies, setTopratedMovies] = useState({});

    useEffect(() => {
        getNowPlayingMovies().then((movieResponse) =>
            setNowPlayingMovies(movieResponse.data)
        );
        getUpcomingMovies().then((movieResponse) =>
            setUpcomingMovies(movieResponse.data)
        );
        getTopRated().then((movieResponse) =>
            setTopratedMovies(movieResponse?.data)
        );
    }, []);

    const renderMovies = () => {
        switch (activeGenre) {
            case 'Upcoming':
                return (
                    <FlatList
                        data={upcomingMovies.results}
                        horizontal
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.movieCardContainer}
                                onPress={() => navigation.navigate("movie", { movieId: item.id })}
                            >
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                    style={styles.poster}
                                />
                            </TouchableOpacity>
                        )}
                    />
                );
            case 'Top-Rated':
                return (
                    <FlatList
                        data={topratedMovies.results}
                        horizontal
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.movieCardContainer}
                                onPress={() => navigation.navigate("movie", { movieId: item.id })}
                            >
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                    style={styles.poster}
                                />
                            </TouchableOpacity>
                        )}
                    />
                );
            default:
                return (
                    <ScrollView>
                        <Text style={styles.sectionTitle}>Upcoming Movies</Text>
                        <FlatList
                            data={upcomingMovies.results}
                            horizontal
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.movieCardContainer}
                                    onPress={() => navigation.navigate("movie", { movieId: item.id })}
                                >
                                    <Image
                                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                        style={styles.poster}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                        <Text style={styles.sectionTitle}>Top Rated Movies</Text>
                        <FlatList
                            data={topratedMovies.results}
                            horizontal
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.movieCardContainer}
                                    onPress={() => navigation.navigate("movie", { movieId: item.id })}
                                >
                                    <Image
                                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                        style={styles.poster}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>
                );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <FlatList
                    data={Genres}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.genreItem,
                                activeGenre === item && styles.activeGenre,
                            ]}
                            onPress={() => setActiveGenre(item)}
                        >
                            <Text
                                style={[
                                    styles.genreText,
                                    activeGenre === item && styles.activeGenreText,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.genreList}
                />
                {renderMovies()}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    genreList: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    genreItem: {
        height: 40,
        marginRight: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#333',
        justifyContent: 'center',
    },
    activeGenre: {
        backgroundColor: '#E50914',
    },
    genreText: {
        fontSize: 14,
        color: '#FFF',
        textTransform: 'capitalize',
    },
    activeGenreText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginHorizontal: 15,
        marginTop: 20,
    },
    movieCardContainer: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    poster: {
        width: 120,
        height: 180,
        borderRadius: 10,
    },
});

export default HomeScreen;
