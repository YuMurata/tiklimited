import * as React from "react";
import EventDBTable from "./DBTable/Events/EventDBTable";
import ActionDBTable from "./DBTable/Actions/ActionDBTable";
import CreateDB from "./DBTable/Events/CreateDB";
import { Tiktok } from "./Tiktok/Tiktok";

const App: React.FC = () => {
  return (
    <div className="container fruitsList">
      <h1>main</h1>
      <div>{/* <EventDBTable /> */}</div>
      <div>{/* <ActionDBTable /> */}</div>
      <div>
        <CreateDB />
      </div>
      <div>
        <Tiktok />
      </div>
    </div>
  );
};

export default App;
