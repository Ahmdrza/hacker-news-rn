import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';

import { ScreenStyles } from '../styles/common';
import { getNewStories } from '../apis/story';
import { Pagination } from '../components/Pagination';

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
    <SafeAreaView style={ScreenStyles}>
      <Pagination
        totalRecords={newStoriesIds.length}
        currentPage={1}
        perPage={10}
        onChange={page => console.log('page', page)}
      />
    </SafeAreaView>
  );
};
