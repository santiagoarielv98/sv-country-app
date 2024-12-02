import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useCountries from "./useCountries";
import { useGetCountriesQuery } from "@/app/services/api";
import { options } from "../options";
import { mockCountries2 } from "@/tests/mocks/country.mock";

vi.mock("@/app/services/api", () => ({
  useGetCountriesQuery: vi.fn(),
}));

describe("useCountries", () => {
  beforeEach(() => {
    (useGetCountriesQuery as jest.Mock).mockReturnValue({
      data: mockCountries2,
      isLoading: false,
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useCountries());

    expect(result.current.search).toBe("");
    expect(result.current.filter).toEqual(options[0]);
    expect(result.current.paginate.currentPage).toBe(1);
    expect(result.current.isLoading).toBe(false);
  });

  it("should filter countries by search term", () => {
    const { result } = renderHook(() => useCountries());

    act(() => {
      result.current.handleSearch({ target: { value: "arg" } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.countries).toHaveLength(1);
    expect(result.current.countries[0].name.common).toBe("Argentina");
  });

  it("should filter countries by region", () => {
    const { result } = renderHook(() => useCountries());

    act(() => {
      result.current.handleChange(options[2]); // Americas region
    });

    expect(result.current.countries).toHaveLength(4);
    expect(result.current.countries[0].name.common).toBe("Argentina");
    expect(result.current.countries[1].name.common).toBe("Brazil");
    expect(result.current.countries[2].name.common).toBe("Canada");
    expect(result.current.countries[3].name.common).toBe("United States");
  });

  it("should handle pagination correctly", () => {
    const { result } = renderHook(() => useCountries());

    act(() => {
      result.current.handlePagination(2);
    });

    expect(result.current.paginate.currentPage).toBe(2);

    act(() => {
      result.current.handlePagination("prev");
    });

    expect(result.current.paginate.currentPage).toBe(1);

    act(() => {
      result.current.handlePagination("next");
    });

    expect(result.current.paginate.currentPage).toBe(2);
  });

  it("should reset pagination when filtering or searching", () => {
    const { result } = renderHook(() => useCountries());
    act(() => {
      result.current.handlePagination(2);
    });

    expect(result.current.paginate.currentPage).toBe(2);

    act(() => {
      result.current.handleSearch({ target: { value: "arg" } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.paginate.currentPage).toBe(1);

    act(() => {
      result.current.handlePagination(2);
      result.current.handleChange(options[2]);
    });

    expect(result.current.paginate.currentPage).toBe(1);
  });

  it("should handle loading state", () => {
    (useGetCountriesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() => useCountries());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.countries).toHaveLength(0);
  });
});
