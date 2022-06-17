import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetailsContext";
import OrderEntry from "./pages/entry/OrderEntry";
function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
        {/* Confirmation page does not nee provider */}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
