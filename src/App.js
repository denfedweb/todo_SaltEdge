import Todo from "./components/Todo/Todo";
import logo from "./assets/img/logo.svg";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Todo/>
    </div>
  );
}

export default App;
