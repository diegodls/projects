import { Button } from "react-bootstrap";
import { useOrderDetailsContext } from "../../contexts/OrderDetailsContext";
import { formatCurrency } from "../../utils/functions";
import Options from "./Options";
type OrderPhases = "INPROGRESS" | "REVIEW" | "COMPLETED";
interface OrderEntryProps {
  setOrderPhase: (orderPhase: OrderPhases) => void;
}

const OrderEntry = ({ setOrderPhase }: OrderEntryProps) => {
  const [OrderDetailsContext, updateItemCount, changeOrderPhases] =
    useOrderDetailsContext();

  return (
    <>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>
        Grand Total: {formatCurrency(OrderDetailsContext.totals.grandTotal)}
      </h2>
      <Button
        variant='primary'
        type='submit'
        disabled={OrderDetailsContext.totals.grandTotal < 1}
        onClick={() => {
          setOrderPhase("REVIEW");
        }}
      >
        Order Sundae
      </Button>
    </>
  );
};

export default OrderEntry;
