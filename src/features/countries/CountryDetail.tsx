import { Link, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useGetCountriesQuery } from "@/app/services/api";

import CountryPlaceholder from "./components/CountryPlaceholder";

const CountryDetail = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const { country } = useGetCountriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      country: data?.find((country) => country.name.common === decodeURIComponent(countryName as string)),
    }),
  });

  return (
    <Row className="gap-3 justify-content-center">
      <Col xs={12}>
        <Link to="/">
          <Button variant="outline-primary">Back</Button>
        </Link>
      </Col>
      {!country ? (
        <Col xs={12}>
          <CountryPlaceholder />
        </Col>
      ) : (
        <Col xs={12}>
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
        </Col>
      )}
    </Row>
  );
};

export default CountryDetail;
