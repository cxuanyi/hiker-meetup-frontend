import React, { Fragment } from "react";
// import axios from "axios";

import { Route, Switch, Redirect } from "react-router-dom";
import MainLayout from "./_layout/Main";
import AuthLayout from "./_layout/Auth";
import { UserContext } from "./_rootContext/UserContext";

export default function SwitchRoutes() {
  const { userInContext } = React.useContext(UserContext);

  return (
    <Switch>
      {userInContext.isLoggedOn ? (
        <Fragment>
          <Route path="/main" component={MainLayout} />
          <Route path="/auth/logout-page" component={AuthLayout} />
          {/* <Redirect from="/" to="/main/General/Dashboard" /> */}
          <Redirect from="/" to="/main/Events/ListEvents" />
          {/* <Redirect from="/" to="/main/Events/CreateEvent" /> */}
          {/* <Redirect
            from="/"
            to="/main/Events/EditEvent/a9c0d07d-b427-4489-b87e-15c8aef1921b"
          /> */}
          {/* <Redirect
            from="/"
            to="/main/Events/ViewEvent/cd4663b0-7969-468d-9a2e-ed7ea07e91b6"
          /> */}
          <Redirect
            from="/"
            to="/main/Events/ViewEvent/81f3945f-356b-4d77-bfce-c0272b6b7503"
          />
          {/* <Redirect
            from="/"
            to="/main/Events/ViewEvent/a9c0d07d-b427-4489-b87e-15c8aef1921b" // Check Cancel status
          /> */}
        </Fragment>
      ) : (
        <Fragment>
          <Route path="/auth/login-page/:problem" component={AuthLayout} />
          <Route path="/auth/login-page" component={AuthLayout} />
          <Redirect from="/" to="/auth/login-page" />
        </Fragment>
      )}
    </Switch>
  );
}
