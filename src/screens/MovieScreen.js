import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    Linking,
    Image,
    TouchableOpacity,
    FlatList,
    Pressable,
    StatusBar
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getMovieById, getPoster, getVideo, getMovieRecommendations, getMovieImages } from '../services/movieService';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MovieScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { movieId } = route.params;
    const [movie, setMovie] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const [movieImages, setMovieImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFullOverview, setShowFullOverview] = useState(false);

    useEffect(() => {
        getMovieById(movieId)
            .then((response) => {
                setMovie(response?.data);
                return getMovieRecommendations(movieId);
            })
            .then((response) => {
                setRecommendations(response?.data?.results || []);
                return getMovieImages(movieId);
            })
            .then((response) => {
                setMovieImages(response?.data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [movieId]);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleSharePress = () => {
        console.log('Share button pressed');
    };

    const handleBookmarkPress = () => {
        console.log('Bookmark button pressed');
    };

    const handlePlayPress = () => {
        console.log('Play button pressed');
    };

    const handleDownloadPress = () => {
        console.log('Download button pressed');
    };

    const truncatedOverview = movie?.overview?.length > 80 ? movie?.overview?.substring(0, 80) + '...' : movie?.overview;

    const toggleOverview = () => {
        setShowFullOverview((prevState) => !prevState);
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#E50914" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <ImageBackground
                source={{ uri: getPoster(movie?.backdrop_path) }}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Icon name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.movieInfoContainer}>
                <View style={styles.movieHeader}>
                    <Text style={styles.movieTitle}>{movie?.title}</Text>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={handleSharePress}>
                            <Icon name="share" size={28} color="#fff" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleBookmarkPress}>
                            <Icon name="bookmark-border" size={28} color="#fff" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
                        <Icon name="play-arrow" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadPress}>
                        <Icon name="file-download" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Download</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.movieOverview}>
                    {showFullOverview ? movie?.overview : truncatedOverview}
                </Text>
                {movie?.overview?.length > 80 && !showFullOverview && (
                    <TouchableOpacity onPress={toggleOverview}>
                        <Text style={styles.readMore}>Read more</Text>
                    </TouchableOpacity>
                )}
                {showFullOverview && (
                    <TouchableOpacity onPress={toggleOverview}>
                        <Text style={styles.readMore}>Read less</Text>
                    </TouchableOpacity>
                )}
            </View>
            {recommendations.length > 0 && (
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Recommendations</Text>
                    <FlatList
                        data={recommendations}
                        horizontal
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.recommendationCard}>
                                <Image
                                    source={{ uri: getPoster(item?.poster_path) }}
                                    style={styles.recommendationImage}
                                />
                                <Text style={styles.recommendationText}>{item?.title}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            )}
            <View style={styles.movieDetails}>
                <Text style={styles.detailsText}>Rating: {movie?.vote_average} ({movie?.vote_count} votes)</Text>
                <Text style={styles.detailsText}>Status: {movie?.status}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    imageBackground: {
        width: '100%',
        height: 300,
        justifyContent: 'flex-end',
        paddingTop: StatusBar.currentHeight,
        borderBottomLeftRadius: 50
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 16,
        zIndex: 1,
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 24, 
    },
    movieInfoContainer: {
        padding: 16,
        backgroundColor: '#141414',
    },
    movieHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    movieTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 16,
    },
    movieOverview: {
        fontSize: 16,
        color: '#ccc',
        marginTop: 8,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141414',
    },
    readMore: {
        fontSize: 16,
        color: '#E50914',
        marginTop: 0,
        textDecorationLine: 'underline',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    playButton: {
        backgroundColor: '#E50914',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 24,
        width: '48%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "center"
    },
    downloadButton: {
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 0,
        borderRadius: 24,
        width: '48%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8
    },
    sectionContainer: {
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10
    },
    recommendationCard: {
        marginRight: 16,
        alignItems: 'center',
    },
    recommendationImage: {
        width: 150,
        height: 180,
        borderRadius: 8,
        marginTop: 10
    },
    recommendationText: {
        fontSize: 14,
        color: '#fff',
        marginTop: 8,
        width: 150,
        textAlign: 'center',
    },
    movieDetails: {
        marginTop: 16,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingHorizontal: 16,
    },
    detailsText: {
        color: '#ccc',
        fontSize: 16,
        marginBottom: 4,
    },
});

export default MovieScreen;
