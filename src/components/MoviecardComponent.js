import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { imdb } from '../assets/images'; // Make sure you have this asset for IMDB
import { TouchableOpacity } from 'react-native';
import { getPoster, getLanguage } from '../services/movieService'; // Ensure getLanguage is being used

const MoviecardComponent = ({
    title,
    poster,
    language,
    voteAverage,
    voteCount,
    size,
    heartLess,
    onPress,
    handleLikeToggle,
    isLiked,
}) => {

    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress}>
            <ImageBackground
                resizeMode='stretch'
                source={{ uri: getPoster(poster) }}
                style={styles.imageBackground}
                imageStyle={{ borderRadius: 10 }}
            >
                <View style={styles.imdbBadge}>
                    <Image
                        source={imdb}
                        style={styles.imdbImage}
                    />
                    <Text style={styles.ratingText}>{voteAverage}</Text>
                </View>
                {!heartLess && (
                    <TouchableOpacity style={styles.heartIconContainer} onPress={handleLikeToggle}>
                        <MaterialIcons
                            name={isLiked ? 'favorite' : 'favorite-border'}
                            size={25}
                            color={isLiked ? 'red' : 'white'}
                        />
                    </TouchableOpacity>
                )}
            </ImageBackground>
            <View style={styles.info}>
                <Text style={styles.movieName} numberOfLines={2}>{title}</Text>
                <View style={styles.languageRow}>
                    {/* Display Language here */}
                    <Text style={styles.language}>{language || 'Unknown Language'}</Text>
                    <View style={styles.heartContainer}>
                        {/* Display Vote Count (as a percentage or directly as count) */}
                        <MaterialIcons name="favorite" size={20} color="red" />
                        <Text style={styles.heartText}>{voteCount ? `${voteCount}` : '0'}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default MoviecardComponent

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imageBackground: {
        width: 250,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    imdbBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5C518',
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    imdbImage: {
        width: 50,
        height: 20,
        resizeMode: 'cover',
        marginRight: 5,
    },
    ratingText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
    },
    info: {
        width: 250,
        marginTop: 10,
    },
    movieName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        width: 190
    },
    languageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    language: {
        fontSize: 14,
        color: '#555',
    },
    heartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    heartText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 5,
    },
    heartIconContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        padding: 5,
    },
});
