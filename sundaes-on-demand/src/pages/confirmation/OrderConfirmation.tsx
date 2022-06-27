import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetailsContext } from "../../contexts/OrderDetailsContext";
import AlertBanner from "../../common/AlertBanner";
type OrderPhases = "INPROGRESS" | "REVIEW" | "COMPLETED";

interface OrderConfirmationProps {
  setOrderPhase: (orderPhase: OrderPhases) => void;
}

const OrderConfirmation = ({ setOrderPhase }: OrderConfirmationProps) => {
  const [, , resetOrder] = useOrderDetailsContext();

  const [error, setError] = useState<boolean>(false);

  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
        setError(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  function handleClick() {
    resetOrder();
    setOrderPhase("INPROGRESS");
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          {" "}
          as per our terms and conditions, nothing wil happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Loading!!!</h1>
      </div>
    );
  }
};

export default OrderConfirmation;
