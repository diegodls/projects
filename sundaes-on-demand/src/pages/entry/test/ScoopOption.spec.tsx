import { render, screen, waitFor } from "../../../utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

describe("Testing ScoopOption.tsx", () => {
  it("should not be able to order when scoops quantity is not valid", async () => {
    render(<ScoopOption imagePath='' name='' updateItemCount={jest.fn()} />);
    //get vanilla input
    const quantityInput = screen.getByRole("spinbutton");
    // clear and set a negative/invalid value
    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, "-1");
    // expect to have a class that indicates there're invalid
    waitFor(() => {
      expect(quantityInput).toHaveClass("is-invalid");
    });
    // clear and set a invalid number, also invalid
    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, "2.0");
    // expect to have a class that indicates there're invalid
    waitFor(() => {
      expect(quantityInput).toHaveClass("is-invalid");
    });
    // clear and set a high number, also invalid
    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, "11");
    // expect to have a class that indicates there're invalid
    waitFor(() => {
      expect(quantityInput).toHaveClass("is-invalid");
    });
    // clear and set a high number, also invalid
    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, "3");
    // expect not to have a class that indicates there're invalid
    waitFor(() => {
      expect(quantityInput).not.toHaveClass("is-invalid");
    });
  });
});
