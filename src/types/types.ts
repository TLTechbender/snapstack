export type Mode = 'manual' | 'continuous';
export type SharpnessLevel = 'red' | 'yellow' | 'green';

export interface Page {
  id: string;
  imageUrl: string;
  timestamp: string;
  name: string;
}
