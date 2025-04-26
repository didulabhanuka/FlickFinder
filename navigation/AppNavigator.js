import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from '../components/BottomTabNavigator'; // <-- import the separated navbar

import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

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
  const screens = [
    { name: 'Categories', component: CategoriesStackScreen },
    { name: 'Home', component: HomeStackScreen },
    { name: 'Favorites', component: FavoritesStackScreen },
  ];

  return <BottomTabNavigator screens={screens} />;
}
