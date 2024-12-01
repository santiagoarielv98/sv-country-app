import { getPagination } from "@/utils/pagination";
import React from "react";
import { Option, options } from "../options";
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
    setFilter(option);
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onPaginationClick = (page: number | string) => {
    if (page === "...") return;
    setPage(page as number);
  };

  React.useEffect(() => {
    setPage(1);
  }, [filter, search]);

  return {
    countries: filteredCountries.slice((page - 1) * perPage, page * perPage),
    filter,
    search,
    page,
    pagination,
    totalPages,
    handleChange: onFilter,
    handleSearch: onSearch,
    handlePageClick: onPaginationClick,
    setPage,
    isLoading,
  };
};

export default useCountries;
