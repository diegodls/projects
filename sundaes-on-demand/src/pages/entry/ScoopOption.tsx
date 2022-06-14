import { Col } from "react-bootstrap";

interface ScoopOptionsProps {
  name: string;
  imagePath: string;
}

const ScoopOption = ({ name, imagePath }: ScoopOptionsProps) => {
  return (
    <Col xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
      <img
        alt={`${name} scoop`}
        src={`http://localhost:3030/${imagePath}`}
        style={{ width: "75%" }}
      />
    </Col>
  );
};

export default ScoopOption;
