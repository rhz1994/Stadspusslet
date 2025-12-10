export interface City {
  id: number;
  name: string;
  description: string;
  icon: string;
  latitude: string;
  longitude: string;
  setCity?: (city: string) => void;
}

export type Coordinates = {
  lat: number;
  lon: number;
};
