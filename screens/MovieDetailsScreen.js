import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchMovieById } from '../services/omdbApi';
import { FavoritesContext } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');

export default function MovieDetailsScreen({ route }) {
  const { imdbID } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoritesContext);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieById(imdbID);
        setMovie(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [imdbID]);

  const handleFavoriteToggle = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Movie details not available.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450',
      }}
      style={styles.backgroundImage}
      blurRadius={10}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.headerRow}>
            <View style={styles.leftColumn}>
              <Text style={styles.title}>{movie.Title}</Text>
              <Text style={styles.subtitle}>{movie.Year} • {movie.Genre}</Text>
            </View>
            <TouchableOpacity
              style={styles.favoriteIconContainer}
              onPress={handleFavoriteToggle}
            >
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Icon
                  name={isFavorite(movie.imdbID) ? 'favorite' : 'favorite-border'}
                  size={36}
                  color={isFavorite(movie.imdbID) ? 'red' : 'white'}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450',
            }}
            style={styles.poster}
            resizeMode="cover"
          />
          <Text style={styles.label}>Director:</Text>
          <Text style={styles.value}>{movie.Director}</Text>
          <Text style={styles.label}>Actors:</Text>
          <Text style={styles.value}>{movie.Actors}</Text>
          <Text style={styles.label}>Plot:</Text>
          <Text style={styles.value}>{movie.Plot}</Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  leftColumn: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
  },
  poster: {
    width: width * 0.8,
    height: width * 1.2,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 8,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
