import React from "react";
import PropTypes from "prop-types";
import queryString from 'query-string';

// others
import useORMSAxios from "../../_axios/ormsAxios";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "../../_rootComponent/Grid/GridContainer";
import GridItem from "../../_rootComponent/Grid/GridItem";
// styles
import styles from "../_subAsset/jss/loginViewStyle";

const useStyles = makeStyles(styles);

export default function ReadLoginPage(props) {
  const { location } = props;
  const classes = useStyles();
  const values = queryString.parse(props.location.search);
  const { code } = values;
  const {
    ormsAxiosGetRequest
  } = useORMSAxios();

  const initializeDataCallback = React.useCallback(async () => {
    const responseUserData = await ormsAxiosGetRequest(
      "https://hiker-meetup.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize",
      {
        response_type: "code",
        client_id: "31it8rd08fvmj8evp5po8s73oc", 
        redirect_uri: "http://localhost:3000/auth/read-login"
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } } //Set header, accesstoken is still unavailable in context yet
    );
  }, []);

  React.useEffect(() => {
    initializeDataCallback();
    // eslint-disable-next-line
  }, []);



  
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem lg={4}>
          Hellos          
        </GridItem>
      </GridContainer>
    </div>
  );
}

ReadLoginPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.node
};