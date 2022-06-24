import { useOrderDetailsContext } from "../../contexts/OrderDetailsContext";
import SummaryForm from "./SummaryForm";

type OrderPhases = "INPROGRESS" | "REVIEW" | "COMPLETED";
interface OrderSummaryProps {
  setOrderPhase: (orderPhase: OrderPhases) => void;
}

const OrderSummary = ({ setOrderPhase }: OrderSummaryProps) => {
  const [orderDetails] = useOrderDetailsContext();

  const scoopArray = Array.from(Object.entries(orderDetails.scoops));

  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingArray = Array.from(Object.entries(orderDetails.toppings));

  const hasTopping = toppingArray.length > 0;
  let toppingDisplay = null;

  if (hasTopping) {
    const toppingList = toppingArray.map(([key, value]) => (
      <li key={key}>
        {value} {key}
      </li>
    ));

    toppingDisplay = (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </>
  );
};

export default OrderSummary;
