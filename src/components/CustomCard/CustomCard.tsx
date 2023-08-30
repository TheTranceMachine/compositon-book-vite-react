import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./CustomCard.scss";

const CustomCard = ({ placeholder, name, buttonText, onClick }) => (
  <Card className="custom-card">
    <Card.Header className="custom-card__header">{placeholder}</Card.Header>
    <Card.Body className="custom-card__footer">
      <div>{name}</div>
      <Button variant="dark" size="sm" onClick={() => onClick(name)}>
        {buttonText}
      </Button>
    </Card.Body>
  </Card>
);

export { CustomCard };
