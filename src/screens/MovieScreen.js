import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Share,
    StatusBar,
    Modal,
    Linking,
    Image,
} from 'react-native';
import Video from 'react-native-video';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getMovieById, getPoster, getMovieRecommendations, getMovieImages, getMovieTrailer } from '../services/movieService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const MovieScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { movieId } = route.params;
    const [movie, setMovie] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const [movieImages, setMovieImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFullOverview, setShowFullOverview] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');

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

    const handleSharePress = async () => {
        try {
            const message = `Check out this movie:
- Title: ${movie?.title}
- Rating: ${movie?.vote_average} (${movie?.vote_count} votes)
- Status: ${movie?.status}
- Runtime: ${convertRuntime(movie?.runtime)}
Discover more at: https://www.themoviedb.org/movie/${movie?.id}`;
            const result = await Share.share({
                message: message,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared with activity type:', result.activityType);
                } else {
                    console.log('Shared successfully!');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed.');
            }
        } catch (error) {
            console.error('Error sharing movie details:', error.message);
        }
    };

    const handleBookmarkPress = () => {
        console.log('Bookmark button pressed');
    };

    const handlePlayPress = async () => {
        try {
            const response = await getMovieTrailer(movieId);
            const trailers = response?.data?.results || [];
            const trailer = trailers.find((item) => item.type === 'Trailer' && item.site === 'YouTube');

            if (trailer) {
                const youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
                Linking.openURL(youtubeUrl);  // Opens the YouTube URL directly in the browser
            } else {
                console.log('No trailer available.');
                alert('Trailer not available for this movie.');
            }
        } catch (error) {
            console.error('Error fetching movie trailer:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setTrailerUrl('');
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
            <View style={styles.container}>
                <ShimmerPlaceholder
                    style={styles.shimmerImage}
                    shimmerColors={['#333', '#444', '#555']}
                />
                <View style={styles.shimmerTextContainer}>
                    <ShimmerPlaceholder
                        style={styles.shimmerTitle}
                        shimmerColors={['#333', '#444', '#555']}
                    />
                    <ShimmerPlaceholder
                        style={styles.shimmerButton}
                        shimmerColors={['#333', '#444', '#555']}
                    />
                    <ShimmerPlaceholder
                        style={styles.shimmerOverview}
                        shimmerColors={['#333', '#444', '#555']}
                    />
                </View>
            </View>
        );
    }


    const convertRuntime = (runtime) => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Fixed section */}
            <ImageBackground
                source={{ uri: getPoster(movie?.backdrop_path) }}
                style={[styles.imageBackground, { borderBottomLeftRadius: 30, overflow: 'hidden', borderBottomRightRadius: 30 }]}
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

            {/* Scrollable content */}
            <ScrollView contentContainerStyle={styles.scrollableContent}>
                <View style={styles.movieDetails}>
                    <Text style={styles.detailsText}>Rating: {movie?.vote_average} ({movie?.vote_count} votes)</Text>
                    <Text style={styles.detailsText}>Status: {movie?.status}</Text>
                    <Text style={styles.detailsText}>Release Date: {movie?.release_date}</Text>
                    <Text style={styles.detailsText}>Revenue: ${movie?.revenue?.toLocaleString()}</Text>
                    {movie?.runtime && (
                        <Text style={styles.detailsText}>
                            Runtime: {convertRuntime(movie?.runtime)}
                        </Text>
                    )}
                    <Text style={styles.detailsText}>Language: {movie?.spoken_languages?.[0]?.name}</Text>
                    <View style={styles.genreContainer}>
                        <Text style={styles.sectionTitle}>Genres</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {movie?.genres?.map((genre) => (
                                <View key={genre.id} style={styles.genreChip}>
                                    <Text style={styles.genreText}>{genre.name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
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
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    imageBackground: {
        width: '100%',
        height: 250,
        justifyContent: 'flex-end',
        paddingTop: StatusBar.currentHeight,
        borderBottomLeftRadius: 50,
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
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        marginLeft: 16,
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
    movieOverview: {
        fontSize: 16,
        color: '#fff',
        marginTop: 10,
    },
    readMore: {
        color: '#E50914',
        textDecorationLine: 'underline',
    },
    scrollableContent: {
        paddingBottom: 0,
    },
    movieDetails: {
        paddingHorizontal: 16,
    },
    detailsText: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 4,
    },
    genreContainer: {
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    genreChip: {
        backgroundColor: '#333',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 8,
    },
    genreText: {
        color: '#fff',
    },
    recommendationCard: {
        marginRight: 16,
        width: 120,
    },
    recommendationImage: {
        width: '100%',
        height: 180,
        borderRadius: 8,
    },
    recommendationText: {
        color: '#fff',
        marginTop: 15,
        textAlign: 'center',
    },
    sectionContainer: {
        paddingHorizontal: 16,
        marginTop: 10
    },
    shimmerImage: { width: '100%', height: 250 },
    shimmerTextContainer: { padding: 16 },
    shimmerTitle: { height: 20, width: '70%', marginBottom: 8, borderRadius: 4 },
    shimmerButton: { height: 40, width: '40%', marginBottom: 8, borderRadius: 20 },
    shimmerOverview: { height: 60, width: '100%', borderRadius: 4 },
});

export default MovieScreen;
