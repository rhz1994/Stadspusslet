export interface City {
  id: number;
  name: string;
  description: string;
  setCity?: (city: string) => void;
}
