import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { colors } from '../styles/colors';

import { ScreenStyles } from '../styles/common';
import { RootStackParamList } from '../types/stack';

export const StoryDetailScreen: React.FC = () => {
  const {
    params: { title, by, text },
  } = useRoute<RouteProp<RootStackParamList, 'storyDetails'>>();

  return (
    <SafeAreaView style={[ScreenStyles]}>
      <ScrollView>
        <Text
          style={{ color: colors.primary, fontSize: 20, fontWeight: '700' }}>
          {title}
        </Text>
        <WebView
          originWhitelist={['*']}
          source={{ html: text }}
          style={{
            width: Dimensions.get('screen').width - 40,
            height: 1000,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
