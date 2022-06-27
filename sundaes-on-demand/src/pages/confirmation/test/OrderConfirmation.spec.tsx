import { render, screen } from "../../../utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { server } from "../../../mocks/server";
import OrderConfirmation from "../OrderConfirmation";
import { rest } from "msw";

describe("Testing OrderConfirmation.tsx", () => {
  it("should show error when the server return error after submitting order", async () => {
    server.resetHandlers(
      rest.post("http://localhost:3030/order", (req, res, ctx) => {
        res(ctx.status(500));
      })
    );
    render(<OrderConfirmation setOrderPhase={jest.fn()} />);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent(
      "An error occurred. Please try again later."
    );
  });
});
