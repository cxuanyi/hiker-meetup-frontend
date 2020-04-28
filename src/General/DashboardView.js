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
//others

const useFormStyle = makeStyles(formStyle);

const DepartmentTaskReadSingleView = () => {
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

  return (
    <div>
      <GridContainer className={classes.parentContainer}>
        <GridItem lg={12}>
          <Fragment>
            <GridContainer>
              <GridItem>
                <p className={classes.title}>
                  Welcome to Hikers' Meet-Up, this is where hikers meet.
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

DepartmentTaskReadSingleView.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.node
};

export default withRouter(DepartmentTaskReadSingleView);
