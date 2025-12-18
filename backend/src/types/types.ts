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

export type Puzzle = {
  id: number;
  questId: number;
  locationId: number;
  puzzleText: string;
  correctAnswer: string;
  orderNumber: number;
  clueText: string;
  correctClueLocation: number;
  puzzleType: string;
  locationLat: number;
  locationLon: number;
  cityLat?: number;
  cityLon?: number;
};

export type PuzzleDB = {
  id: number;
  quest_id: number;
  location_id: number;
  puzzle_text: string;
  clue_text: string;
  correct_answer: string;
  correct_clue_location: number;
  order_number: number;
  puzzle_type: string;
  locationLat: number;
  locationLon: number;
  cityLat?: number;
  cityLon?: number;
};
