import { useState } from "react";

export const replaceCamelWithSpaces = (colorName: string) => {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
};

function App() {
  const [buttonColor, setButtonColor] = useState<string>("MediumVioletRed");
  const [ToggleButtonEnable, setToggleButtonEnable] = useState<boolean>(false);
  let currentButtonColor =
    buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";
  let disabledColor = ToggleButtonEnable ? "gray" : buttonColor;

  return (
    <div
      style={{
        background: "gray",
      }}
    >
      <button
        style={{ background: disabledColor, color: "white" }}
        onClick={() => setButtonColor(currentButtonColor)}
        disabled={ToggleButtonEnable}
      >
        Change to {replaceCamelWithSpaces(currentButtonColor)}
      </button>
      <input
        id='disable-button-checkbox'
        aria-label='Disable button'
        type='checkbox'
        aria-checked={ToggleButtonEnable}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setToggleButtonEnable(e.target.checked);
        }}
      />
      <label htmlFor='disable-button-checkbox'>Disable button</label>
    </div>
  );
}

export default App;
