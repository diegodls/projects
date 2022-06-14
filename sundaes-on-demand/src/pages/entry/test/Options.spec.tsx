import { render, screen } from "@testing-library/react";
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
});
