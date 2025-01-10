import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CategoryScreen from '../screens/CategoryScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'Profile') {
                    iconName = 'person';
                } else if (route.name === 'Settings') {
                    iconName = 'settings';
                } else if (route.name === 'Category') {
                    iconName = 'category';
                }

                return (
                    <MaterialIcons
                        name={iconName}
                        size={size}
                        color={focused ? '#3F51B5' : '#B0BEC5'}
                    />
                );
            },
            tabBarStyle: {
                position: 'absolute',
                bottom: 10,
                left: 10,
                right: 20,
                backgroundColor: '#F5F5F5',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                height: 60,
                paddingBottom: 10,
                elevation: 20,
                borderWidth: 0,
                marginHorizontal: 10,
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
            name="Settings"
            component={SettingsScreen}
            options={{ tabBarLabel: 'Settings' }}
        />
    </Tab.Navigator>
);

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={BottomTabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
