import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/esm/Card";
import { Link, useParams } from "react-router-dom";

import { useGetCountriesQuery } from "@/app/services/api";

const CountryDetail = () => {
  const { countryName } = useParams<{ countryName: string }>();

  const { country } = useGetCountriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      country: data?.find((country) => country.name.common === decodeURIComponent(countryName as string)),
    }),
  });

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-3">
      <Link to="/" className="btn btn-outline-primary mb-3">
        Back
      </Link>
      <div className="row">
        <div className="col-md-5">
          <img
            src={country.flags.svg}
            alt={country.flags.alt || country.name.common}
            className="bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto"
            width="500"
            height="500"
          />
        </div>
        <div className="col-md-7 my-3">
          <h2 className="fw-normal lh-1">
            {country.name.common} ({country.name.official})
          </h2>
          <div className="my-3">
            <Card.Text>
              <b>Native Name:</b> {Object.values(country.name.nativeName)[0].common}
            </Card.Text>
            <Card.Text>
              <b>papulation:</b> {country.population}
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
        </div>
      </div>
    </Container>
  );
};

export default CountryDetail;
