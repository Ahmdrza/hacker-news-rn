import { StoryDetailType } from './item';

export type RootStackParamList = {
  topStories: undefined;
  newStories: undefined;
  bestStories: undefined;
  jobStories: undefined;
  webview: { title: string; url: string };
  storyDetails: StoryDetailType;
};
