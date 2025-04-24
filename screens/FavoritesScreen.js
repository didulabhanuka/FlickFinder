import React, { useContext, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FavoritesContext } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 64) / 3;

export default function FavoritesScreen() {
  const { favorites } = useContext(FavoritesContext);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // This will run when the screen is focused
      // If your favorites are stored in context and updated elsewhere,
      // this ensures the latest favorites are displayed
    }, [favorites])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('MovieDetails', { imdbID: item.imdbID })
      }
    >
      <Image
        source={{
          uri:
            item.Poster !== 'N/A'
              ? item.Poster
              : 'https://via.placeholder.com/150',
        }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {item.Title}
      </Text>
      <Text style={styles.year}>{item.Year}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites added yet.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.imdbID}
          renderItem={renderItem}
          numColumns={3}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: ITEM_WIDTH,
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: {
    width: '100%',
    height: ITEM_WIDTH * 1.5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  year: {
    fontSize: 14,
    color: '#ccc',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#ccc',
    fontSize: 18,
  },
});
