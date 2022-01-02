import React, { FC, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, Easing, StyleSheet } from 'react-native';

import { Pagination } from '../components/Pagination';
import { LoadItem } from '../components/LoadItem';
import { colors } from '../styles/colors';
import { Header } from '../components/Header';

const PER_PAGE = 15;
const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 65;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

type StoriesProps = {
  storyIds: number[];
};

export const Stories: FC<StoriesProps> = ({ storyIds }) => {
  const [activeIds, setActiveIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPage > 0 && storyIds.length) {
      const newActiveIds = storyIds.slice(
        PER_PAGE * (currentPage - 1),
        PER_PAGE * currentPage,
      );
      setActiveIds([...newActiveIds]);
    }
  }, [currentPage, storyIds]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
    easing: Easing.linear,
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
    easing: Easing.linear,
  });

  const activeTypeTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -85],
    extrapolate: 'clamp',
    easing: Easing.linear,
  });

  const backgroundColor = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [colors.background, colors.primary],
    extrapolate: 'clamp',
    easing: Easing.linear,
  });

  const textColor = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [colors.primary, colors.white],
    extrapolate: 'clamp',
    easing: Easing.linear,
  });

  const textScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1.2, 1.4],
    extrapolate: 'clamp',
    easing: Easing.linear,
  });

  const translateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 56],
    extrapolate: 'clamp',
    easing: Easing.linear,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={1}
        contentContainerStyle={styles.contentContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
          },
        )}>
        {activeIds.map(id => (
          <LoadItem key={id} id={id} />
        ))}
        <Pagination
          totalRecords={storyIds.length}
          initialPage={1}
          perPage={PER_PAGE}
          onChange={setCurrentPage}
        />
      </Animated.ScrollView>
      <Header
        activeType="top"
        height={headerHeight}
        opacity={headerOpacity}
        translateY={activeTypeTranslateY}
        backgroundColor={backgroundColor}
        textColor={textColor}
        textScale={textScale}
        translateX={translateX}
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
    paddingHorizontal: 12,
    paddingTop: HEADER_MAX_HEIGHT + 10,
  },
});
