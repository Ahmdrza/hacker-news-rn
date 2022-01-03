import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { StyleSheet } from 'react-native';

import { getBestStories } from '../apis/story';
import { colors } from '../styles/colors';
import { Stories } from '../components/Stories';

export const BestStoriesScreen: React.FC = () => {
  const { data, isLoading } = useQuery('bestStories', getBestStories);

  return (
    <SafeAreaView style={styles.container}>
      <Stories loading={isLoading} storyIds={data?.data ?? []} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
