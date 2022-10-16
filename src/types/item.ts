export type Item = {
  by: string;
  descendants?: number;
  id: number;
  kids?: number[];
  score: number;
  time: number;
  title: string;
  url?: string;
  text?: string;
  parent?: number;
};

export type Story = {
  type: 'story';
} & Item;

export type StoryType = 'top' | 'new' | 'best' | 'job';

export type StoryDetailType = {
  id: number;
  title: string;
  text: string;
  by: string;
};
