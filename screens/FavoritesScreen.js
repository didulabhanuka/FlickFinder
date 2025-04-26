import React, { useContext, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FavoritesContext } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard'; // <-- import MovieCard

const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const { favorites } = useContext(FavoritesContext);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // Update when focused if needed
    }, [favorites])
  );

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ empty: true, imdbID: `empty-${Math.random()}` });
      numberOfElementsLastRow++;
    }

    return data;
  };

  const renderItem = ({ item }) => {
    if (item.empty) {
      return <View style={[styles.card, { backgroundColor: 'transparent', elevation: 0 }]} />;
    }

    return (
      <MovieCard
        item={item}
        onPress={() => navigation.navigate('MovieDetails', { imdbID: item.imdbID })}
      />
    );
  };

  return (
    <ImageBackground
      source={require('../assets/background-image.jpg')}
      style={styles.background}
      blurRadius={10}
    >
      <View style={styles.container}>
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favorites added yet.</Text>
          </View>
        ) : (
          <FlatList
            data={formatData([...favorites], 3)}
            keyExtractor={(item) => item.imdbID}
            renderItem={renderItem}
            numColumns={3}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
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
    width: (width - 64) / 3,
    height: ((width - 64) / 3) * 1.5 + 60, // to match MovieCard height approximately
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
