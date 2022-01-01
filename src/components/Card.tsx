import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '../styles/colors';

type CardProps = {
  style?: StyleProp<ViewStyle>;
};

export const Card: React.FC<CardProps> = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: colors.primary,
    /**
     * for android
     */
    elevation: 3,
    /**
     * for ios
     * TODO: revise values for ios later
     */
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
