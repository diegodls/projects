import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

describe("Testing orderPhase", () => {
  it("should test order phases for a happy path", async () => {
    // render application
    render(<App />);

    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    const cherryCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherryCheckbox);

    // find and click order button
    const orderButton = screen.getByRole("button", { name: /order sundae/i });

    userEvent.click(orderButton);

    // check summary information base on order phase
    waitFor(() => {
      const summaryHeading = screen.getByRole("heading", {
        name: /Order Summary/i,
      });
      expect(summaryHeading).toBeInTheDocument();

      const scoopsHeading = screen.getByRole("heading", {
        name: "Scoops: $2.00",
      });
      expect(scoopsHeading).toBeInTheDocument();

      const toppingsHeading = screen.getByRole("heading", {
        name: "Toppings: $1.50",
      });
      expect(toppingsHeading).toBeInTheDocument();

      // check summary option items
      expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
      expect(screen.getByText("Cherries")).toBeInTheDocument();

      // alternatively...
      // const optionItems = screen.getAllByRole('listitem');
      // const optionsItemsText = optionItems.map(item) => item.textContent);
      // expect(optionsItemsText).toBeEqual(['1 Vanilla', 'Cherries'])

      // accept terms and conditions and click button to confirm order
      const termsCheckBox = screen.getByRole("checkbox", {
        name: /I agree to Terms and Conditions/i,
      });
      userEvent.click(termsCheckBox);

      // confirm order
      const confirmOrderButton = screen.getByRole("button", {
        name: /Confirm order/i,
      });
      userEvent.click(confirmOrderButton);

      // expect "loading" to show

      const loading = screen.getByText(/loading/i);
      expect(loading).toBeInTheDocument();
      //confirm order number on confirmation pages
      // this one is async because there is a POST request to server in between summary and confirmation pages

      const thankYouHeader = screen.findByRole("heading", {
        name: /thank you/i,
      });
      expect(thankYouHeader).toBeInTheDocument();

      const notLoading = screen.getByText(/loading/i);
      expect(loading).not.toBeInTheDocument();

      const orderNumber = screen.findByText(/order number/i);
      expect(orderNumber).toBeInTheDocument();

      // click "new order" button on confirmation pages
      const newOrderButton = screen.getByRole("button", { name: /new order/i });
      userEvent.click(newOrderButton);

      //check that scoops and topping subtotals have been reset
      const scoopsSubTotal = screen.getByText("Scoops total: $", {
        exact: false,
      });
      expect(scoopsSubTotal).toHaveTextContent("0.00");

      // const scoopsSubTotal = screen.getByText("Scoops total: $0.00");
      //expect(scoopsSubTotal).toBeInTheDocument();

      const toppingSubTotal = screen.getByText("Toppings total: $", {
        exact: false,
      });
      expect(toppingSubTotal).toHaveTextContent("0.00");

      const grandTotal = screen.getByRole("heading", {
        name: /grand total: \$/i,
      });
      expect(grandTotal).toHaveTextContent(`0.00`);

      // do we need to await anything to avoid test errs
      // await screen.findByRole('spinbutton', {name: 'Vanilla'})
      // await screen.findByRole('checkbox', {name: 'Cherries'})
    });
  });

  it("shouldn't topping header appear if no topping are selected", async () => {
    render(<App />);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");

    const orderSummaryButton = screen.getByRole("button", {
      name: /order sundae/i,
    });
    userEvent.click(orderSummaryButton);

    waitFor(() => {
      const scoopsHeading = screen.getByRole("heading", {
        name: "Scoops: $6.00",
      });
      expect(scoopsHeading).toBeInTheDocument();

      const toppingsHeading = screen.getByRole("heading", {
        name: /toppings/i,
      });
      expect(toppingsHeading).not.toBeInTheDocument();
    });
  });
});
