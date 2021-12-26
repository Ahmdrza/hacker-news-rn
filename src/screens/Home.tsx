import React, { FC } from 'react';
// import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
// import { colors } from '../styles/colors';
import { ScreenStyles } from '../styles/common';

export const Home: FC = () => {
  return (
    <SafeAreaView style={ScreenStyles}>
      <Button title="Primary" onPress={() => console.log('primary clicked')} />
      <Button
        title="Secondary"
        kind="secondary"
        onPress={() => console.log('secondary clicked')}
      />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({});
