import React from 'react';
import { FlatList } from 'react-native';

import { StoryType } from '../types/item';
import { Button } from './Button';

type StoriesTypesListProps = {
  activeType: StoryType;
  onChange: (type: StoryType) => void;
};

export const StoriesTypesList: React.FC<StoriesTypesListProps> = ({
  activeType,
  onChange,
}) => {
  return (
    <FlatList
      style={{ marginBottom: 12 }}
      contentContainerStyle={{ padding: 3 }}
      horizontal
      showsHorizontalScrollIndicator
      data={['top', 'new', 'best']}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <Button
          style={{ marginRight: 12 }}
          kind={activeType === item ? 'primary' : 'secondary'}
          title={`${item[0].toUpperCase()}${item.split('').splice(1).join('')}`}
          onPress={() => onChange(item as StoryType)}
        />
      )}
    />
  );
};
