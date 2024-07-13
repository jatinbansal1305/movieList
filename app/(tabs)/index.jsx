import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GenreFilter from '@/components/GenreFilter';
import YearMovieList from '@/components/YearMovieList';
import ParabolicText from '@/components/ParabloicText'


const queryClient = new QueryClient();
export default function HomeScreen() {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreChange = (genreId) => {
    setSelectedGenres(prevGenres => {
      if (genreId === 'all') {
        return [];
      }
      if (prevGenres.includes(genreId)) {
        return prevGenres.filter(id => id !== genreId);
      } else {
        return [...prevGenres, genreId];
      }
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ParabolicText text="MOVIEFIX" curvature={0.1} fontSize={24} />
        <Text style={styles.title}>MOVIEFIX</Text>
        <GenreFilter onGenreChange={handleGenreChange} selectedGenres={selectedGenres} />
        <YearMovieList selectedGenres={selectedGenres} />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4136',
    textAlign: 'left',
    padding: 16,
  },
});