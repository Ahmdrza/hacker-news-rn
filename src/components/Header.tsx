import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/colors';

import { StoryType } from '../types/item';
import { Button } from './Button';

const types = ['top', 'new', 'best', 'job'];

type HeaderProps = {
  activeType: StoryType;
  height: Animated.AnimatedInterpolation;
  opacity: Animated.AnimatedInterpolation;
  translateY: Animated.AnimatedInterpolation;
  backgroundColor: Animated.AnimatedInterpolation;
  textColor: Animated.AnimatedInterpolation;
  textScale: Animated.AnimatedInterpolation;
  translateX: Animated.AnimatedInterpolation;
};

export const Header: React.FC<HeaderProps> = ({
  activeType,
  height,
  opacity,
  translateY,
  backgroundColor,
  textColor,
  textScale,
  translateX,
}) => {
  const { navigate } = useNavigation();

  const scrollRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      if (scrollRef && scrollRef.current) {
        const activeTypeIndex = types.indexOf(activeType);
        scrollRef.current.scrollToIndex({
          index: activeTypeIndex,
          animated: true,
        });
      }
    }, 500);
  }, [activeType]);

  const _handleStoryTypeChange = (type: StoryType) => {
    switch (type) {
      case 'top':
        return navigate('topStories');
      case 'new':
        return navigate('newStories');
      case 'best':
        return navigate('bestStories');
      case 'job':
        return navigate('jobStories');
      default:
        break;
    }
  };

  return (
    <Animated.View style={[styles.container, { height, backgroundColor }]}>
      <Animated.View style={[{ opacity }]}>
        <Text style={[styles.header]}>Hacker News</Text>
      </Animated.View>
      <Animated.View style={[{ opacity }]}>
        <FlatList
          ref={scrollRef}
          contentContainerStyle={styles.storiesListContentContainer}
          horizontal
          showsHorizontalScrollIndicator
          alwaysBounceHorizontal={false}
          onScrollToIndexFailed={() => {}}
          data={types}
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
      </Animated.View>
      <Animated.Text
        style={[
          styles.activeType,
          {
            transform: [{ translateY }, { scale: textScale }, { translateX }],
            color: textColor,
          },
        ]}>
        {activeType} Stories
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  header: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 10,
  },
  storiesListContentContainer: {
    paddingHorizontal: 5,
    paddingTop: 3,
    paddingBottom: 15,
  },
  storyButton: {
    marginRight: 12,
  },
  activeType: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
