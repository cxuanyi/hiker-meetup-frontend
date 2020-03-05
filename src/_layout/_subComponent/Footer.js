import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Divider } from "@material-ui/core";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "../_subAsset/jss/footerStyle";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { fluid, white, showDivider } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  return (
    <footer className={classes.footer}>
      {showDivider ? <Divider /> : null}
      <div className={container}>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{" "}
          {"Yokogawa, Co-innovating tomorrow."}
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  showDivider: PropTypes.bool
};
