import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';

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
    </Stack.Navigator>
  );
};
