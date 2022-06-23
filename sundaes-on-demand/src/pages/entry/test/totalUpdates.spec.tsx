import { render, screen, waitFor } from "../../../utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";
import { PRICE_PER_ITEM } from "../../../utils/constants";

describe("Testing totalUpdates", () => {
  it("should update scoop subtotal when scoops changes", async () => {
    render(<Options optionType={"scoops"} />);

    //make sure total starts ou $0.00
    const scoopsSubTotal = screen.getByText("Scoops total: $", {
      exact: false,
    });
    expect(scoopsSubTotal).toHaveTextContent("0.00");

    //update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    expect(vanillaInput).toBeInTheDocument();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    await waitFor(async () => {
      expect(scoopsSubTotal).toHaveTextContent("2.00");
    });

    //update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");

    await waitFor(async () => {
      expect(scoopsSubTotal).toHaveTextContent("6.00");
    });
  });

  it("should grand total starts at $0.00", () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent("0.00");
  });

  it("should grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const scoopsQuantity = 2;

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    expect(vanillaInput).toBeInTheDocument();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, `${scoopsQuantity}`);

    await waitFor(async () => {
      expect(grandTotal).toHaveTextContent(
        `${PRICE_PER_ITEM["scoops"] * scoopsQuantity}`
      );
    });

    const cherryCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    expect(cherryCheckbox).toBeInTheDocument();

    userEvent.click(cherryCheckbox);

    await waitFor(async () => {
      expect(grandTotal).toHaveTextContent(
        `${
          PRICE_PER_ITEM["scoops"] * scoopsQuantity + PRICE_PER_ITEM["toppings"]
        }`
      );
    });
  });

  it("should grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const scoopsQuantity = 2;

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    expect(vanillaInput).toBeInTheDocument();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, `${scoopsQuantity}`);

    await waitFor(async () => {
      expect(grandTotal).toHaveTextContent(
        `${PRICE_PER_ITEM["scoops"] * scoopsQuantity}`
      );
    });

    const cherryCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    expect(cherryCheckbox).toBeInTheDocument();

    userEvent.click(cherryCheckbox);

    await waitFor(async () => {
      expect(grandTotal).toHaveTextContent(
        `${
          PRICE_PER_ITEM["scoops"] * scoopsQuantity + PRICE_PER_ITEM["toppings"]
        }`
      );
    });
  });

  it("should grand total updates properly after removing items", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    expect(cherriesCheckbox).toBeInTheDocument();

    userEvent.click(cherriesCheckbox);

    let scoopsQuantity = 2;

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    expect(vanillaInput).toBeInTheDocument();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, `${scoopsQuantity}`);

    await waitFor(async () => {
      expect(grandTotal).toHaveTextContent(
        `${
          PRICE_PER_ITEM["scoops"] * scoopsQuantity + PRICE_PER_ITEM["toppings"]
        }`
      );
    });

    userEvent.click(cherriesCheckbox);

    await waitFor(async () => {
      expect(grandTotal).toHaveTextContent(
        `${PRICE_PER_ITEM["scoops"] * scoopsQuantity}`
      );
    });

    scoopsQuantity = 1;

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, `${scoopsQuantity}`);

    await waitFor(async () => {
      expect(grandTotal).toHaveTextContent(
        `${PRICE_PER_ITEM["scoops"] * scoopsQuantity}`
      );
    });
  });
});
