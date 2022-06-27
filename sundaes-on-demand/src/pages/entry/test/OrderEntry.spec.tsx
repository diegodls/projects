import { render, screen, waitFor } from "../../../utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

describe("Testing OrderEntry.tsx", () => {
  it("should handle error for scoops and toppings routes", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });

  it("should be able to enable and disable order buttons", async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    // get order button
    const orderButton = screen.getByRole("button", { name: "Order Sundae" });
    // should starts disabled
    expect(orderButton).toBeDisabled();
    // get Vanilla input
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    // clear and add one in vanilla option
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    // await the states update and check if the order button is enabled
    await waitFor(async () => {
      expect(orderButton).toBeEnabled();
    });
    // clear and type 0 in vanilla option
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0");

    //check if the order button is disabled
    await waitFor(async () => {
      expect(orderButton).toBeDisabled();
    });
  });
});
