import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import Amplify from "aws-amplify";

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
Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "ap-southeast-1:0dc11051-304f-4e55-a3fb-af07393a179c",

    // REQUIRED - Amazon Cognito Region
    region: "ap-southeast-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-southeast-1_Krx5EBNva",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "31it8rd08fvmj8evp5po8s73oc",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: "USER_SRP_AUTH",

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "hiker-meetup.auth.ap-southeast-1.amazoncognito.com",
      scope: [
        "phone",
        "email",
        "profile",
        "openid",
        "aws.cognito.signin.user.admin"
      ],
      // scope: ['openid'],
      redirectSignIn:
        "http://localhost:3000/auth/login-page?transition=signing_in",
      redirectSignOut:
        "http://localhost:3000/auth/login-page?transition=signing_out",
      responseType: "code" // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
});

const rootApp = (
  <Router history={hist}>
    <UserContextProvider>
      <SwitchRoutes />
    </UserContextProvider>
  </Router>
);
ReactDOM.render(rootApp, document.getElementById("root"));
