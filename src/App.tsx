import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [counter , setCounter] = useState(0);
  async function changeCounter(){
    setCounter(counter => counter + 1);
  }
  return (
    <main className="container">
      <div>
        {counter}<br />
        <button onClick={changeCounter}>Add</button>
      </div>
    </main>
  );
}

export default App;
