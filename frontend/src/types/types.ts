export interface City {
  id: number;
  name: string;
  description: string;
  icon: string;
  latitude: number;
  longitude: number;
  slug: string;
}

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export interface CityPickerProps {
  onSelectCity: (slug: string) => void;
}

export interface Quest {
  id: number;
  name: string;
  description: string;
  cityId: number;
}

export interface Puzzle {
  id: number;
  questId: number;
  locationId: number;
  puzzleText: string;
  correctAnswer: string;
  orderNumber: number;
  clueText: string | null;
  correctClueLocation: number;
  puzzleType?: string;
  locationLat: number;
  locationLon: number;
  cityLat?: number;
  cityLon?: number;
}
export interface PuzzleCardProps {
  quest: Quest;
}

export interface MapClickHandlerProps {
  activePuzzle: Puzzle;
  gameComplete: boolean;
  showPuzzle: boolean;
  onLocationFound: () => void;
  onWrongLocation: (distance: number) => void;
}
