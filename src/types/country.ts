export interface Country {
  name: {
    common: string;
  };
  region: string;
  subregion: string;
  capital: string[];
  population: number;
  flags: {
    alt: string;
    svg: string;
  };
}
