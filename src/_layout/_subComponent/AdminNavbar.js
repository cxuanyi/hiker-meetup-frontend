import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Divider } from "@material-ui/core";

// core components
import AdminNavbarLinks from "./AdminNavbarLinks";
// style
import styles from "../_subAsset/jss/adminNavbarStyle";
// others
import CustomHeader from "../../_rootComponent/CustomIcon/CustomHeader";

const useStyles = makeStyles(styles);

export default function AdminNavbar(props) {
  const classes = useStyles();
  const { ModuleIcon, pageTitle, ModuleColor } = props;
  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.container}>
        <div className={classes.titleWrapper}>
          {/* Here we create navbar brand, based on route name */}
          {ModuleIcon ? (
            <CustomHeader icon color={ModuleColor}>
              <ModuleIcon />
            </CustomHeader>
          ) : null}
          <p className={classes.title}>{pageTitle}</p>
        </div>
        <AdminNavbarLinks />
      </Toolbar>
      <Divider />
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  pageTitle: PropTypes.string,
  ModuleColor: PropTypes.string,
  ModuleIcon: PropTypes.object
};
