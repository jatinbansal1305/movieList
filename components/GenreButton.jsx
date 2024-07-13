// src/components/GenreButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const GenreButton = ({ genre, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={onPress}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>{genre.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#ff3d00',
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
  },
});

export default GenreButton;
