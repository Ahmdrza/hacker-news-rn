import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { Progress } from '../components/Progress';
import { ScreenStyles } from '../styles/common';
import { RootStackParamList } from '../types/stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../styles/colors';

export const WebViewScreen: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'webview'>>();
  const { setOptions } =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'webview'>>();

  const [progress, setProgress] = useState(0);
  // const AnimatedWebView = Animated.createAnimatedComponent(WebView);
  // const progressRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setOptions({
      headerTitle: () => {
        return (
          <Pressable style={styles.headerContainer}>
            <Text style={styles.headerTitle} numberOfLines={2}>
              {params.title}
            </Text>
            <Text style={{ color: colors.secondary }} numberOfLines={1}>
              {params.url}
            </Text>
          </Pressable>
        );
      },
    });
  }, [params.title, params.url, setOptions]);

  // const progressAnim = progressRef.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0%', '100%'],
  //   extrapolate: 'clamp',
  //   easing: Easing.linear,
  // });

  return (
    <SafeAreaView style={[ScreenStyles, styles.webViewContainer]}>
      <Progress progress={progress} style={styles.progress} />
      {/* <AnimatedWebView
        source={{ uri: params.url }}
        onLoadProgress={Animated.event<{ nativeEvent: { progress: number } }>(
          [{ nativeEvent: { progress: progressRef } }],
          {
            useNativeDriver: false,
          },
        )}
      /> */}
      <WebView
        source={{ uri: params.url }}
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingRight: 73,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  progress: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  webViewContainer: {
    padding: 0,
  },
});
