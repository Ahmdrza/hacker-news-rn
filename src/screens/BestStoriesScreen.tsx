import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { ScrollView, StyleSheet } from 'react-native';

import { getBestStories } from '../apis/story';
import { Pagination } from '../components/Pagination';
import { LoadItem } from '../components/LoadItem';
import { colors } from '../styles/colors';
import { Header } from '../components/Header';

export const BestStoriesScreen: FC = () => {
  const [storiesIds, setStoriesIds] = useState<number[]>([]);
  const [activeIds, setActiveIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery('bestStories', getBestStories);

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
    if (!isLoading && !isError && data) {
      setStoriesIds(data.data);
    }
  }, [data, isLoading, isError]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Header activeType="best" />
        {activeIds.map(id => (
          <LoadItem key={id} id={id} />
        ))}
        <Pagination
          totalRecords={storiesIds.length}
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
});
