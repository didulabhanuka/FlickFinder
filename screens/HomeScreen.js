import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { fetchMoviesByTitle } from '../services/omdbApi';
import { debounce } from '../utils/debounce';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 64) / 3;

const years = Array.from({ length: 30 }, (_, i) => ({
  label: `${2025 - i}`,
  value: `${2025 - i}`,
}));

const categories = [
  { label: 'All', value: '' },
  { label: 'Movie', value: 'movie' },
  { label: 'Series', value: 'series' },
  { label: 'Episode', value: 'episode' },
];

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const results = await fetchMoviesByTitle('Batman');
        setMovies(results);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadMovies();
  }, []);

  const handleSearch = async () => {
    try {
      const results = await fetchMoviesByTitle(
        query || 'Batman',
        selectedCategory,
        selectedYear
      );
      setMovies(results);
    } catch (error) {
      console.error(error.message);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), [
    query,
    selectedYear,
    selectedCategory,
  ]);

  const onChangeText = (text) => {
    setQuery(text);
    debouncedSearch();
  };

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
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          value={query}
          onChangeText={onChangeText}
          returnKeyType="search"
        />

        <View style={styles.filtersContainer}>
          <Dropdown
            style={styles.dropdown}
            data={years}
            labelField="label"
            valueField="value"
            placeholder="Year"
            value={selectedYear}
            onChange={(item) => {
              setSelectedYear(item.value);
              handleSearch();
            }}
          />
          <Dropdown
            style={styles.dropdown}
            data={categories}
            labelField="label"
            valueField="value"
            placeholder="Category"
            value={selectedCategory}
            onChange={(item) => {
              setSelectedCategory(item.value);
              handleSearch();
            }}
          />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        <FlatList
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={renderItem}
          numColumns={3}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
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
    backgroundColor: 'rgba(0 ,0 ,0 ,0.7)', // semi-transparent overlay
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  filtersContainer: {
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
  searchButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
