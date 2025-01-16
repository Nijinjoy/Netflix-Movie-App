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
    Image,
} from 'react-native';
import Video from 'react-native-video';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getMovieById, getPoster, getMovieRecommendations, getMovieImages, getMovieTrailer } from '../services/movieService';
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
                navigation.navigate('TrailerScreen', { videoUrl: youtubeUrl });
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
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#E50914" />
            </View>
        );
    }

    const convertRuntime = (runtime) => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
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

            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
                        <Icon name="close" size={28} color="#fff" />
                    </TouchableOpacity>
                    {/* {trailerUrl ? (
                        <Video
                            source={{ uri: trailerUrl }}
                            style={styles.videoPlayer}
                            controls
                        />
                    ) : (
                        <Text>Trailer not available</Text>
                    )} */}

                </View>
            </Modal>

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
    genreContainer: {
        marginTop: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
    },
    genreChip: {
        backgroundColor: '#E50914',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginRight: 8,
    },
    genreText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.9)' },
    closeButton: { position: 'absolute', top: 50, right: 20, zIndex: 1 },
    videoPlayer: { width: '100%', height: 300 },
});

export default MovieScreen;

