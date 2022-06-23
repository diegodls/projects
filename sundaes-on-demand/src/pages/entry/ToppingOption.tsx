import { Col, Form } from "react-bootstrap";

interface ToppingOptionsProps {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: string) => void;
}

const ToppingOption = ({
  name,
  imagePath,
  updateItemCount,
}: ToppingOptionsProps) => {
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.checked ? 1 : 0;
    updateItemCount(name, String(value));
  }

  return (
    <Col xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
      <img
        alt={`${name} topping`}
        src={`http://localhost:3030/${imagePath}`}
        style={{ width: "75%" }}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type='checkbox'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleOnChange(e);
          }}
          label={name}
        />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
