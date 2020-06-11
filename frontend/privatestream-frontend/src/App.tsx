import React from "react";
import "./App.css";
import AppRouter from "./routing/Router";

function App() {
  return (
    <div className="App">
      <AppRouter location={window.location} history={window.history} />
    </div>
  );
}

export default App;
