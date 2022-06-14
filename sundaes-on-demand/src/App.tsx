import Options from "./pages/entry/Options";
import SummaryForm from "./pages/summary/SummaryForm";
function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Options optionType='scoops' />
      <SummaryForm />
    </div>
  );
}

export default App;
