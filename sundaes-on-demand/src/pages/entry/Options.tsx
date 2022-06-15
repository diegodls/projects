import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import { Col, Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../../common/AlertBanner";

interface OptionsProps {
  optionType: string;
}

interface ItemProps {
  name: string;
  imagePath: string;
}

const Options = ({ optionType }: OptionsProps) => {
  const [items, setItems] = useState<ItemProps[]>([]);

  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

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
