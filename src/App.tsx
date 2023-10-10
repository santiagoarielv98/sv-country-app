import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import GlobeAmericas from "./components/icons/GlobeAmericas";
import Moon from "./components/icons/Moon";
import Search from "./components/icons/Search";
import Dropdown from "react-bootstrap/esm/Dropdown";
import React from "react";
import Sun from "./components/icons/Sun";
import Card from "react-bootstrap/esm/Card";
import Pagination from "react-bootstrap/esm/Pagination";
import _ from "lodash";

import { useGetCountriesQuery } from "./services/api";

enum Theme {
  LIGHT = "light",
  DARK = "dark",
}
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

const initialTheme = localStorage.theme || Theme.LIGHT;

const App = () => {
  const { data: countries = [] } = useGetCountriesQuery();
  const [theme, setTheme] = React.useState(initialTheme);
  const [filter, setFilter] = React.useState(options[0]);
  const [search, setSearch] = React.useState("");

  const [page, setPage] = React.useState(1);
  const perPage = 12;

  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase()) && country.region.includes(filter.value)
  );
  const totalPages = Math.ceil(filteredCountries.length / perPage);

  const pagination = getPagination(totalPages, page, 1);

  const handleChange = (option: Option) => {
    setFilter(option);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    localStorage.theme = newTheme;
    setTheme(newTheme);
  };

  const handlePageClick = (page: number | string) => {
    if (page === "...") return;
    setPage(page as number);
  };

  React.useEffect(() => {
    setPage(1);
  }, [filter, search]);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <div>
      <Navbar className="bg-body-tertiary shadow sticky-top">
        <Container>
          <Navbar.Brand href="#">
            <GlobeAmericas width="50" height="50" />
            <Navbar.Text className="ms-2">SV # World</Navbar.Text>
          </Navbar.Brand>
          <Button className="d-inline-flex" onClick={toggleTheme}>
            {theme === Theme.LIGHT ? <Sun width="24" height="24" /> : <Moon width="24" height="24" />}
            <span className="ms-3 text-capitalize">{theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT} Mode</span>
          </Button>
        </Container>
      </Navbar>
      <Container>
        <Row className="my-3 justify-content-between flex-wrap">
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
            <Dropdown>
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
        <Row lg={4} md={3} sm={2} xs={1} className="g-4 mb-3">
          {filteredCountries.slice((page - 1) * perPage, page * perPage).map((country) => (
            <Col key={country.name.common}>
              <Card>
                <Card.Img
                  className="bg-dark object-fit-contain"
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
            </Col>
          ))}
        </Row>
        <Pagination>
          <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
          {pagination.map((pag, i) => (
            <Pagination.Item key={i} active={pag === page} onClick={() => handlePageClick(pag)}>
              {pag}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
        </Pagination>
      </Container>
    </div>
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
/* 1 2 3 4 5 ... 9 */
/* 1 ... 3 4 5 ... 9 */
/* 1 ... 4 5 6 ... 9 */
/* 1 ... 5 6 7 ... 9 */
/* 1 ... 6 7 8 ... 9 */
const getPagination = (totalPages: number, currentPage: number, siblings: number) => {
  const totalNumbers = 7 + siblings;
  if (totalNumbers >= totalPages) {
    return _.range(1, totalPages + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblings, 1);
  const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblings;
    const leftRange = _.range(1, leftItemCount + 1);
    return [...leftRange, "...", totalPages];
  } else if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblings;
    const rightRange = _.range(totalPages - rightItemCount + 1, totalPages + 1);
    return [1, "...", ...rightRange];
  } else {
    const middleRange = _.range(leftSiblingIndex, rightSiblingIndex + 1);
    return [1, "...", ...middleRange, "...", totalPages];
  }
};

export default App;
