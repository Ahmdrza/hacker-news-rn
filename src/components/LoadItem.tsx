import React from 'react';
import { useQuery } from 'react-query';

import { getStoryDetails } from '../apis/story';
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
      {!isLoading && !isError && data ? (
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
