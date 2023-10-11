export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
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
