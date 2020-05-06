import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
// nodejs classes
import PropTypes from "prop-types";
// @material-ui/core components
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// material ui icons
import DashboardIcon from "@material-ui/icons/Dashboard";
// core components
import GridContainer from "../_rootComponent/Grid/GridContainer";
import GridItem from "../_rootComponent/Grid/GridItem";
import Table from "../_rootComponent/Table/Table";
// sub components
// style for this view
import formStyle from "../_rootAsset/jss/formStyle";
// others
import useTestingApi from "./_subApi/testingApi";
import { UserContext } from "../_rootContext/UserContext";

const useFormStyle = makeStyles(formStyle);

const DashboardView = () => {
  const classes = { ...useFormStyle() };
  const acronymHeader = [
    "S/N",
    "Acronym",
    "Definition",
    "Description",
    "Use By"
  ];
  const acronymData = [
    [
      "BFF",
      "Best Friends Forever",
      "When you have a friend and it's forever",
      "Friends"
    ]
  ];
  const { fetchAllEvents, createEvent, fetchAllUsers } = useTestingApi(); // eslint-disable-line
  const { userInContext } = React.useContext(UserContext);

  React.useEffect(() => {
    const initializeData = async () => {
      // const allEvents = await fetchAllEvents();
      // console.log("Check allEvents: ", allEvents);

      // const createResponse = await createEvent();
      // console.log("Check create: ", createResponse);

      // const allUsers = await fetchAllUsers();
      // console.log("Check allUsers: ", allUsers);

      console.log("userInContext:", userInContext);
    };

    initializeData();
  }, []); // eslint-disable-line

  return (
    <div>
      <GridContainer className={classes.parentContainer}>
        <GridItem lg={12}>
          <Fragment>
            <GridContainer>
              <GridItem>
                <p className={classes.title}>
                  Welcome to Hikers&apos; Meet-Up, this is where hikers meet.
                </p>
                <div className={classes.iconWrapper}>
                  <DashboardIcon fontSize="small" />
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem lg={12}>
                <div className={classes.subTitleWrapper}>
                  <Typography className={classes.subTitle}>
                    Cult-wide Glossary
                  </Typography>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem lg={12}>
                <Table
                  striped
                  tableHead={acronymHeader}
                  tableData={acronymData
                    .sort((a, b) => {
                      if (a[0] === b[0]) return 0;
                      return a[0] > b[0] ? 1 : -1;
                    })
                    .map((rowData, index) => {
                      return [index + 1, ...rowData];
                    })}
                />
              </GridItem>
            </GridContainer>
          </Fragment>
        </GridItem>
      </GridContainer>
    </div>
  );
};

DashboardView.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.node
};

export default withRouter(DashboardView);
