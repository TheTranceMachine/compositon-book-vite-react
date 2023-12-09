import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import './CustomCard.scss';

interface CustomCardPropTypes {
  timeStamp?: string;
  backgroundColor: string;
  textColor: string;
  className?: string;
  buttonText: string;
  title: string;
  description: string;
  onEdit: () => void;
  onDelete?: () => void;
}

const CustomCard = ({
  timeStamp,
  backgroundColor,
  textColor,
  className,
  buttonText,
  title,
  description,
  onEdit,
  onDelete,
}: CustomCardPropTypes) => (
  <Card className={`custom-card ${className ? className : ''}`} bg={backgroundColor} text={textColor}>
    <Card.Header>{title}</Card.Header>
    <Card.Body className="custom-card__body">
      <Card.Text>{description}</Card.Text>
    </Card.Body>
    {timeStamp && (
      <ListGroup className="list-group-flush">
        <ListGroup.Item className={`bg-${backgroundColor} text-truncate`}>Created: {timeStamp}</ListGroup.Item>
      </ListGroup>
    )}
    <Card.Footer className="btn-group">
      {onDelete && (
        <Button variant="dark" size="sm" onClick={onDelete}>
          Delete
        </Button>
      )}
      <Button variant="dark" size="sm" onClick={onEdit}>
        {buttonText}
      </Button>
    </Card.Footer>
  </Card>
);

export { CustomCard };
