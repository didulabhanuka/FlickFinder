import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { fetchMoviesByTitle } from '../services/omdbApi';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 64) / 3;

const typeOptions = [
  { label: 'Movies', value: 'movie' },
  { label: 'Series', value: 'series' },
];

const categoryOptions = [
  { label: 'Action', value: 'action' },
  { label: 'Drama', value: 'drama' },
  { label: 'Comedy', value: 'comedy' },
  { label: 'Horror', value: 'horror' },
  { label: 'Sci-Fi', value: 'sci-fi' },
  // Add more categories as needed
];

export default function CategoriesScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState('movie');
  const [selectedCategory, setSelectedCategory] = useState('action');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMovies = useCallback(async () => {
    setLoading(true);
    try {
      const results = await fetchMoviesByTitle(
        selectedCategory,
        selectedType
      );
      setMovies(results);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedType, selectedCategory]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetails', { imdbID: item.imdbID })}
    >
      <Image
        source={{ uri: item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/150' }}
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
    <ImageBackground
          source={require('../assets/background-image.jpg')}
          style={styles.background}
          blurRadius={10}
          >
     
    <View style={styles.container}>
      <View style={styles.dropdownRow}>
        <Dropdown
          style={styles.dropdown}
          data={typeOptions}
          labelField="label"
          valueField="value"
          placeholder="Select Type"
          value={selectedType}
          onChange={(item) => {
            setSelectedType(item.value);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          data={categoryOptions}
          labelField="label"
          valueField="value"
          placeholder="Select Category"
          value={selectedCategory}
          onChange={(item) => {
            setSelectedCategory(item.value);
          }}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={movies}
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
    backgroundColor: 'rgba(0 ,0 ,0 ,0.7)',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dropdown: {
    width: (width - 48) / 2,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
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
    backgroundColor: '#f8f8f8',
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
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  year: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});
