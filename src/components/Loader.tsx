import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../styles/colors';

type LoaderProps = {
  color?: string;
  size?: number;
};

export const Loader: React.FC<LoaderProps> = ({
  color = colors.primary,
  size = 17,
}) => {
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const rotateAnimation = useRef(
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ),
  ).current;

  const opacityAnimation = useRef(
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }),
  ).current;

  useEffect(() => {
    rotateAnimation.start();
    opacityAnimation.start();

    return () => {
      opacityAnimation.reset();
      rotateAnimation.reset();
    };
  }, [opacityAnimation, rotateAnimation]);

  return (
    <Animated.View
      style={[
        styles.loaderContainer,
        {
          transform: [
            {
              rotate: rotate.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '365deg'],
              }),
            },
          ],
          opacity: opacity,
          height: size,
          width: size,
        },
      ]}>
      <Icon name="loading" size={size} color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    marginRight: 6,
  },
});
