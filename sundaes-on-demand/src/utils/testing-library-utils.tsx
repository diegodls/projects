import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { OrderDetailsProvider } from "../contexts/OrderDetailsContext";

const renderWithContext = (
  ui: ReactElement,
  options?: React.JSXElementConstructor<{
    children: ReactElement<any, string | React.JSXElementConstructor<any>>;
  }>
) => {
  render(ui, { wrapper: OrderDetailsProvider, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
