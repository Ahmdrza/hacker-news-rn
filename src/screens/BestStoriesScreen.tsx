import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { FlatList, ScrollView, StyleSheet, Text } from 'react-native';

import { getBestStories } from '../apis/story';
import { Pagination } from '../components/Pagination';
import { LoadItem } from '../components/LoadItem';
import { colors } from '../styles/colors';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StoriesTypesList } from '../components/StoriesTypesList';

const activeStoriesType = 'Best';

export const BestStoriesScreen: FC = () => {
  const { navigate } = useNavigation();

  const [storiesIds, setNewStoriesIds] = useState<number[]>([]);
  const [activeIds, setActiveIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: newStoriesData,
    isLoading: newStoriesLoading,
    isError: newStoriesError,
  } = useQuery('bestStories', getBestStories);

  useEffect(() => {
    if (currentPage > 0 && storiesIds.length) {
      const newActiveIds = storiesIds.slice(
        10 * (currentPage - 1),
        10 * currentPage,
      );
      setActiveIds([...newActiveIds]);
    }
  }, [currentPage, storiesIds]);

  useEffect(() => {
    if (!newStoriesLoading && !newStoriesError && newStoriesData) {
      setNewStoriesIds(newStoriesData.data);
    }
  }, [newStoriesData, newStoriesError, newStoriesLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <StoriesTypesList activeType="best" onChange={() => {}} />
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
