import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../styles/colors';
import { RootStackParamList } from '../types/stack';

import { Card } from './Card';

type ItemProps = {
  id: number;
  upvotes?: number;
  title: string;
  author: string;
  time: number;
  url?: string;
};

export const Item: React.FC<ItemProps> = ({
  id,
  upvotes,
  title,
  author,
  time,
  url,
}) => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Card>
      <Pressable
        style={styles.container}
        onPress={() => {
          url && navigate('webview', { title, url });
        }}>
        <View style={styles.upvotesContainer}>
          <Icon name="heart" size={18} color={colors.primary} />
          <Text style={{ color: colors.primary }}>
            {upvotes ? upvotes : '0'}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.label}>{title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>{author}</Text>
            <Icon name="circle-small" color={colors.secondary} size={12} />
            <Text style={styles.info}>
              {new Date(time * 1000).toDateString()}
            </Text>
            <Icon name="circle-small" color={colors.secondary} size={12} />
            <Text style={styles.info}>{id}</Text>
          </View>
        </View>
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  upvotesContainer: {
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.border,
    paddingRight: 8,
    marginRight: 8,
  },
  contentContainer: {
    flex: 1,
  },
  label: {
    color: colors.primary,
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    color: colors.secondary,
    fontSize: 12,
  },
});
