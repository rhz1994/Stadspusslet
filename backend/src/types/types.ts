export interface City {
  id: number;
  name: string;
  description: string;
}

export interface Quest {
  id: number;
  name: string;
  description: string;
  cityId: number;
  puzzles?: Puzzle[];
}

export interface Location {
  id: number;
  name: string;
  description: string;
  cityId: number;
}

export interface Puzzle {
  id: number;
  questId: number;
  locationId: number;
  orderNumber: number;
  clueText: string;
  puzzleType: string;
  location?: Location;
}
