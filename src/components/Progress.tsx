import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../styles/colors';

type ProgessProps = {
  /**
   * number between 0-1
   */
  progress: number;
};

export const Progress: React.FC<ProgessProps> = ({ progress }) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (progress === 1) {
      setDone(true);
    }
  }, [progress]);

  return (
    <>
      {!done ? (
        <View style={styles.container}>
          <View style={[styles.progress, { width: `${progress * 100}%` }]} />
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
