import React, { FC, useEffect, useState } from 'react';
// import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
// import { colors } from '../styles/colors';
import { ScreenStyles } from '../styles/common';
import { getNewStories } from '../apis/story';
import { useQuery } from 'react-query';
import { Text, View } from 'react-native';

export const Home: FC = () => {
  const [newStoriesIds, setNewStoriesIds] = useState<number[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: newStoriesData,
    isLoading: newStoriesLoading,
    isError: newStoriesError,
  } = useQuery('newStories', getNewStories);

  console.log('newStoriesError', newStoriesError);

  useEffect(() => {
    if (!newStoriesLoading && !newStoriesError && newStoriesData) {
      setNewStoriesIds(newStoriesData.data);
      setPages(Math.ceil(newStoriesData.data.length / 10));
      setCurrentPage(1);
    }
  }, [newStoriesData, newStoriesError, newStoriesLoading]);

  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={ScreenStyles}>
      <Button
        title="Primary Button"
        onPress={() => console.log('primary clicked')}
        loading={loading}
        disabled={loading}
      />
      <Button
        title="Secondary"
        kind="secondary"
        onPress={() => console.log('secondary clicked')}
        loading={loading}
        disabled={loading}
      />
      <Button
        title={`${loading ? 'stop' : 'start'} Loading`}
        onPress={() => setLoading(!loading)}
        customStyles={{ marginTop: 20 }}
      />
      <Text style={{ color: '#000' }}>{currentPage}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title="Prev"
          kind="secondary"
          onPress={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Button
          title="Next"
          kind="secondary"
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={
            !newStoriesData ||
            currentPage === Math.ceil(newStoriesData.data.length / 10)
          }
        />
      </View>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({});
