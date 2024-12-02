import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, beforeEach, it, expect } from "vitest";
import CountryList from "../../features/countries/CountryList";
import useCountries from "../../features/countries/hooks/useCountries";
import { options } from "../../features/countries/options";
import { mockCountries } from "@/tests/mocks/country.mock";
import "@testing-library/jest-dom";

vi.mock("./hooks/useCountries");

const mockUseCountries = useCountries as jest.MockedFunction<typeof useCountries>;

describe("CountryList", () => {
  beforeEach(() => {
    mockUseCountries.mockReturnValue({
      countries: [],
      search: "",
      handleSearch: vi.fn(),
      filter: options[0],
      handleChange: vi.fn(),
      paginate: { totalPages: 1, currentPage: 1, pagination: [1] },
      handlePagination: vi.fn(),
      isLoading: false,
    });
  });

  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <CountryList />
      </BrowserRouter>,
    );
    expect(screen.getByText(/No countries found/i)).toBeInTheDocument();
  });

  it("displays loading placeholders when loading", () => {
    mockUseCountries.mockReturnValueOnce({
      ...mockUseCountries(),
      isLoading: true,
    });
    render(
      <BrowserRouter>
        <CountryList />
      </BrowserRouter>,
    );

    expect(screen.getAllByRole("img", { name: /placeholder/i })).toHaveLength(12);
  });

  it("displays countries", () => {
    mockUseCountries.mockReturnValueOnce({
      ...mockUseCountries(),
      countries: mockCountries,
    });
    render(
      <BrowserRouter>
        <CountryList />
      </BrowserRouter>,
    );
    expect(screen.getByText(/Grenada/i)).toBeInTheDocument();
  });

  it("handles search input", () => {
    const handleSearch = vi.fn();
    mockUseCountries.mockReturnValueOnce({
      ...mockUseCountries(),
      handleSearch,
    });
    render(
      <BrowserRouter>
        <CountryList />
      </BrowserRouter>,
    );
    fireEvent.change(screen.getByLabelText(/Search/i), { target: { value: "Grenada" } });
    expect(handleSearch).toHaveBeenCalledWith(expect.anything());
  });

  // it("handles filter change", () => {
  //   const handleChange = vi.fn();
  //   mockUseCountries.mockReturnValueOnce({
  //     ...mockUseCountries(),
  //     handleChange,
  //   });
  //   render(
  //     <BrowserRouter>
  //       <CountryList />
  //     </BrowserRouter>,
  //   );
  //   fireEvent.change(screen.getByLabelText(/Filter/i), { target: { value: "Americas" } });
  //   expect(handleChange).toHaveBeenCalledWith({ label: "Americas", value: "Americas" });
  // });

  it("handles pagination", () => {
    const handlePagination = vi.fn();
    mockUseCountries.mockReturnValueOnce({
      ...mockUseCountries(),
      paginate: { totalPages: 2, currentPage: 1, pagination: [1, 2] },
      handlePagination,
    });
    render(
      <BrowserRouter>
        <CountryList />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByText("2"));
    expect(handlePagination).toHaveBeenCalledWith(2);
  });
});
