import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

interface ScoopOptionsProps {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: string) => void;
}

const ScoopOption = ({
  name,
  imagePath,
  updateItemCount,
}: ScoopOptionsProps) => {
  const [isQuantityValid, setIsQuantityValid] = useState<boolean>(true);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const currentValueFloat = parseFloat(e.target.value);

    const isCurrentValueValid =
      0 <= currentValueFloat &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat;

    setIsQuantityValid(isCurrentValueValid);

    if (isCurrentValueValid) {
      updateItemCount(name, e.target.value);
    }
  }

  return (
    <Col xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
      <img
        alt={`${name} scoop`}
        src={`http://localhost:3030/${imagePath}`}
        style={{ width: "75%" }}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs='6' style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs='5' style={{ textAlign: "left" }}>
          <Form.Control
            type='number'
            defaultValue={0}
            minLength={0}
            isInvalid={!isQuantityValid}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleOnChange(e);
            }}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
