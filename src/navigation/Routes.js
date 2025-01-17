import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for 'heart' icon
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CategoryScreen from '../screens/CategoryScreen';
import MovieScreen from '../screens/MovieScreen';
import ListingScreen from '../screens/ListingScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = 'home';
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                } else if (route.name === 'Profile') {
                    iconName = 'person';
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                } else if (route.name === 'Favourites') {  // Use FontAwesome for 'Favourites'
                    iconName = 'heart';  // FontAwesome icon for 'Favourites'
                    return <Icon name={iconName} size={size} color={color} />;
                } else if (route.name === 'Category') {
                    iconName = 'category';
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                }
            },
            tabBarStyle: {
                backgroundColor: '#F5F5F5',
                height: 60,
                elevation: 20,
                borderWidth: 0,
                justifyContent: "center",
                alignItems: "center",
            },
            tabBarItemStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 2
            },
            tabBarLabelStyle: ({ focused }) => ({
                fontSize: 12,
                color: focused ? '#3F51B5' : '#B0BEC5',
            }),

            headerShown: false,
            tabBarPressColor: 'transparent',
            tabBarPressOpacity: 1,
        })}
    >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen
            name="Category"
            component={CategoryScreen}
            options={{ tabBarLabel: 'Category' }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ tabBarLabel: 'Profile' }}
        />
        <Tab.Screen
            name="Favourites"
            component={SettingsScreen}
            options={{ tabBarLabel: 'Favourites' }}
        />
    </Tab.Navigator>
);

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={BottomTabNavigator} />
                <Stack.Screen name="movie" component={MovieScreen} />
                <Stack.Screen name="profile" component={ProfileScreen} />
                <Stack.Screen name="ListingScreen" component={ListingScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
