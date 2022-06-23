import { render, screen, waitFor } from "../../../utils/testing-library-utils";

import { rest } from "msw";
import { OrderDetailsProvider } from "../../../contexts/OrderDetailsContext";
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

    render(<OrderEntry />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });
});
