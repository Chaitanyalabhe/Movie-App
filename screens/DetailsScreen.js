import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const DetailsScreen = ({ route, navigation }) => {
  const [movie, setMovie] = useState(null);
  const { movieId } = route.params;

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${movieId}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => console.error(error));
  }, [movieId]);

  if (!movie) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Movie Details */}
      <Image source={{ uri: movie.image.medium }} style={styles.thumbnail} />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.genre}>{movie.genres.join(' | ')}</Text>

      {/* Summary */}
      <Text style={styles.summary}>{movie.summary.replace(/<[^>]+>/g, '')}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212', 
    padding: 15 
  },
  loaderContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#121212' 
  },
  backButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10, 
    backgroundColor: '#333', 
    borderRadius: 25, 
    marginBottom: 20, 
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5 
  },
  backText: { 
    color: '#fff', 
    fontSize: 18 
  },
  thumbnail: { 
    width: '100%', 
    height: 350, 
    borderRadius: 15, 
    marginBottom: 15, 
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8
  },
  title: { 
    color: '#fff', 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  genre: { 
    color: '#888', 
    fontSize: 16, 
    marginBottom: 15 
  },
  summary: { 
    color: '#ccc', 
    fontSize: 16, 
    lineHeight: 24 
  },
});

export default DetailsScreen;
