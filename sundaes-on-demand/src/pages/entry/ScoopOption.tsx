import { Col, Form } from "react-bootstrap";

interface ScoopOptionsProps {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: string) => void;
}

const ScoopOption = ({ name, imagePath }: ScoopOptionsProps) => {
  return (
    <Col xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
      <img
        alt={`${name} scoop`}
        src={`http://localhost:3030/${imagePath}`}
        style={{ width: "75%" }}
      />
      <Form.Group controlId={`${name}-count`}>
        <Form.Label>{name}</Form.Label>
        <Form.Control type='number' defaultValue={0} />
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
