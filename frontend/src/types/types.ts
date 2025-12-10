export interface City {
  id: number;
  name: string;
  description: string;
  icon: string;
  setCity?: (city: string) => void;
}

export type Coordinates = {
  lat: number;
  lon: number;
};
