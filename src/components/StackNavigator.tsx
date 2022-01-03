import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TopStoriesScreen } from '../screens/TopStoriesScreen';
import { NewStoriesScreen } from '../screens/NewStoriesScreen';
import { BestStoriesScreen } from '../screens/BestStoriesScreen';
import { JobStoriesScreen } from '../screens/JobStoriesScreen';
import { WebViewScreen } from '../screens/WebViewScreen';
import { RootStackParamList } from '../types/stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="topStories"
      screenOptions={{ animation: 'fade_from_bottom' }}>
      <Stack.Screen
        name="topStories"
        options={{
          headerShown: false,
        }}
        component={TopStoriesScreen}
      />
      <Stack.Screen
        name="newStories"
        options={{
          headerShown: false,
        }}
        component={NewStoriesScreen}
      />
      <Stack.Screen
        name="bestStories"
        options={{
          headerShown: false,
        }}
        component={BestStoriesScreen}
      />
      <Stack.Screen
        name="jobStories"
        options={{
          headerShown: false,
        }}
        component={JobStoriesScreen}
      />
      <Stack.Screen
        name="webview"
        options={{
          title: 'Web View',
          headerShown: true,
        }}
        component={WebViewScreen}
      />
    </Stack.Navigator>
  );
};
