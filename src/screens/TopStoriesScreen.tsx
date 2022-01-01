import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { FlatList, ScrollView, StyleSheet, Text } from 'react-native';

import { getTopStories } from '../apis/story';
import { Pagination } from '../components/Pagination';
import { LoadItem } from '../components/LoadItem';
import { colors } from '../styles/colors';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StoriesTypesList } from '../components/StoriesTypesList';

const activeStoriesType = 'Top';

export const TopStoriesScreen: FC = () => {
  const { navigate } = useNavigation();

  const [newStoriesIds, setNewStoriesIds] = useState<number[]>([]);
  const [activeIds, setActiveIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: newStoriesData,
    isLoading: newStoriesLoading,
    isError: newStoriesError,
  } = useQuery('topStories', getTopStories);

  useEffect(() => {
    if (currentPage > 0 && newStoriesIds.length) {
      const newActiveIds = newStoriesIds.slice(
        10 * (currentPage - 1),
        10 * currentPage,
      );
      setActiveIds([...newActiveIds]);
    }
  }, [currentPage, newStoriesIds]);

  useEffect(() => {
    if (!newStoriesLoading && !newStoriesError && newStoriesData) {
      setNewStoriesIds(newStoriesData.data);
    }
  }, [newStoriesData, newStoriesError, newStoriesLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <StoriesTypesList activeType="top" onChange={() => {}} />
        <Text style={styles.headerText}>{activeStoriesType} Stories</Text>
        {activeIds.map(id => (
          <LoadItem key={id} id={id} />
        ))}
        <Pagination
          totalRecords={newStoriesIds.length}
          initialPage={1}
          perPage={10}
          onChange={setCurrentPage}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  headerText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
});
