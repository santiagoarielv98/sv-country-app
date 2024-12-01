import { Link } from "react-router-dom";

import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";

import useCountries from "./hooks/useCountries";

import CountryFilter from "./components/CountryFilter";
import CountrySearch from "./components/CountrySearch";
import PlaceholderCard from "./components/PlaceholderCard";

import getHighlightedText from "@/utils/highlight-text";

const CountryList = () => {
  const {
    countries,
    search,
    handleSearch,
    filter,
    handleChange,
    pagination,
    handlePageClick,
    setPage,
    page,
    totalPages,
    isLoading,
  } = useCountries();

  return (
    <Row className="gap-3" as="section">
      <Row className="justify-content-between flex-wrap gap-3">
        <CountrySearch search={search} handleSearch={handleSearch} />
        <CountryFilter filter={filter} handleChange={handleChange} />
      </Row>

      <Row xl={4} lg={3} md={2} sm={2} xs={1} className="g-4">
        {isLoading && Array.from({ length: 12 }).map((_, i) => <PlaceholderCard key={i} />)}
        {!isLoading && countries.length === 0 && (
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Alert variant="warning">
              <Alert.Heading>No countries found</Alert.Heading>
              <p>Try changing the search or filter criteria</p>
            </Alert>
          </Col>
        )}
        {countries.map((country) => (
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
                      {!search.length ? country.name.common : getHighlightedText(country.name.common, search)}
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
    </Row>
  );
};

export default CountryList;
