import React, { useState } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '../styles/colors';
import { Loader } from './Loader';

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
  loading,
  onPress,
  disabled,
  customStyles,
  ...rest
}) => {
  const [currentlyPressed, setCurrentlyPressed] = useState(false);

  return (
    <Pressable
      style={[
        styles.baseButton,
        kind === 'primary'
          ? disabled
            ? styles.primaryButtonContainerDisabled
            : styles.primaryButtonContainer
          : disabled
          ? styles.secondaryButtonContainerDisabled
          : styles.secondaryButtonContainer,
        currentlyPressed ? styles.pressed : null,
        customStyles,
      ]}
      onPressIn={() => setCurrentlyPressed(true)}
      onPressOut={() => {
        onPress();
        setCurrentlyPressed(false);
      }}
      disabled={disabled}
      {...rest}>
      <View style={styles.baseTextContainer}>
        {loading && (
          <Loader color={kind === 'primary' ? colors.white : colors.primary} />
        )}
        <Text
          style={[
            styles.baseText,
            kind === 'primary'
              ? styles.primaryButtonText
              : disabled
              ? styles.secondaryButtonDisabledText
              : styles.secondaryButtonText,
          ]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 22,
    borderWidth: 2,
    alignSelf: 'flex-start',
    minWidth: 100,
  },
  baseTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontWeight: '500',
    fontSize: 15,
  },
  primaryButtonText: {
    color: colors.secondaryText,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  secondaryButtonDisabledText: {
    color: 'gray',
  },
  primaryButtonContainer: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  secondaryButtonContainer: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.8,
  },
  primaryButtonContainerDisabled: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
  },
  secondaryButtonContainerDisabled: {
    backgroundColor: colors.border,
    borderColor: colors.border,
  },
});
