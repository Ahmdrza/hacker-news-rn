import { axios } from '../config/axios';
import { Story } from '../types/item';

export const getNewStories = async () => {
  return await axios.get<number[]>('newstories.json');
};

export const getTopStories = async () => {
  return await axios.get<number[]>('topstories.json');
};

export const getBestStories = async () => {
  return await axios.get<number[]>('beststories.json');
};

export const getStoryDetails = async ({ id }: { id: number }) => {
  return await axios.get<Story>(`item/${id}.json`);
};
