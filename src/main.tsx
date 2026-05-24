import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ApplicationTitlebar from "./globalComponents/ApplicationTitlebar";
import displayFileList from "./applicationRoutes/viewer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApplicationTitlebar />
    {/* <App /> */}
    <displayFileList githubUrl="https://api.github.com/repos/SharmaDevanshu089/Github-Explorer/contents/" />
  </React.StrictMode>
);
