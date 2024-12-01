import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link, useParams } from "react-router-dom";

import { useGetCountriesQuery } from "@/app/services/api";
import CountryPlaceholder from "./CountryPlaceholder";

const CountryDetail = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const { country } = useGetCountriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      country: data?.find((country) => country.name.common === decodeURIComponent(countryName as string)),
    }),
  });

  return (
    <main>
      <Link to="/">
        <Button variant="outline-primary" className="mb-3">
          Back
        </Button>
      </Link>
      {!country ? (
        <CountryPlaceholder />
      ) : (
        <Row>
          <Col md={5}>
            <Card>
              <Card.Img
                variant="top"
                src={country.flags.svg}
                alt={country.flags.alt || country.name.common}
                className="img-fluid"
              />
            </Card>
          </Col>
          <Col md={7} className="my-3">
            <h2 className="fw-normal lh-1">
              {country.name.common} ({country.name.official})
            </h2>
            <div className="my-3">
              <Card.Text>
                <b>Native Name:</b> {Object.values(country.name.nativeName)[0].common}
              </Card.Text>
              <Card.Text>
                <b>Population:</b> {country.population}
              </Card.Text>
              <Card.Text>
                <b>Region:</b> {country.region}
              </Card.Text>
              <Card.Text>
                <b>Sub Region:</b> {country.subregion}
              </Card.Text>
              <Card.Text>
                <b>Capital:</b> {country.capital}
              </Card.Text>
            </div>
          </Col>
        </Row>
      )}
    </main>
  );
};

export default CountryDetail;
