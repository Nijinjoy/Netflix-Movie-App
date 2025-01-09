import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HeaderComponent = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ marginTop: 15 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>NetFlix</Text>
                    <View style={styles.iconsContainer}>
                        <TouchableOpacity style={styles.icon}>
                            <MaterialIcons name="search" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <MaterialIcons name="menu" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#1a1a1a',
        height: 90
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
        paddingHorizontal: 15,
        backgroundColor: '#1a1a1a',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 15,
    },
});

export default HeaderComponent;
