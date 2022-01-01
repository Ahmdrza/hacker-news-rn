import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TopStoriesScreen } from '../screens/TopStoriesScreen';
import { NewStoriesScreen } from '../screens/NewStoriesScreen';
import { WebViewScreen } from '../screens/WebViewScreen';
import { BestStoriesScreen } from '../screens/BestStoriesScreen';

const Stack = createNativeStackNavigator();

export const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="topStories">
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
