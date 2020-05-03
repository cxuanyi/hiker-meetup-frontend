import React from "react";
import { Auth } from "aws-amplify";
import PropTypes from "prop-types";
import queryString from "query-string";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
// core components
import GridContainer from "../../_rootComponent/Grid/GridContainer";
import GridItem from "../../_rootComponent/Grid/GridItem";
import Button from "../../_rootComponent/CustomButtons/Button";
import Card from "../../_rootComponent/Card/Card";
import CardBody from "../../_rootComponent/Card/CardBody";
import CardHeader from "../../_rootComponent/Card/CardHeader";
import CardFooter from "../../_rootComponent/Card/CardFooter";
// styles
import styles from "../_subAsset/jss/loginViewStyle";
// others
import { UserContext } from "../../_rootContext/UserContext";
// icons
import Pets from "@material-ui/icons/Pets";
import Place from "@material-ui/icons/Place";
import Terrain from "@material-ui/icons/Terrain";
import TimeToLeave from "@material-ui/icons/TimeToLeave";
import Whatshot from "@material-ui/icons/Whatshot";
import WbCloudy from "@material-ui/icons/WbCloudy";
import Pool from "@material-ui/icons/Pool";
import Person from "@material-ui/icons/Person";
import LocalCafe from "@material-ui/icons/LocalCafe";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const classes = useStyles();
  const logo = require("../../_rootAsset/img/logo.png");

  const { location } = props;
  const values = queryString.parse(location.search);
  const { transition } = values;
  const [transitionState, setTransitionState] = React.useState(transition);
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
      {transitionState !== "signing_in" ? (
        <GridContainer justify="center">
          <GridItem lg={4}>
            <Card color="corporate">
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="danger"
              >
                <img src={logo} alt="logo" className={classes.img} />
                <h4 className={classes.cardTitle}>Hikers&apos; Meetup</h4>
                <div className={classes.socialLine}>
                  <div className={classes.icon}>
                    <Pets />
                  </div>
                  <div className={classes.icon}>
                    <Place />
                  </div>
                  <div className={classes.icon}>
                    <Terrain />
                  </div>
                  <div className={classes.icon}>
                    <TimeToLeave />
                  </div>
                  <div className={classes.icon}>
                    <Whatshot />
                  </div>
                  <div className={classes.icon}>
                    <WbCloudy />
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className={classes.socialLine}>
                  <div className={classes.icon}>
                    <LocalCafe />
                  </div>
                  <div className={classes.icon2}>
                    <Pets />
                  </div>
                  <div className={classes.icon}>
                    <Place />
                  </div>
                  <div className={classes.icon}>
                    <Terrain />
                  </div>
                  <div className={classes.icon}>
                    <TimeToLeave />
                  </div>
                  <div className={classes.icon}>
                    <Whatshot />
                  </div>
                  <div className={classes.icon}>
                    <Pool />
                  </div>
                  <div className={classes.icon2}>
                    <WbCloudy />
                  </div>
                  <div className={classes.icon}>
                    <Person />
                  </div>
                </div>
                <div className={classes.socialLine}>
                  <div className={classes.icon}>
                    <WbCloudy />
                  </div>
                  <div className={classes.icon2}>
                    <Terrain />
                  </div>
                  <div className={classes.icon2}>
                    <Place />
                  </div>
                  <div className={classes.icon2}>
                    <Whatshot />
                  </div>
                  <div className={classes.icon2}>
                    <LocalCafe />
                  </div>
                  <div className={classes.icon2}>
                    <Pool />
                  </div>
                  <div className={classes.icon2}>
                    <TimeToLeave />
                  </div>
                  <div className={classes.icon2}>
                    <Person />
                  </div>
                  <div className={classes.icon}>
                    <Pets />
                  </div>
                </div>
                <div className={classes.socialLine}>
                  <div className={classes.icon}>
                    <LocalCafe />
                  </div>
                  <div className={classes.icon2}>
                    <Person />
                  </div>
                  <div className={classes.icon}>
                    <Terrain />
                  </div>
                  <div className={classes.icon}>
                    <Pool />
                  </div>
                  <div className={classes.icon}>
                    <WbCloudy />
                  </div>
                  <div className={classes.icon}>
                    <Whatshot />
                  </div>
                  <div className={classes.icon}>
                    <TimeToLeave />
                  </div>
                  <div className={classes.icon2}>
                    <Pets />
                  </div>
                  <div className={classes.icon}>
                    <Place />
                  </div>
                </div>
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button
                  color="primary"
                  size="lg"
                  onClick={() => Auth.federatedSignIn()}
                  block
                >
                  Sign In
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      ) : (
        <div>
          <GridContainer justify="center">
            <GridItem lg={4}>
              <CircularProgress />
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem lg={4}>Loading...</GridItem>
          </GridContainer>
        </div>
      )}
    </div>
  );
}

LoginPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.node
};
