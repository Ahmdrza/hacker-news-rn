import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/colors';

import { StoryType } from '../types/item';
import { Button } from './Button';

type HeaderProps = {
  activeType: StoryType;
};

export const Header: React.FC<HeaderProps> = ({ activeType }) => {
  const { navigate } = useNavigation();

  const _handleStoryTypeChange = (type: StoryType) => {
    switch (type) {
      case 'top':
        return navigate('topStories');
      case 'new':
        return navigate('newStories');
      case 'best':
        return navigate('bestStories');
      default:
        break;
    }
  };

  return (
    <>
      <Text style={styles.header}>Hacker News</Text>
      <FlatList
        style={styles.storiesList}
        contentContainerStyle={styles.storiesListContentContainer}
        horizontal
        showsHorizontalScrollIndicator
        data={['top', 'new', 'best']}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Button
            style={styles.storyButton}
            kind={activeType === item ? 'primary' : 'secondary'}
            title={`${item[0].toUpperCase()}${item
              .split('')
              .splice(1)
              .join('')}`}
            onPress={() => _handleStoryTypeChange(item as StoryType)}
          />
        )}
      />
      <Text style={styles.activeType}>{activeType} Stories</Text>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 10,
  },
  storiesListContentContainer: {
    padding: 3,
  },
  storiesList: {
    marginBottom: 12,
  },
  storyButton: {
    marginRight: 12,
  },
  activeType: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
});
