import React from "react";
import jwt from "jsonwebtoken";
import { Authenticator, SignIn, Greetings } from "aws-amplify-react";
import { Auth } from "aws-amplify";
import PropTypes from "prop-types";
import queryString from "query-string";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "../../_rootComponent/Grid/GridContainer";
import GridItem from "../../_rootComponent/Grid/GridItem";
// styles
import styles from "../_subAsset/jss/loginViewStyle";
// others
import useORMSAxios from "../../_axios/ormsAxios";
import { UserContext } from "../../_rootContext/UserContext";
import { verifyEmail } from "../../_helper/validator";
import { getEpochDate } from "../../_helper/date";
import { userInContextTemplate } from "../../_helper/objTemplate";
import {
  AUTH_INVALID_EMAIL_PASSWORD,
  AUTH_INVALID_USERNAME_PASSWORD,
  AUTH_NOT_AUTHORIZED,
  AUTH_SESSION_ENDED
} from "../../_helper/message";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const classes = useStyles();
  const { history, location } = props;
  const values = queryString.parse(location.search);
  const { transition, code } = values;

  const logo = require("../../_rootAsset/img/logo.png");

  const [authState, setAuthState] = React.useState(null);
  const [loginCredentials, setLoginCredentials] = React.useState({
    email: "",
    password: ""
  });
  const [emailState, setEmailState] = React.useState("");
  const [passwordState, setPasswordState] = React.useState("");
  const { userInContext, setUserInContext } = React.useContext(UserContext);
  const [accessToken, setAccessToken] = React.useState();
  const [user, setUser] = React.useState(null);
  const [invokedGetUserData, setInvokedGetUserData] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const { ormsAxiosPostRequest } = useORMSAxios();

  React.useEffect(() => {
    const initializeData = async () => {
      try {
        const test = await Auth.currentAuthenticatedUser();
        console.log(test);
        setAuthState("authenticated");
      } catch (err) {
        console.log("not authenticated");

        if (transition) {
          setTimeout(function() {
            initializeData();
          }, 1000); //will call the function after 2 secs.
        }
        setAuthState("not authenticated");
      }
    };

    initializeData();
  }, []);

  React.useEffect(() => {
    if (accessToken) {
      const requestUserData = {
        _email: loginCredentials.email.toLowerCase()
      };
      const fetchResponseAuthData = async () => {
        try {
          const { exp, iat } = jwt.decode(accessToken);

          const responseUserData = await ormsAxiosPostRequest(
            "/auth/get-user-data",
            requestUserData,
            { headers: { Authorization: "bearer " + accessToken } } //Set header, accesstoken is still unavailable in context yet
          );

          let userContextTemp = {
            ...userInContext,
            ...{ accessToken: accessToken, exp: exp, iat: iat },
            ...{ data: responseUserData }
          };
          setUser(userContextTemp);
        } catch (error) {
          setErrorMessage(AUTH_NOT_AUTHORIZED);
        }
      };
      fetchResponseAuthData();
    }
  }, [
    ormsAxiosPostRequest,
    accessToken,
    loginCredentials.email,
    setUser,
    userInContext
  ]);

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem lg={4}>
          <Authenticator />
        </GridItem>
      </GridContainer>
    </div>
  );
}

LoginPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.node
};
