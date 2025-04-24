import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { FavoritesProvider } from './context/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
}