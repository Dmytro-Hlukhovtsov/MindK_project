import React, { useState } from "react";
import Header from "./components/header";
import SiteBody from "./containers/SiteBody";

import "./App.css";

const component = ["posts", "addPost", "profile"];

function App() {
  const [viewBlock, setViewBlock] = useState(component[0]);

  return (
    <div className="App">
      <Header components={component} onSetViewBlock={setViewBlock} />
      <div className="body">
        <SiteBody viewBlock={viewBlock} />
      </div>
    </div>
  );
}

export default App;
