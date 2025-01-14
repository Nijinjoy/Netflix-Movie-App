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

    console.log("movie===>", movieImages);

    useEffect(() => {
        getMovieById(movieId)
            .then((response) => {
                setMovie(response?.data);
                return getMovieRecommendations(movieId);
            })
            .then((response) => {
                getMovieImages(response?.data?.results || []);
                return getMovieImages(movieId);
            })
            .then((response) => {
                setMovieImages(response?.data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [movieId]);


    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#E50914" />
            </View>
        );
    }

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={{ uri: getPoster(movie?.backdrop_path) }}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Icon name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.shareButton} onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}>
                        <Icon name="share" size={28} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.title}>{movie?.title}</Text>
                    <Text style={styles.tagline}>{movie?.tagline}</Text>

                    <View style={styles.ratingsContainer}>
                        <Icon name="star" size={20} color="#FFD700" />
                        <Text style={styles.voteText}>
                            {movie?.vote_average.toFixed(1)} / 10
                        </Text>
                        <Text style={styles.voteCount}>
                            ({movie?.vote_count} votes)
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.playButton}>
                        <Icon name="play-arrow" size={24} color="white" />
                        <Text style={styles.playText}>Play</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={styles.detailsContainer}>
                <Text style={styles.sectionTitle}>Overview</Text>
                <Text style={styles.overview}>{movie?.overview}</Text>

                <View style={styles.divider} />
                <Text style={styles.sectionTitle}>Genres</Text>
                <Text style={styles.details}>
                    {movie?.genres?.map((genre) => genre.name).join(', ')}
                </Text>
                <View style={styles.divider} />
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.sectionTitle}>Release Date</Text>
                        <Text style={styles.details}>{movie?.release_date}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.sectionTitle}>Runtime</Text>
                        <Text style={styles.details}>{movie?.runtime} minutes</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <Text style={styles.sectionTitle}>Production Companies</Text>
                {movie?.production_companies?.map((company) => (
                    <View key={company.id} style={styles.companyRow}>
                        {company.logo_path && (
                            <Image
                                source={{ uri: getPoster(company.logo_path) }}
                                style={styles.companyLogo}
                            />
                        )}
                        <Text style={styles.details}>{company.name}</Text>
                    </View>
                ))}
                <View style={styles.divider} />
                <Text style={styles.sectionTitle}>Production Countries</Text>
                <View style={styles.countryRow}>
                    {movie?.production_countries?.map((country) => (
                        <Text key={country.iso_3166_1} style={styles.countryText}>
                            {country.name}
                        </Text>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Trailer</Text>
                <FlatList
                    data={movieImages?.results}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.cardContainer}>
                            {/* <Text style={styles.trailerName}>{item.name}</Text> */}
                            <TouchableOpacity
                                style={styles.playButton}
                                onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${item.key}`)}
                            >
                                <Icon name="play-arrow" size={40} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                />

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
        height: 370,
        justifyContent: 'flex-end',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: 40, // Adjusted top value for better alignment
        left: 20,
        zIndex: 1,
    },
    shareButton: {
        position: 'absolute',
        top: 40, // Adjusted top value for better alignment
        right: 20,
        zIndex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
    },
    tagline: {
        fontSize: 16,
        color: '#ccc',
        fontStyle: 'italic',
        marginVertical: 8,
    },
    ratingsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    voteText: {
        fontSize: 16,
        color: '#FFD700',
        marginLeft: 5,
    },
    voteCount: {
        fontSize: 14,
        color: '#aaa',
        marginLeft: 8,
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    playText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 8,
    },
    detailsContainer: {
        padding: 20,
        backgroundColor: '#1c1c1c',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    overview: {
        fontSize: 16,
        lineHeight: 24,
        color: '#ccc',
    },
    details: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 8,
    },
    countryRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    countryText: {
        fontSize: 14,
        color: '#aaa',
        marginRight: 12,
        marginBottom: 5,
        backgroundColor: '#333',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    divider: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
    },
    companyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    companyLogo: {
        width: 50,
        height: 20,
        resizeMode: 'contain',
        marginRight: 8,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recommendationImage: {
        width: 200,
        height: 150,
        borderRadius: 10,
    },
    recommendationTitle: {
        fontSize: 14,
        marginTop: 5,
        color: '#333',
        textAlign: 'center',
    },

    recommendationsContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        marginTop: 20,  // Added space from the movie details section
    },
    recommendationsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    recommendationsList: {
        paddingLeft: 10,
    },
    recommendationCard: {
        width: 180,  // Adjusted width for a more compact look
        marginRight: 20,
        marginBottom: 20,  // Added bottom margin for more space between cards
        borderRadius: 12,  // More rounded corners for a sleek look
        backgroundColor: '#222',  // Darker background to match theme
        elevation: 5,  // Added shadow for a 3D effect
        overflow: 'hidden',
    },
    recommendationImage: {
        width: '100%',
        height: 250,  // Adjusted image height for better visual proportions
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    recommendationTitle: {
        fontSize: 16,  // Slightly bigger title font
        fontWeight: 'bold',
        padding: 8,
        color: '#fff',  // White text for better contrast
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        padding: 10, // Optional: Add padding for better touch area
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent background
        borderRadius: 20, // Optional: Round the button
    },
    imageName: {
        color: '#fff',  // Or any color you prefer for the text
        textAlign: 'center',
        fontSize: 14,
    },

    cardContainer: {
        backgroundColor: '#333',
        borderRadius: 12,
        marginRight: 20,
        padding: 10,
        width: 100,
        alignItems: 'center',  // Center content horizontally
        justifyContent: 'center', // Center content vertically
        elevation: 5,  // Adds shadow on Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, // Subtle shadow
        shadowRadius: 8, // Soft shadow effect
        transform: [{ scale: 1 }], // Add subtle scaling on tap for interaction feedback
    },
    trailerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',  // White text on dark background
        marginBottom: 15, // Space between name and play button
        textAlign: 'center',
    },
    playButton: {
        backgroundColor: '#E50914',
        padding: 10,
        borderRadius: 50, // Circular button for a more prominent effect
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
});

export default MovieScreen;


{/* <View style={styles.recommendationsContainer}>
<Text style={styles.recommendationsTitle}>Recommendations</Text>
<FlatList
    data={recommendations}
    horizontal
    keyExtractor={(item) => item.id.toString()}
    renderItem={renderRecommendation}
    contentContainerStyle={styles.recommendationsList}
/>
</View> */}
