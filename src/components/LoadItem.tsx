import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useQuery } from 'react-query';

import { getStoryDetails } from '../apis/story';
import { Card } from './Card';
import { Item } from './Item';

type LoadItemProps = {
  id: number;
};

export const LoadItem: React.FC<LoadItemProps> = ({ id }) => {
  const { data, isLoading, isError } = useQuery(
    ['getStoryDetails', id],
    () => getStoryDetails({ id }),
    {
      enabled: !!id,
    },
  );
  return (
    <>
      {isLoading ? (
        <Card>
          <ContentLoader
            speed={2}
            width={500}
            height={45}
            viewBox="0 0 500 45"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <Rect x="9" y="4" rx="5" ry="5" width="220" height="10" />
            <Rect x="10" y="22" rx="5" ry="5" width="92" height="9" />
            <Rect x="110" y="22" rx="5" ry="5" width="75" height="9" />
          </ContentLoader>
        </Card>
      ) : !isError && data ? (
        <Item
          id={data.data.id}
          upvotes={data.data.score}
          title={data.data.title}
          author={data.data.by}
          time={data.data.time}
          url={data.data.url}
        />
      ) : null}
    </>
  );
};
