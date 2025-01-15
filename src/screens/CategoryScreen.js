import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions, TextInput } from 'react-native';
import { getAllGenres } from '../services/movieService';
import { MaterialIcons } from 'react-native-vector-icons';

const { width } = Dimensions.get('window');

const CategoryScreen = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getAllGenres()
            .then((response) => setGenres(response.data.genres))
            .catch((error) => console.error("Error fetching genres:", error));
    }, []);

    const renderCategory = ({ item }) => {
        return (
            <TouchableOpacity style={styles.categoryCard}>
                <Image
                    source={{ uri: `https://via.placeholder.com/300x450?text=${item.name}` }}
                    style={styles.categoryImage}
                />
                <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Browse Categories</Text>
                <TouchableOpacity style={styles.searchIcon}>
                    <MaterialIcons name="search" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={genres}
                    renderItem={({ item }) => (
                        <View style={styles.categorySection}>
                            <Text style={styles.categoryTitle}>{item.name}</Text>
                            <FlatList
                                data={new Array(10).fill(item)} // Fill with dummy data for testing, replace with real data
                                renderItem={renderCategory}
                                keyExtractor={(movie, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.genreList}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#000',
        borderBottomWidth: 2,
        borderBottomColor: '#ff6347',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 1,
    },
    searchIcon: {
        padding: 8,
        borderRadius: 25,
        backgroundColor: '#ff6347',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    list: {
        paddingBottom: 16,
    },
    categorySection: {
        marginBottom: 32,
    },
    categoryTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
        borderBottomWidth: 3,
        borderBottomColor: '#ff6347', // Accent color
        paddingBottom: 6,
    },
    categoryCard: {
        marginRight: 16,
        width: (width / 3) - 24, // Adjust card size for 3 columns in horizontal scroll
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#1f1f1f',
        position: 'relative',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    categoryImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    categoryName: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    genreList: {
        paddingVertical: 8,
    },
});

export default CategoryScreen;
