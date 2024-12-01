import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { useGetCountriesQuery } from "@/app/services/api";
import Search from "@/components/icons/Search";
import { getPagination } from "@/utils/pagination";
interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "", label: "All" },
  { value: "Africa", label: "Africa" },
  { value: "America", label: "America" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
];

const CountryList = () => {
  const { data: countries = [] } = useGetCountriesQuery();
  const [filter, setFilter] = React.useState(options[0]);
  const [search, setSearch] = React.useState("");

  const [page, setPage] = React.useState(1);
  const perPage = 12;

  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase()) && country.region.includes(filter.value),
  );
  const totalPages = Math.ceil(filteredCountries.length / perPage);

  const pagination = React.useMemo(() => getPagination(totalPages, page, 1), [totalPages, page]);

  const handleChange = (option: Option) => {
    setFilter(option);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handlePageClick = (page: number | string) => {
    if (page === "...") return;
    setPage(page as number);
  };

  React.useEffect(() => {
    setPage(1);
  }, [filter, search]);

  return (
    <main>
      <Row className="mb-3 justify-content-between flex-wrap gap-3">
        <Col>
          <div className="position-relative">
            <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
              <Search width="20" height="20" />
            </div>
            <Form.Control
              className="ps-5"
              type="text"
              placeholder="Search for a country..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </Col>
        <Col>
          <Dropdown className="d-flex justify-content-end">
            <Dropdown.Toggle id="dropdown-basic">{filter.value || "Filter by Region"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {options.map((option) => (
                <Dropdown.Item
                  active={option.value === filter.value}
                  key={option.value}
                  onClick={() => handleChange(option)}
                  as="button"
                >
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row xl={4} lg={3} md={2} sm={2} xs={1} className="g-4 mb-3">
        {filteredCountries.slice((page - 1) * perPage, page * perPage).map((country) => (
          <Col key={country.name.common}>
            <Link to={`/country/${country.name.common}`} className="text-decoration-none">
              <Card>
                <Card.Img
                  className="bg-dark object-fit-contain border-bottom"
                  variant="top"
                  src={country.flags.svg}
                  alt={country.flags.alt || country.name.common}
                  height={250}
                />
                <Card.Body>
                  <Card.Title>
                    <h5 className="text-truncate">
                      {search.length === 0 ? country.name.common : getHighlightedText(country.name.common, search)}
                    </h5>
                  </Card.Title>
                  <Card.Text>
                    <b>Population: </b>
                    {country.population}
                  </Card.Text>
                  <Card.Text>
                    <b>Region: </b>
                    {country.region}
                  </Card.Text>
                  <Card.Text className="text-truncate">
                    <b>Capital: </b>
                    {country.capital?.join(", ")}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center">
        <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
        {pagination.map((pag, i) => (
          <Pagination.Item key={i} active={pag === page} onClick={() => handlePageClick(pag)}>
            {pag}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
      </Pagination>
    </main>
  );
};

const getHighlightedText = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? "bg-warning fw-bold" : ""}>
          {part}
        </span>
      ))}{" "}
    </span>
  );
};

export default CountryList;
