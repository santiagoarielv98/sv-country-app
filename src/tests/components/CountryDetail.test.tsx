import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import CountryDetail from "../../features/countries/CountryDetail";
import { useGetCountriesQuery } from "@/app/services/api";
import "@testing-library/jest-dom";

// Mock the API hook
vi.mock("@/app/services/api", () => ({
  useGetCountriesQuery: vi.fn(),
}));

const mockCountry = {
  name: {
    common: "Test Country",
    official: "Official Test Country",
    nativeName: {
      eng: {
        common: "Native Test Country",
      },
    },
  },
  population: 1000000,
  region: "Test Region",
  subregion: "Test Subregion",
  capital: ["Test Capital"],
  flags: {
    svg: "test-flag.svg",
    alt: "Test Flag Alt",
  },
};

describe("CountryDetail", () => {
  it("renders loading state initially", () => {
    (useGetCountriesQuery as jest.Mock).mockReturnValue({
      country: undefined,
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CountryDetail />} />
        </Routes>
      </BrowserRouter>,
    );

    expect(screen.getByRole("img", { name: /placeholder/i })).toBeInTheDocument();
  });

  it("renders country details when data is loaded", () => {
    (useGetCountriesQuery as jest.Mock).mockReturnValue({
      country: mockCountry,
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CountryDetail />} />
        </Routes>
      </BrowserRouter>,
    );

    expect(screen.getByText(/Test Country \(Official Test Country\)/)).toBeInTheDocument();
    expect(screen.getByText(/Native Test Country/)).toBeInTheDocument();
    expect(screen.getByText(/1000000/)).toBeInTheDocument();
    expect(screen.getByText(/Test Region/)).toBeInTheDocument();
    expect(screen.getByText(/Test Subregion/)).toBeInTheDocument();
    expect(screen.getByText(/Test Capital/)).toBeInTheDocument();
    expect(screen.getByAltText("Test Flag Alt")).toBeInTheDocument();
  });

  it("renders back button that links to home", () => {
    (useGetCountriesQuery as jest.Mock).mockReturnValue({
      country: mockCountry,
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CountryDetail />} />
        </Routes>
      </BrowserRouter>,
    );

    const backButton = screen.getByRole("button", { name: /back/i });
    expect(backButton).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
