import { render, screen } from "../../../utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

describe("Testing Options.tsx", () => {
  it("should displays image for each scoop option from the server", async () => {
    render(<Options optionType={"scoops"} />);

    const scoopImages: HTMLImageElement[] = await screen.findAllByRole("img", {
      name: /scoop$/i,
    });

    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((e: HTMLImageElement) => e.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  it("should display image for each topping option from the server", async () => {
    render(<Options optionType={"toppings"} />);

    const toppingsImages: HTMLImageElement[] = await screen.findAllByRole(
      "img",
      { name: /topping$/i }
    );

    expect(toppingsImages).toHaveLength(3);

    const altText = toppingsImages.map((e: HTMLImageElement) => e.alt);
    expect(altText).toEqual([
      "Cherries topping",
      "M&Ms topping",
      "Hot Fudge topping",
    ]);
  });

  it("should not be able to update Grand Total when the scoops amount is invalid", async () => {
    render(<Options optionType={"scoops"} />);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "-1");

    // make sue scoops subtotal hasn't updated
    const scoopsSubtotal = screen.getByText("SCOOPS total: $0.00");
    expect(scoopsSubtotal).toBeInTheDocument();
  });
});
