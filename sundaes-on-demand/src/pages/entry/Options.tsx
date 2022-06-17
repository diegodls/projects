import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import { Col, Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../../common/AlertBanner";
import { PRICE_PER_ITEM } from "../../utils/constants";
import { useOrderDetailsContext } from "../../contexts/OrderDetailsContext";

interface OptionsProps {
  optionType: "scoops" | "toppings";
}

interface ItemProps {
  name: string;
  imagePath: string;
}

const Options = ({ optionType }: OptionsProps) => {
  const [items, setItems] = useState<ItemProps[]>([]);

  const [error, setError] = useState<boolean>(false);

  const [OrderDetailsContext, updateItemCount] = useOrderDetailsContext();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
        setError(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const optionItems = items.map((item) => (
    <ScoopOption
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName: string, newItemCount: string) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  const title = `${optionType[0].toLocaleUpperCase} ${
    optionType.slice(1).toLocaleUpperCase
  }`;

  const toppingsItems = items.map((item) => (
    <ToppingOption
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{PRICE_PER_ITEM[optionType]} each</p>
      <Row>{optionType === "scoops" ? optionItems : toppingsItems}</Row>
    </>
  );
};

export default Options;
