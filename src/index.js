import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import UserContextProvider from "./_rootContext/UserContext";
import SwitchRoutes from "./switchRoutes";
// Base css
import "./_rootAsset/css/base.css";
// Components css
import "./_rootAsset/css/fileupload.css";
import "./_rootAsset/css/react-datetime.css";
import "./_rootAsset/css/react-tagsinput.css";

// const store = createStore(rootReducer);
const hist = createBrowserHistory();
const rootApp = (
  <Router history={hist}>
    <UserContextProvider>
      <SwitchRoutes />
    </UserContextProvider>
  </Router>
);
ReactDOM.render(rootApp, document.getElementById("root"));
