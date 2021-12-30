import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import { Progress } from '../components/Progress';
import { ScreenStyles } from '../styles/common';

type WebViewScreenProps = {
  uri: string;
};

export const WebViewScreen: React.FC<WebViewScreenProps> = ({ uri }) => {
  const [progress, setProgress] = useState(0);
  return (
    <SafeAreaView style={[ScreenStyles, styles.webViewContainer]}>
      <Progress progress={progress} />
      <WebView
        source={{ uri }}
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    padding: 0,
  },
});
