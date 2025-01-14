import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import MoviecardComponent from '../components/MoviecardComponent';
import { getNowPlayingMovies, getUpcomingMovies, getTopRated } from '../services/movieService';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeOut, SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [nowPlayingMovies, setNowPlayingMovies] = useState({});
    const [upcomingMovies, setUpcomingMovies] = useState({});
    const [topratedMovies, setTopratedMovies] = useState({});
    const [likedMovies, setLikedMovies] = useState([]);

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

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    const handleLikeToggle = (movie) => {
        console.log('Movie received in handleLikeToggle:', movie); // Log the received movie details
        setLikedMovies((prevMovies) => {
            const isAlreadyLiked = prevMovies.some((item) => item.id === movie.id);

            if (isAlreadyLiked) {
                console.log('Unliked:', movie); // Log details of the unliked movie
                return prevMovies.filter((item) => item.id !== movie.id);
            } else {
                console.log('Liked:', movie); // Log details of the liked movie
                return [...prevMovies, movie];
            }
        });
    };


    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent onPress={handleProfilePress} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <ImageBackground
                    source={{ uri: 'https://image.tmdb.org/t/p/original/path-to-hero-image.jpg' }}
                    style={styles.heroBanner}
                    imageStyle={styles.heroImage}
                >
                    <Text style={styles.heroTitle}>Featured Movie</Text>
                    <TouchableOpacity
                        style={styles.heroButton}
                        onPress={() => navigation.navigate('movie', { movieId: 123 })} // Replace with dynamic movie ID
                    >
                        <Text style={styles.heroButtonText}>Watch Now</Text>
                    </TouchableOpacity>
                </ImageBackground>
                <Animated.Text
                    style={styles.sectionTitle}
                >
                    Upcoming Movies
                </Animated.Text>
                <FlatList
                    data={upcomingMovies.results}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <View style={styles.movieCardContainer}>
                            <MoviecardComponent
                                title={item.title}
                                voteAverage={item.vote_average}
                                poster={item.poster_path}
                                voteCount={item.vote_count}
                                onPress={() => navigation.navigate("movie", { movieId: item.id })}
                                onLikeToggle={() => handleLikeToggle(item)}
                                isLiked={likedMovies.some((likedItem) => likedItem.id === item.id)}
                            />
                        </View>
                    )}
                />
                <Animated.Text
                    style={styles.sectionTitle}
                    entering={SlideInUp.duration(600)}
                    exiting={SlideOutUp.duration(500)}
                >
                    Top Rated Movies
                </Animated.Text>
                <FlatList
                    data={topratedMovies.results}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <View style={styles.movieCardContainer}>
                            <MoviecardComponent
                                title={item.title}
                                voteAverage={item.vote_average}
                                poster={item.poster_path}
                                voteCount={item.vote_count}
                                onPress={() => navigation.navigate("movie", { movieId: item.id })}
                                onLikeToggle={() => handleLikeToggle(item)}
                                isLiked={likedMovies.some((likedItem) => likedItem.id === item.id)}
                            />
                        </View>
                    )}
                />
                <Animated.Text
                    style={styles.sectionTitle}
                    entering={SlideInUp.duration(600)}
                    exiting={SlideOutUp.duration(500)}
                >
                    Now Playing
                </Animated.Text>
                <FlatList
                    data={nowPlayingMovies.results}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <View style={styles.movieCardContainer}>
                            <MoviecardComponent
                                title={item.title}
                                voteAverage={item.vote_average}
                                poster={item.poster_path}
                                voteCount={item.vote_count}
                                onPress={() => navigation.navigate("movie", { movieId: item.id })}
                                onLikeToggle={() => handleLikeToggle(item)}
                                isLiked={likedMovies.some((likedItem) => likedItem.id === item.id)}
                            />
                        </View>
                    )}
                />
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
        marginHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
        marginBottom: 10,
    },
    movieCardContainer: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    heroBanner: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        overflow: 'hidden',
    },
    heroImage: {
        opacity: 0.6,
    },
    heroTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    heroButton: {
        backgroundColor: '#E50914',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 5,
    },
    heroButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HomeScreen;



{/* <FlatList
                    data={Genres}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
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
                    contentContainerStyle={styles.genreList}
                /> */}
