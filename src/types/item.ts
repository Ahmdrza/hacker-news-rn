export type Item = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  url: string;
};

export type Story = {
  type: 'story';
} & Item;
