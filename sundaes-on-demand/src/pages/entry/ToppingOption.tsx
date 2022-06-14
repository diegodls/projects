import { Col } from "react-bootstrap";

interface ToppingOptionsProps {
  name: string;
  imagePath: string;
}

const ToppingOption = ({ name, imagePath }: ToppingOptionsProps) => {
  return (
    <Col xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
      <img
        alt={`${name} topping`}
        src={`http://localhost:3030/${imagePath}`}
        style={{ width: "75%" }}
      />
    </Col>
  );
};

export default ToppingOption;
