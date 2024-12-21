import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import axios from 'axios';


const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMovies();
  }, []);

  // Function to filter movies by genre
  const filterMoviesByGenre = (genre) => {
    return movies.filter((item) => item.show.genres.includes(genre));
  };

  const renderItem = ({ item }) => {
    const imageUrl = item.show?.image?.medium || 'https://via.placeholder.com/200'; 

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Details', { movieId: item.show.id })}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.title}>{item.show?.name || 'No Title'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Box */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Movies"
          placeholderTextColor="#888"
          onFocus={() => navigation.navigate('Search')} // Navigate to SearchScreen when focused
        />
      </View>

      {/* Trending Now Section */}
      <Text style={styles.sectionTitle}>Trending Now</Text>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.show?.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      />
      
      {/* Popular Shows Section */}
      <Text style={styles.sectionTitle}>Popular Shows</Text>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.show?.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      />
      
      {/* Comedy Movies Section */}
      <Text style={styles.sectionTitle}>Comedy Movies</Text>
      <FlatList
        data={filterMoviesByGenre('Comedy')}
        renderItem={renderItem}
        keyExtractor={(item) => item.show?.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      />
      
      {/* Drama Movies Section */}
      <Text style={styles.sectionTitle}>Drama Movies</Text>
      <FlatList
        data={filterMoviesByGenre('Drama')}
        renderItem={renderItem}
        keyExtractor={(item) => item.show?.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  card: {
    marginRight: 15,
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
  },
  searchBox: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
