// src/components/YearMovieList.js
import React, { useCallback, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import MovieGrid from './MovieGrid';
import { fetchMovies } from '../api';

const ITEM_HEIGHT = 1000; 
const INITIAL_YEAR = 2012;
const YEARS_TO_LOAD = 3; 

const YearMovieList = ({ selectedGenres }) => {
  const flatListRef = useRef(null);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const lastOffsetY = useRef(0);
  const currentYear = new Date().getFullYear();

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['movies', selectedGenres],
    queryFn: async ({ pageParam = INITIAL_YEAR }) => {
      const yearsToFetch = Array.from({ length: YEARS_TO_LOAD }, (_, i) => pageParam + i);
      const moviesPromises = yearsToFetch.map(year => fetchMovies(year, selectedGenres));
      const moviesResults = await Promise.all(moviesPromises);
      return yearsToFetch.map((year, index) => ({ year, movies: moviesResults[index] }));
    },
    getNextPageParam: (lastPage) => {
      const newestYearFetched = Math.max(...lastPage.map(item => item.year));
      return newestYearFetched < currentYear ? newestYearFetched + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      const oldestYearFetched = Math.min(...firstPage.map(item => item.year));
      return oldestYearFetched > 1900 ? oldestYearFetched - 1 : undefined;
    },
    initialPageParam: INITIAL_YEAR,
  });

  const loadMoreData = useCallback((direction) => {
    if (direction === 'up' && hasPreviousPage && !isFetchingPreviousPage) {
      fetchPreviousPage();
    } else if (direction === 'down' && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage]);

  const handleScroll = (event) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    if (currentOffsetY < lastOffsetY.current && currentOffsetY < 200) {
      if (!isScrollingUp) {
        setIsScrollingUp(true);
        loadMoreData('up');
      }
    } else {
      setIsScrollingUp(false);
    }
    lastOffsetY.current = currentOffsetY;
  };

  const renderItem = useCallback(({ item }) => (
    <View style={styles.yearContainer}>
      <Text style={styles.yearText}>{item.year}</Text>
      <MovieGrid movies={item.movies} />
    </View>
  ), []);

  const keyExtractor = useCallback((item) => item.year.toString(), []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FF4136" />;
  }

  if (isError) {
    return <Text style={styles.errorText}>Error: {error.message}</Text>;
  }

  const allYears = data ? data.pages.flat().sort((a, b) => a.year - b.year) : [];

  return (
    <FlatList
      ref={flatListRef}
      data={allYears}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={() => loadMoreData('down')}
      onEndReachedThreshold={0.5}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      ListHeaderComponent={isFetchingPreviousPage ? <ActivityIndicator size="large" color="#FF4136" /> : null}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" color="#FF4136" /> : null}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      initialScrollIndex={allYears.findIndex(item => item.year === INITIAL_YEAR)}
      onScrollToIndexFailed={info => {
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
          flatListRef.current?.scrollToIndex({ index: info.index, animated: false });
        });
      }}
    />
  );
};

const styles = StyleSheet.create({
  yearContainer: {
    marginBottom: 20,
  },
  yearText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 16,
    marginBottom: 10,
  },
  errorText: {
    color: '#FF4136',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default YearMovieList;