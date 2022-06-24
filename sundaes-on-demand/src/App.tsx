import { useState } from "react";
import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetailsContext";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";

type OrderPhases = "INPROGRESS" | "REVIEW" | "COMPLETED";

function App() {
  const [orderPhase, setOrderPhase] = useState<OrderPhases | null>(
    "INPROGRESS"
  );

  let Component = <OrderEntry setOrderPhase={setOrderPhase} />;

  switch (orderPhase) {
    case "INPROGRESS":
      Component = <OrderEntry setOrderPhase={setOrderPhase} />;
      break;
    case "REVIEW":
      Component = <OrderSummary setOrderPhase={setOrderPhase} />;
      break;
    case "COMPLETED":
      Component = <OrderConfirmation setOrderPhase={setOrderPhase} />;
      break;
    default:
  }

  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <Container>{Component}</Container>
      </OrderDetailsProvider>
      {/* Confirmation page does not need provider */}
    </Container>
  );
}

export default App;
