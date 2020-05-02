import React from "react";
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
import { UserContext } from "../../_rootContext/UserContext";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const classes = useStyles();
  const { location } = props;
  const values = queryString.parse(location.search);
  const { transition } = values;
  const { userInContext, setUserInContext } = React.useContext(UserContext);

  React.useEffect(() => {
    const initializeData = async () => {
      if (transition === "signing_in") {
        try {
          const cognitoUserSession = await Auth.currentAuthenticatedUser();
          const { signInUserSession, attributes } = cognitoUserSession;
          const { accessToken } = signInUserSession;
          const { jwtToken, payload } = accessToken;
          if (!userInContext.isLoggedOn) {
            let userContextTemp = {
              ...userInContext,
              ...{
                accessToken: jwtToken,
                exp: payload.exp,
                iat: payload.iat,
                user: attributes,
                isLoggedOn: true
              }
            };
            setUserInContext(userContextTemp);
            localStorage.setItem(
              "loggedInUser",
              JSON.stringify(userContextTemp)
            );
          }
        } catch (err) {
          setTimeout(function() {
            initializeData();
          }, 1000); //will call the function after 1 secs.
        }
      }
    };

    initializeData();
  }, []); // eslint-disable-line

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem lg={4}>
          <Authenticator hideDefault={true}>
            <SignIn />
            <Greetings />
          </Authenticator>
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
