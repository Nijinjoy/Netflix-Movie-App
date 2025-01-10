import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { imdb } from '../assets/images';
import { TouchableOpacity } from 'react-native';

const MoviecardComponent = () => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeToggle = () => {
        setIsLiked(prevState => !prevState);
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.imdbBadge}>
                    <Image
                        source={imdb}
                        style={styles.imdbImage}
                    />
                    <Text style={styles.ratingText}>8.5</Text>
                </View>
                <Text style={styles.text}>MoviecardComponent</Text>
                <TouchableOpacity style={styles.heartIconContainer} onPress={handleLikeToggle}>
                    <MaterialIcons
                        name={isLiked ? "favorite" : "favorite-border"}
                        size={25}
                        color={isLiked ? "red" : "white"}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.info}>
                <Text style={styles.movieName}>URI - Surgical Strike</Text>
                <View style={styles.languageRow}>
                    <Text style={styles.language}>Language</Text>
                    <View style={styles.heartContainer}>
                        <MaterialIcons name="favorite" size={20} color="red" />
                        <Text style={styles.heartText}>90%</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MoviecardComponent;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        marginBottom: 20,
    },
    container: {
        backgroundColor: 'grey',
        width: 250,
        height: 300,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    imdbBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5C518',
        borderBottomLeftRadius: 10,
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
        bottom: 0,
        left: 4,
        padding: 5,
    },
});
