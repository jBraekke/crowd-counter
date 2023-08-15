import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";

function App() {
  let { pathname } = useLocation();

  return (
    <div className="app">
      <main>
        <div className="pages">{useRoutes(routes)}</div>
      </main>
    </div>
  );
}

export default App;
