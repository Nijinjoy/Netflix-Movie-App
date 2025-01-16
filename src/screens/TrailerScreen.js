import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Video } from 'expo-av';

const TrailerScreen = ({ route }) => {
    const { videoUrl } = route.params;

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <Video
                source={{ uri: videoUrl }}
                style={styles.video}
                useNativeControls
                resizeMode="contain"
                isLooping
                onError={(error) => console.error('Video playback error:', error)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
    },
});

export default TrailerScreen;
