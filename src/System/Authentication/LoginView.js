import React from "react";
import jwt from "jsonwebtoken";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// core components
import GridContainer from "../../_rootComponent/Grid/GridContainer";
import GridItem from "../../_rootComponent/Grid/GridItem";
import CustomInput from "../../_rootComponent/CustomInput/CustomInput";
import Button from "../../_rootComponent/CustomButtons/Button";
import Card from "../../_rootComponent/Card/Card";
import CardBody from "../../_rootComponent/Card/CardBody";
import CardHeader from "../../_rootComponent/Card/CardHeader";
import CardFooter from "../../_rootComponent/Card/CardFooter";
// icons
import Email from "@material-ui/icons/Email";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Assignment from "@material-ui/icons/Assignment";
import Build from "@material-ui/icons/Build";
import Create from "@material-ui/icons/Create";
import Memory from "@material-ui/icons/Memory";
import BarChart from "@material-ui/icons/BarChart";
import DragIndicator from "@material-ui/icons/DragIndicator";
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

import { testCognito } from "../../_helper/cognito";


const useStyles = makeStyles(styles);

export default function LoginPage() {
  const classes = useStyles();
  const logo = require("../../_rootAsset/img/logo.png");

  const [loginCredentials, setLoginCredentials] = React.useState({
    email: "",
    password: ""
  });
  const [emailState, setEmailState] = React.useState("");
  const [passwordState, setPasswordState] = React.useState("");
  const { userInContext, setUserInContext } = React.useContext(UserContext);
  const [accessToken, setAccessToken] = React.useState();
  const [user, setUser] = React.useState();
  const [invokedGetUserData, setInvokedGetUserData] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const { ormsAxiosPostRequest } = useORMSAxios();

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

  React.useEffect(() => {
    if (!invokedGetUserData) {
      if (user) {
        const { data, accessToken, exp, iat } = user;
        const timeOutInMilliSeconds = (exp - getEpochDate()) * 1000;
        const loggedInUser = {
          ...userInContext,
          ...{
            accessToken: accessToken,
            acl: JSON.parse(data._access_control),
            exp: exp,
            iat: iat,
            isLoggedOn: true,
            user: data
          }
        };
        setUserInContext(loggedInUser);
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        setTimeout(() => {
          setUserInContext(userInContextTemplate);
          localStorage.clear();
        }, timeOutInMilliSeconds);
        setInvokedGetUserData(true);
      } else {
        setAccessToken();
      }
    }
  }, [user, setUserInContext, invokedGetUserData, accessToken, userInContext]);

  const handleTextFieldChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        verifyEmail(value) ? setEmailState("success") : setEmailState("error");
        break;
      case "password":
        value.length >= 8
          ? setPasswordState("success")
          : setPasswordState("error");
        break;
      default:
    }

    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  const onLoginButtonClickedHandler = () => {

    console.log("hellos");
    testCognito();
  };

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem lg={4}>
          <form>
            <Card color="corporate">
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="danger"
              >
                <img src={logo} alt="logo" className={classes.img} />
                <h4 className={classes.cardTitle}>Collabo-Web</h4>
                <div className={classes.socialLine}>
                  <div className={classes.icon}>
                    <Assignment />
                  </div>
                  <div className={classes.icon}>
                    <Build />
                  </div>
                  <div className={classes.icon}>
                    <Create />
                  </div>
                  <div className={classes.icon}>
                    <Memory />
                  </div>
                  <div className={classes.icon}>
                    <BarChart />
                  </div>
                  <div className={classes.icon}>
                    <DragIndicator />
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  success={emailState === "success"}
                  error={emailState === "error"}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    name: "email",
                    value: loginCredentials.email,
                    type: "email",
                    onChange: e => {
                      handleTextFieldChange(e);
                    }
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  success={passwordState === "success"}
                  error={passwordState === "error"}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockOutlined className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    name: "password",
                    type: "password",
                    autoComplete: "off",
                    onChange: e => {
                      handleTextFieldChange(e);
                    }
                  }}
                />
                <p className={classes.error}>
                  {userInContext.loggedOnBefore
                    ? AUTH_SESSION_ENDED
                    : errorMessage}
                </p>
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button
                  color="primary"
                  size="lg"
                  onClick={onLoginButtonClickedHandler}
                  block
                >
                  Log In
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
