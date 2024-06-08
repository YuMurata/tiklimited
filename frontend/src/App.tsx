import * as React from "react";
import DBTable from "./DBTable";

const App: React.FC = () => {
  return (
    <div className="container fruitsList">
      <h1>main</h1>
      <DBTable />
    </div>
  );
};

export default App;