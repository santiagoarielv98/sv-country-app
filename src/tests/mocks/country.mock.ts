import type { Country } from "@/app/services/api";

export const mockCountries: Country[] = [
  {
    flags: {
      svg: "https://flagcdn.com/gs.svg",
      alt: "",
    },
    name: {
      common: "South Georgia",
      official: "South Georgia and the South Sandwich Islands",
      nativeName: {
        eng: {
          official: "South Georgia and the South Sandwich Islands",
          common: "South Georgia",
        },
      },
    },
    capital: ["King Edward Point"],
    region: "Antarctic",
    subregion: "",
    population: 30,
  },
  {
    flags: {
      svg: "https://flagcdn.com/gd.svg",
      alt: "The flag of Grenada features a large central rectangular area surrounded by a red border, with three five-pointed yellow stars centered on the top and bottom borders. The central rectangle is divided diagonally into four alternating triangular areas of yellow at the top and bottom and green on the hoist and fly sides, and a five-pointed yellow star on a red circle is superimposed at its center. A symbolic nutmeg pod is situated on the green hoist-side triangle.",
    },
    name: {
      common: "Grenada",
      official: "Grenada",
      nativeName: {
        eng: {
          official: "Grenada",
          common: "Grenada",
        },
      },
    },
    capital: ["St. George's"],
    region: "Americas",
    subregion: "Caribbean",
    population: 112519,
  },
];
