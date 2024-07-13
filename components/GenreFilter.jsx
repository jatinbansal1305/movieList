// components/GenreFilter.js
import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GENRES, getGenreId } from '../constants/genres';

export default function GenreFilter({ onGenreChange, selectedGenres }) {
  const handleGenrePress = (genreName) => {
    const genreId = getGenreId(genreName);
    if (genreId) {
      onGenreChange(genreId);
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      <TouchableOpacity
        style={[
          styles.genreButton,
          selectedGenres.length === 0 && styles.selectedGenre
        ]}
        onPress={() => onGenreChange('all')}
      >
        <Text style={[
          styles.genreText,
          selectedGenres.length === 0 && styles.selectedGenreText
        ]}>All</Text>
      </TouchableOpacity>
      {Object.entries(GENRES).map(([id, name]) => (
        <TouchableOpacity
          key={id}
          style={[
            styles.genreButton,
            selectedGenres.includes(id) && styles.selectedGenre
          ]}
          onPress={() => handleGenrePress(name)}
        >
          <Text style={[
            styles.genreText,
            selectedGenres.includes(id) && styles.selectedGenreText
          ]}>{name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 64, 
  },
  genreButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#484848',
    marginRight: 8,
    height: 32, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  selectedGenre: {
    backgroundColor: '#FF4136',
  },
  genreText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  selectedGenreText: {
    fontWeight: 'bold',
  },
});