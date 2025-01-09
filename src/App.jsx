import React from "react";
import Routes from "./routes/routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes />
    </div>
  );
};

export default App;
