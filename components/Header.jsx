// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GenreButton from './GenreButton';

const Header = ({ genres, selectedGenre, onSelectGenre }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>MOVIEFIX</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreList}>
        {genres.map((genre) => (
          <GenreButton
            key={genre.id}
            genre={genre}
            isSelected={selectedGenre === genre.id}
            onPress={() => onSelectGenre(genre.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    alignItems: 'center',
  },
  title: {
    color: '#ff3d00',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  genreList: {
    flexDirection: 'row',
  },
});

export default Header;
