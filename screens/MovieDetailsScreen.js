import React, { useEffect, useState, useContext } from 'react';
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
} from 'react-native';
import { fetchMovieById } from '../services/omdbApi';
import { FavoritesContext } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');

export default function MovieDetailsScreen({ route }) {
  const { imdbID } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoritesContext);

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

  const handleFavoriteToggle = () => {
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

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
          <View style={styles.infoSection}>
            <Text style={styles.title}>{movie.Title}</Text>
            <Text style={styles.subtitle}>{movie.Year} • {movie.Genre}</Text>
          </View>
          <Image
            source={{
              uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450',
            }}
            style={styles.poster}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoriteToggle}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavorite(movie.imdbID) ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
          </TouchableOpacity>
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
  infoSection: {
    alignItems: 'flex-start',
    marginBottom: 16,
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
  favoriteButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  favoriteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
