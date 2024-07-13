// components/MovieGrid.js
import React from 'react';
import { FlatList, Image, Text, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const numColumns = 2;
const itemWidth = (width - 48) / numColumns;

export default function MovieGrid({ movies }) {
  const renderItem = ({ item }) => (
    <View style={styles.movieItem}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.movieRating}>Rating: {item.vote_average}</Text>
    </View>
  );

  return (
    <FlatList
      data={movies.slice(0, 20)}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      scrollEnabled={false} 
      contentContainerStyle={styles.gridContainer}
    />
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    padding: 16,
  },
  movieItem: {
    width: itemWidth,
    marginBottom: 16,
    marginLeft : 12,
    marginRight : 12,
  },
  movieImage: {
    width: '100%',
    height: itemWidth * 1.5,
    backgroundColor: '#333333',
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  movieRating: {
    color: '#AAAAAA',
    fontSize: 12,
    marginTop: 4,
  },
});