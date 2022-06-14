import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";

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

  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

  const optionItems = items.map((item) => (
    <ScoopOption key={item.name} name={item.name} imagePath={item.imagePath} />
  ));

  return <Row>{optionType === "scoops" ? optionItems : null}</Row>;
};

export default Options;
