import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [counter , setCounter] = useState(0);
  async function changeCounter(){
    let result = await invoke("fetch_current_directory", { urlToFind: "https://api.github.com/repos/SharmaDevanshu089/Github-Explorer/contents/" });
    console.log(result);
  }
  return (
    <div>
    <main className="container">
      <div>
        Hello<br />
        <button onClick={changeCounter}>Add</button>
      </div>
    </main>
    </div>
  );
}

export default App;
