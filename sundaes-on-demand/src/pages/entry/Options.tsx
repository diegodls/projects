import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import { Col, Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";

interface OptionsProps {
  optionType: string;
}

interface ItemProps {
  name: string;
  imagePath: string;
}

const Options = ({ optionType }: OptionsProps) => {
  const [items, setItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }, [optionType]);

  const optionItems = items.map((item) => (
    <ScoopOption key={item.name} name={item.name} imagePath={item.imagePath} />
  ));

  const toppingsItems = items.map((item) => (
    <ToppingOption
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <Col>
      <Row>{optionType === "scoops" ? optionItems : toppingsItems}</Row>
    </Col>
  );
};

export default Options;
