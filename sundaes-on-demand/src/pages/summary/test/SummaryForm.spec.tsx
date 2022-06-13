import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("Testing SummaryForm", () => {
  it("should render initial conditions", () => {
    render(<SummaryForm />);
    const termsCheckBox = screen.getByRole("checkbox", {
      name: /I agree to Terms and Conditions/i,
    });
    const confirmOrderButton = screen.getByRole("button", {
      name: /Confirm order/i,
    });
    expect(termsCheckBox).not.toBeChecked();
    expect(confirmOrderButton).toBeDisabled();
  });

  it("should terms checkbox starts unchecked", () => {
    render(<SummaryForm />);
    const termsCheckBox = screen.getByRole("checkbox", {
      name: /I agree to Terms and Conditions/i,
    });
    expect(termsCheckBox).not.toBeChecked();
  });

  it("should be able to confirm order when agreed with ther terms and conditions", () => {
    render(<SummaryForm />);
    const termsCheckBox = screen.getByRole("checkbox", {
      name: /I agree to Terms and Conditions/i,
    });
    const confirmOrderButton = screen.getByRole("button", {
      name: /Confirm order/i,
    });

    expect(termsCheckBox).not.toBeChecked();
    expect(confirmOrderButton).toBeDisabled();

    fireEvent.click(termsCheckBox);

    expect(termsCheckBox).toBeChecked();
    expect(confirmOrderButton).toBeEnabled();
  });

  it("should not be able to confirm order when disagree with the terms and conditions", () => {
    render(<SummaryForm />);
    const termsCheckBox = screen.getByRole("checkbox", {
      name: /I agree to Terms and Conditions/i,
    });

    const confirmOrderButton = screen.getByRole("button", {
      name: /Confirm order/i,
    });

    expect(termsCheckBox).not.toBeChecked();
    expect(confirmOrderButton).toBeDisabled();

    fireEvent.click(termsCheckBox);

    expect(termsCheckBox).toBeChecked();
    expect(confirmOrderButton).toBeEnabled();

    fireEvent.click(termsCheckBox);

    expect(termsCheckBox).not.toBeChecked();
    expect(confirmOrderButton).toBeDisabled();
  });
});
