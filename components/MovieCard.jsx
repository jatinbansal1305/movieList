import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
export const genreMap = {
  28: 'Action',
  18: 'Drama',
  53: 'Thriller',
};

const MovieCard = ({ movie }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.genres}>
        Genres: {movie.genre_ids.map(id => genreMap[id]).join(', ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  genres: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
});

export default MovieCard;
