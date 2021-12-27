import React, { FC, useState } from 'react';
// import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
// import { colors } from '../styles/colors';
import { ScreenStyles } from '../styles/common';

export const Home: FC = () => {
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView style={ScreenStyles}>
      <Button
        title="Primary Button"
        onPress={() => console.log('primary clicked')}
        loading={loading}
      />
      <Button
        title="Secondary"
        kind="secondary"
        onPress={() => console.log('secondary clicked')}
        loading={loading}
      />
      <Button
        title={`${loading ? 'stop' : 'start'} Loading`}
        onPress={() => setLoading(!loading)}
        customStyles={{ marginTop: 20 }}
      />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({});
