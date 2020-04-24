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
          <Redirect from="/" to="/main/ORFManagement/FZ2PMSCreate" />
          {/* <Redirect from="/" to="/main/ORFManagement/ORFCreate" /> */}
          {/* <Redirect from="/" to="/main/ORFManagement/ORFReadDrafterList" /> */}
        </Fragment>
      ) : (
        <Fragment>
          <Route path="/auth/login-page/:problem" component={AuthLayout} />
          <Route path="/auth/login-page" component={AuthLayout} />
          <Route path="/auth/read-login" component={AuthLayout} />
          {/* <Redirect from="/" to="/auth/login-page" /> */}
        </Fragment>
      )}
    </Switch>
  );
}
