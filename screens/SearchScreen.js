import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';


const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);  // Loading state

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        setLoading(true);  // Show loading indicator
        try {
          // Making search term lowercase to ensure case-insensitive search
          const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm.toLowerCase()}`);
          setSearchResults(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);  // Hide loading indicator
        }
      } else {
        setSearchResults([]);  // Reset results when search term is empty
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Movies"
        placeholderTextColor="#888"
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      {/* Show loading spinner when data is being fetched */}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <ScrollView>
          {searchResults.length > 0 ? (
            searchResults.map((movie, index) => (
              <TouchableOpacity
                key={index}
                style={styles.movieContainer}
                onPress={() => navigation.navigate('Details', { movieId: movie.show.id })} // Navigate to Details screen
              >
                <Image
                  source={{
                    uri: movie.show.image ? movie.show.image.medium : 'https://via.placeholder.com/200',
                  }}
                  style={styles.thumbnail}
                />
                <Text style={styles.title}>{movie.show.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultsText}>No results found</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212', 
    padding: 15 
  },
  searchInput: { 
    backgroundColor: '#333', 
    color: '#fff', 
    padding: 15, 
    borderRadius: 25, 
    marginBottom: 20, 
    fontSize: 16,
    elevation: 5, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 }
  },
  movieContainer: { 
    marginBottom: 25, 
    backgroundColor: '#222', 
    borderRadius: 15, 
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10 
  },
  thumbnail: { 
    width: '100%', 
    height: 250, 
    borderRadius: 15 
  },
  title: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 10, 
    marginLeft: 15 
  },
  noResultsText: {
    color: '#bbb', 
    fontSize: 18, 
    textAlign: 'center', 
    marginTop: 20
  }
});

export default SearchScreen;
