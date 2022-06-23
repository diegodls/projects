import { useOrderDetailsContext } from "../../contexts/OrderDetailsContext";
import { formatCurrency } from "../../utils/functions";
import Options from "./Options";

const OrderEntry = () => {
  const [OrderDetailsContext, updateItemCount] = useOrderDetailsContext();

  return (
    <>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>
        Grand Total: {formatCurrency(OrderDetailsContext.totals.grandTotal)}
      </h2>
    </>
  );
};

export default OrderEntry;
