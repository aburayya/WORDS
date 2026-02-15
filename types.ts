
export interface WordGraphic {
  id: string;
  text: string;
  textAr: string;
  imageUrl: string;
}

export type SelectionSlot = 1 | 2 | 3 | 4;
export type Language = 'ar' | 'en';

export interface SelectionState {
  1: WordGraphic | null;
  2: WordGraphic | null;
  3: WordGraphic | null;
  4: WordGraphic | null;
}

export interface GeneratedStory {
  sentence: string;
  explanation: string;
}
