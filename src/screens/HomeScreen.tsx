import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { FlatList, StyleSheet, Text } from 'react-native';

import { getNewStories } from '../apis/story';
import { Pagination } from '../components/Pagination';
import { LoadItem } from '../components/LoadItem';
import { colors } from '../styles/colors';
import { Button } from '../components/Button';

export const Home: FC = () => {
  const [newStoriesIds, setNewStoriesIds] = useState<number[]>([]);

  const {
    data: newStoriesData,
    isLoading: newStoriesLoading,
    isError: newStoriesError,
  } = useQuery('newStories', getNewStories);

  useEffect(() => {
    if (!newStoriesLoading && !newStoriesError && newStoriesData) {
      setNewStoriesIds(newStoriesData.data);
    }
  }, [newStoriesData, newStoriesError, newStoriesLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={newStoriesIds.slice(1, 20)}
        keyExtractor={item => item.toString()}
        renderItem={({ item }) => <LoadItem id={item} />}
        ListHeaderComponent={() => (
          <>
            <FlatList
              style={{ marginBottom: 12 }}
              contentContainerStyle={{ padding: 3 }}
              horizontal
              showsHorizontalScrollIndicator
              data={['New', 'Top']}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <Button
                  style={{ marginRight: 12 }}
                  kind="secondary"
                  title={item}
                  onPress={() => console.log(item)}
                />
              )}
            />
            <Text style={styles.headerText}>New Stories</Text>
          </>
        )}
        ListFooterComponent={() => (
          <Pagination
            totalRecords={newStoriesIds.length}
            currentPage={1}
            perPage={10}
            onChange={page => console.log('page', page)}
          />
        )}
      />
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
    paddingHorizontal: 8,
  },
  headerText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
});
