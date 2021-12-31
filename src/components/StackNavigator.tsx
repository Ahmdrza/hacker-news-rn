import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/HomeScreen';
import { WebViewScreen } from '../screens/WebViewScreen';

const Stack = createNativeStackNavigator();

export const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
        component={Home}
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
