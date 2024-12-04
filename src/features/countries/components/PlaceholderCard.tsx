import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const PlaceholderCard = () => {
  return (
    <Card>
      <Placeholder
        as={Card.Img}
        variant="top"
        animation="wave"
        className="bg-dark"
        height={250}
        src="/images/placeholder.svg"
        alt="placeholder"
      />
      <Card.Body>
        <Placeholder as={Card.Title} animation="wave">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={7} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={4} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={5} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export default PlaceholderCard;
