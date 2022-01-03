import React, { useEffect, useState } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '../styles/colors';

type ProgessProps = {
  /**
   * number between 0-1
   */
  progress: number;
  // progressRef: Animated.AnimatedInterpolation;
  style?: StyleProp<ViewStyle>;
};

export const Progress: React.FC<ProgessProps> = ({
  progress,
  // progressRef,
  style,
}) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (progress === 1) {
      setTimeout(() => {
        setDone(true);
      }, 300);
    }
  }, [progress]);

  return (
    <>
      {!done ? (
        <View style={[styles.container, style]}>
          <Animated.View
            style={[
              styles.progress,
              {
                width: `${progress * 100}%`,
              },
            ]}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.border,
    height: 6,
  },
  progress: {
    backgroundColor: colors.primary,
    height: 6,
  },
});
