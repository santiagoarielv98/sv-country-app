import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Placeholder from "react-bootstrap/Placeholder";

const CountryPlaceholder = () => {
  return (
    <Row>
      <Col md={5}>
        <Card>
          <Placeholder as={Card.Img} variant="top" animation="wave" src="/images/placeholder.svg" alt="placeholder" />
        </Card>
      </Col>
      <Col md={7} className="my-3">
        <Placeholder as="h2" animation="wave" className="fw-normal lh-1">
          <Placeholder xs={6} />
        </Placeholder>
        <div className="my-3">
          <Placeholder as={Card.Text} animation="wave">
            <Placeholder xs={7} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="wave">
            <Placeholder xs={4} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="wave">
            <Placeholder xs={5} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="wave">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="wave">
            <Placeholder xs={3} />
          </Placeholder>
        </div>
      </Col>
    </Row>
  );
};

export default CountryPlaceholder;
