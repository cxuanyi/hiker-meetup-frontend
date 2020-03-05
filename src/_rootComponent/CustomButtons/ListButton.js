import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import styles from "./jss/buttonStyle.js";

const useStyles = makeStyles(styles);

const ListButton = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    color,
    children,
    fullWidth,
    disabled,
    size,
    block,
    link,
    className,
    muiClasses,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: true,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: true,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: true,
    [className]: className
  });
  return (
    <Button {...rest} ref={ref} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
});

ListButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  className: PropTypes.string,
  muiClasses: PropTypes.object,
  children: PropTypes.node
};

export default ListButton;
