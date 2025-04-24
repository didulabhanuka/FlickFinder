import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Platform,
  findNodeHandle,
} from 'react-native';
import { fetchMovieById } from '../services/omdbApi';
import { BlurView } from '@react-native-community/blur';

const { width } = Dimensions.get('window');

export default function MovieDetailsScreen({ route }) {
  const { imdbID } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const backgroundRef = useRef(null);
  const [viewRef, setViewRef] = useState(null);

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

  useEffect(() => {
    if (backgroundRef.current) {
      const handle = findNodeHandle(backgroundRef.current);
      if (handle) {
        setViewRef(handle);
      }
    }
  }, [backgroundRef.current]);

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
    <View style={styles.container}>
      <Image
        source={{
          uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450',
        }}
        style={styles.backgroundImage}
        blurRadius={Platform.OS === 'ios' ? 10 : 5}
        ref={backgroundRef}
      />
      {Platform.OS === 'ios' && viewRef && (
        <BlurView
          style={StyleSheet.absoluteFill}
          viewRef={viewRef}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.7)"
        />
      )}
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
        <Text style={styles.label}>Director:</Text>
        <Text style={styles.value}>{movie.Director}</Text>
        <Text style={styles.label}>Actors:</Text>
        <Text style={styles.value}>{movie.Actors}</Text>
        <Text style={styles.label}>Plot:</Text>
        <Text style={styles.value}>{movie.Plot}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fallback background color
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: '100%',
  },
  contentContainer: {
    padding: 16,
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
