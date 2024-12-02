import { getPagination } from "@/utils/pagination";
import React from "react";
import type { Option } from "../options";
import { options } from "../options";
import { useGetCountriesQuery } from "@/app/services/api";

const useCountries = () => {
  const { data: countries = [], isLoading } = useGetCountriesQuery();
  const [filter, setFilter] = React.useState(options[0]);
  const [search, setSearch] = React.useState("");

  const [page, setPage] = React.useState(1);
  const perPage = 12;

  const filteredCountries = React.useMemo(
    () =>
      countries.filter(
        (country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase()) && country.region.includes(filter.value),
      ),
    [countries, filter, search],
  );

  const totalPages = React.useMemo(() => Math.ceil(filteredCountries.length / perPage), [filteredCountries]);

  const pagination = React.useMemo(() => getPagination(totalPages, page, 1), [totalPages, page]);

  const onFilter = (option: Option) => {
    setPage(1);
    setFilter(option);
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearch(event.target.value);
  };

  const onPagination = (value: "prev" | "next" | number | "...") => {
    if (value === "...") return;

    if (value === "prev" && page > 1) {
      setPage(page - 1);
      return;
    }

    if (value === "next" && page < totalPages) {
      setPage(page + 1);
      return;
    }

    if (typeof value === "number") {
      if (value >= 1 && value <= totalPages) {
        setPage(value);
      }
    }
  };

  return {
    isLoading,
    countries: filteredCountries.slice((page - 1) * perPage, page * perPage),
    filter,
    search,
    paginate: {
      totalPages,
      currentPage: page,
      pagination,
    },
    handleChange: onFilter,
    handleSearch: onSearch,
    handlePagination: onPagination,
  };
};

export default useCountries;
