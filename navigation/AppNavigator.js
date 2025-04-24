import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CategoriesStack = createStackNavigator();
const FavoritesStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

function CategoriesStackScreen() {
  return (
    <CategoriesStack.Navigator>
      <CategoriesStack.Screen name="CategoriesMain" component={CategoriesScreen} options={{ headerShown: false }} />
      <CategoriesStack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{ headerShown: false }} />
    </CategoriesStack.Navigator>
  );
}

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="FavoritesMain" component={FavoritesScreen} options={{ headerShown: false }} />
      <FavoritesStack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{ headerShown: false }} />
    </FavoritesStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Categories') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Categories" component={CategoriesStackScreen} />
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
    </Tab.Navigator>
  );
}
