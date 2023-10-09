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

const App = () => {
  const { data: countries = [] } = useGetCountriesQuery();
  const [theme, setTheme] = React.useState(Theme.LIGHT);
  const [filter, setFilter] = React.useState(options[0]);
  const [search, setSearch] = React.useState("");

  const [perPage, setPerPage] = React.useState(12);

  const filteredCountries = React.useMemo(
    () =>
      countries
        .filter(
          (country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase()) && country.region.includes(filter.value)
        )
        .slice(0, perPage),
    [filter, search, countries, perPage]
  );

  const handleChange = (option: Option) => {
    setFilter(option);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const toggleTheme = () => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

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
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
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
          {filteredCountries.map((country) => (
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
                    <h5>{country.name.common}</h5>
                  </Card.Title>
                  <Card.Text>
                    <b>Population: </b>
                    {country.population}
                  </Card.Text>
                  <Card.Text>
                    <b>Region: </b>
                    {country.region}
                  </Card.Text>
                  <Card.Text>
                    <b>Capital: </b>
                    {country.capital?.join(", ")}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination>
          {filteredCountries.map((_, i) => (
            <Pagination.Item as="button" active={i + 1 === 1}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </div>
  );
};

export default App;
