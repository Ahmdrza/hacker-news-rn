import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { colors } from '../styles/colors';
import { Button } from './Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/stack';

type StoryTypes = {
  key: string;
  label: string;
  routeName: string;
};

const storyTypes: StoryTypes[] = [
  { key: 'top', label: 'Top', routeName: 'topStories' },
  { key: 'new', label: 'New', routeName: 'newStories' },
  { key: 'best', label: 'Best', routeName: 'bestStories' },
  { key: 'job', label: 'Job', routeName: 'jobStories' },
];

type HeaderProps = {
  height: Animated.AnimatedInterpolation;
  opacity: Animated.AnimatedInterpolation;
  translateY: Animated.AnimatedInterpolation;
  backgroundColor: Animated.AnimatedInterpolation;
  textColor: Animated.AnimatedInterpolation;
  textScale: Animated.AnimatedInterpolation;
  translateX: Animated.AnimatedInterpolation;
};

export const Header: React.FC<HeaderProps> = ({
  height,
  opacity,
  translateY,
  backgroundColor,
  textColor,
  textScale,
  translateX,
}) => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { name: activeRouteName } = useRoute();

  const scrollRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      if (scrollRef && scrollRef.current) {
        const activeTypeIndex = storyTypes.findIndex(
          type => type.routeName === activeRouteName,
        );
        scrollRef.current.scrollToIndex({
          index: activeTypeIndex,
          animated: true,
        });
      }
    }, 500);
  }, [activeRouteName]);

  const _getActiveStoryType = useCallback(() => {
    return (
      storyTypes.find(type => type.routeName === activeRouteName)?.label ??
      'Stories'
    );
  }, [activeRouteName]);

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
          data={storyTypes}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <Button
              style={styles.storyButton}
              kind={
                activeRouteName === item.routeName ? 'primary' : 'secondary'
              }
              title={item.label}
              onPress={() => navigate(item.routeName)}
            />
          )}
        />
      </Animated.View>
      <Animated.Text
        style={[
          styles.label,
          {
            transform: [{ translateY }, { scale: textScale }, { translateX }],
            color: textColor,
          },
        ]}>
        {_getActiveStoryType()} Stories
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
  label: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
