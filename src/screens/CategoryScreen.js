import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Platform, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { getAllGenres, selectedGenre } from '../services/movieService';

const CategoryScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [genres, setGenres] = useState([]);
    const [animations] = useState(new Animated.Value(0));

    console.log("genres===>", genres);

    useEffect(() => {
        getAllGenres()
            .then((response) => setGenres(response.data.genres))
            .catch((error) => console.error("Error fetching genres:", error));
    }, []);

    const filteredGenres = genres.filter((genre) =>
        genre.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderGenreItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => handleGenreSelect(item.id)} // Call a handler with the genre ID
        >
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );


    const handleGenreSelect = (genreId) => {
        navigation.navigate('ListingScreen', { genreId }); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#00bcd4"
            />
            <LinearGradient
                colors={['#00bcd4', '#009688']}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Categories</Text>
            </LinearGradient>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Categories"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
            <FlatList
                data={filteredGenres}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderGenreItem}
                numColumns={2}
                contentContainerStyle={styles.categoryList}
                columnWrapperStyle={styles.columnWrapper}

            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 50 : 30,
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 40,
        textAlign: 'center',
        flex: 1, 
    },
    searchContainer: {
        padding: 15,
        paddingTop: 10,
    },
    searchInput: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25, // Rounded input field
        paddingLeft: 20,
        fontSize: 16,
        backgroundColor: '#fff',
        shadowColor: '#000', // Adds shadow to the input field for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    categoryList: {
        padding: 15,
    },
    categoryCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minWidth: '45%',
        height: 130,
        marginHorizontal: 10,
    },
    categoryText: {
        fontSize: 18,
        color: '#333',
    },
});

export default CategoryScreen;


