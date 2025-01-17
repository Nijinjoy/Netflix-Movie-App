import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { selectedGenre } from '../services/movieService';
import { StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

const ListingScreen = ({ route, navigation }) => {
    const { genreId } = route.params;
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true); // Set loading state when fetching data
                const response = await selectedGenre(genreId, page);
                if (page === 1) {
                    setMovies(response.data.results); // For page 1, reset the movies list
                } else {
                    setMovies((prevMovies) => [...prevMovies, ...response.data.results]); // Append movies for next pages
                }
            } catch (error) {
                console.error('Error fetching movies: ', error);
            } finally {
                setLoading(false); // Set loading state false when done
                setLoadingNext(false); // Set loadingNext false when done fetching next page
            }
        };

        fetchMovies();
    }, [genreId, page]);

    const handleLoadMore = () => {
        if (!loadingNext) {
            setLoadingNext(true);
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#00bcd4" // Set the status bar background to match the header
            />
            <LinearGradient
                colors={['#00bcd4', '#009688']}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Listing Screen</Text>
            </LinearGradient>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <FlatList
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <View style={styles.movieCardContainer}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                style={styles.movieImage}
                                resizeMode='cover'
                            />
                            <Text style={{ textAlign: "center" }}>{item.title}</Text>
                        </View>
                    )}
                    onEndReached={() => {
                        if (!loadingNext) {
                            setLoadingNext(true);
                            setPage((prevPage) => prevPage + 1);
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loadingNext ? (
                            <View style={styles.footerLoader}>
                                <ActivityIndicator size="large" color="#00bcd4" />
                            </View>
                        ) : null
                    }
                />
            </View>
        </View>
    );
};

export default ListingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        paddingTop: 30,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    backButton: {
        paddingLeft: 10,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 40,
        textAlign: 'center',
        flex: 1,
    },
    listContainer: {
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    movieCardContainer: {
        // marginRight: 15,
        padding: 10,
        width: width * 0.5,
        marginBottom: 15,
        alignItems: 'center',
    },
    movieImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    footerLoader: {
        marginVertical: 10,
        alignItems: 'center',
    },
});
