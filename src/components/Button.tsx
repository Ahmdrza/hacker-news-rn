import React, { useState } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { colors } from '../styles/colors';

type ButtonProps = {
  kind?: 'primary' | 'secondary';
  title: string;
  loading?: boolean;
  onPress: () => void;
  customStyles?: StyleProp<ViewStyle>;
} & Omit<PressableProps, 'onPress' | 'onPressIn' | 'onPressOut'>;

export const Button: React.FC<ButtonProps> = ({
  kind = 'primary',
  title,
  onPress,
  customStyles,
  ...rest
}) => {
  const [currentlyPressed, setCurrentlyPressed] = useState(false);
  return (
    <Pressable
      style={[
        styles.baseButton,
        kind === 'primary' ? styles.primaryButton : styles.secondaryButton,
        currentlyPressed ? styles.pressed : null,
        customStyles,
      ]}
      onPressIn={() => setCurrentlyPressed(true)}
      onPressOut={() => {
        onPress();
        setCurrentlyPressed(false);
      }}
      {...rest}>
      <Text
        style={[
          styles.baseText,
          kind === 'primary'
            ? styles.primaryButtonText
            : styles.secondaryButtonText,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 2,
    flexShrink: 3,
    alignSelf: 'flex-start',
    minWidth: 100,
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  primaryButtonText: {
    color: colors.secondaryText,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.8,
  },
});
