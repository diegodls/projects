import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

describe("Testing App.tsx", () => {
  describe("Testing App's button", () => {
    it("should render a button with Medium VioletRed background", () => {
      render(<App />);
      const colorButton = screen.getByRole("button", {
        name: "Change to Midnight Blue",
      });

      expect(colorButton).toHaveStyle({ background: "MediumVioletRed" });

      fireEvent.click(colorButton);

      expect(colorButton).toHaveStyle({ background: "MidnightBlue" });

      expect(colorButton.textContent).toBe("Change to Medium Violet Red");
    });

    it("should button starts enabled", () => {
      render(<App />);
      const colorButton = screen.getByRole("button", {
        name: "Change to Midnight Blue",
      });
      expect(colorButton).toBeEnabled();
      const checkBox = screen.getByRole("checkbox");
      expect(checkBox).not.toBeChecked();
    });

    it("should button be disabled when checkbox is checked", () => {
      render(<App />);

      const checkBox = screen.getByRole("checkbox", { name: "Disable button" });
      const colorButton = screen.getByRole("button", {
        name: "Change to Midnight Blue",
      });

      fireEvent.click(checkBox);
      expect(colorButton).toBeDisabled();
    });

    it("should button be enabled when checkbox is not checked", () => {
      render(<App />);

      const checkBox = screen.getByRole("checkbox", { name: "Disable button" });
      const colorButton = screen.getByRole("button", {
        name: "Change to Midnight Blue",
      });

      fireEvent.click(checkBox);
      expect(colorButton).toBeDisabled();

      fireEvent.click(checkBox);
      expect(colorButton).toBeEnabled();
    });

    it("should change button background to gray when disabled and it's MediumVioletRed", () => {
      render(<App />);

      const colorButton = screen.getByRole("button", {
        name: "Change to Midnight Blue",
      });
      const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

      expect(colorButton).toHaveStyle({ background: "MediumVioletRed" });
      expect(colorButton).toBeEnabled();

      fireEvent.click(checkBox);

      expect(colorButton).toHaveStyle({ background: "gray" });
      expect(colorButton).toBeDisabled();

      fireEvent.click(checkBox);

      expect(colorButton).toHaveStyle({ background: "MediumVioletRed" });
      expect(colorButton).toBeEnabled();
    });

    it("should change button background to gray when disabled and it's MidnightBlue", () => {
      render(<App />);

      const colorButton = screen.getByRole("button", {
        name: "Change to Midnight Blue",
      });
      const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

      fireEvent.click(colorButton);

      expect(colorButton).toHaveStyle({ background: "MidnightBlue" });
      expect(colorButton).toBeEnabled();

      fireEvent.click(checkBox);

      expect(colorButton).toHaveStyle({ background: "gray" });
      expect(colorButton).toBeDisabled();

      fireEvent.click(checkBox);

      expect(colorButton).toHaveStyle({ background: "MidnightBlue" });
      expect(colorButton).toBeEnabled();
    });
  });

  describe("Testing App's functions", () => {
    it("should works for no inner capital letters", () => {
      expect(replaceCamelWithSpaces("Red")).toBe("Red");
    });
    it("should works for one inner capital letters", () => {
      expect(replaceCamelWithSpaces("MidnightBue")).toBe("Midnight Bue");
    });
    it("should work for multiple inner capital letters", () => {
      expect(replaceCamelWithSpaces("MediumVioletRed")).toBe(
        "Medium Violet Red"
      );
    });
  });
});
