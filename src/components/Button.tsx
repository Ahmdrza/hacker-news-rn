import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  loading,
  onPress,
  disabled,
  customStyles,
  ...rest
}) => {
  const [currentlyPressed, setCurrentlyPressed] = useState(false);
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const rotateAnimation = useRef(
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
        isInteraction: false,
      }),
    ),
  ).current;

  useEffect(() => {
    if (loading) {
      rotateAnimation.start();
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).reset();
      rotateAnimation.reset();
    }

    return () => {
      rotateAnimation.reset();
    };
  }, [loading, opacity, rotateAnimation]);

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
              },
            ]}>
            <Icon
              name="loading"
              size={17}
              color={kind === 'primary' ? colors.background : colors.primary}
            />
          </Animated.View>
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
  loaderContainer: {
    marginRight: 6,
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
