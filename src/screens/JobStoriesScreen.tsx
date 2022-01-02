import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { getJobStories } from '../apis/story';
import { Pagination } from '../components/Pagination';
import { LoadItem } from '../components/LoadItem';
import { colors } from '../styles/colors';
import { Header } from '../components/Header';

const PER_PAGE = 15;

export const JobStoriesScreen: FC = () => {
  const [storiesIds, setStoriesIds] = useState<number[]>([]);
  const [activeIds, setActiveIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery('jobStories', getJobStories);

  useEffect(() => {
    if (currentPage > 0 && storiesIds.length) {
      const newActiveIds = storiesIds.slice(
        PER_PAGE * (currentPage - 1),
        PER_PAGE * currentPage,
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
      <Header activeType="job" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {isLoading ? (
          <Text style={{ color: colors.primary }}>Fetching Data</Text>
        ) : (
          activeIds.map(id => <LoadItem key={id} id={id} />)
        )}
        <Pagination
          totalRecords={storiesIds.length}
          initialPage={1}
          perPage={PER_PAGE}
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
