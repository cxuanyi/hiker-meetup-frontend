import {
  container,
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "../../../_rootAsset/jss/material-dashboard-react";

const pagesHeaderStyle = () => ({
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    paddingTop: "10px",
    zIndex: "1029",
    color: grayColor,
    border: "0",
    borderRadius: "3px",
    padding: "10px 0",
    minHeight: "50px",
    display: "block"
  },
  container: {
    ...container,
    minHeight: "50px"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: whiteColor,
    letterSpacing: "unset",
    "&:hover,&:focus": {
      background: "transparent",
      color: whiteColor
    }
  },
  appResponsive: {
    top: "8px"
  },
  primary: {
    backgroundColor: primaryColor,
    color: whiteColor
  },
  info: {
    backgroundColor: infoColor,
    color: whiteColor
  },
  success: {
    backgroundColor: successColor,
    color: whiteColor
  },
  warning: {
    backgroundColor: warningColor,
    color: whiteColor
  },
  danger: {
    backgroundColor: dangerColor,
    color: whiteColor
  },
  list: {
    ...defaultFont,
    fontSize: "14px",
    margin: 0,
    marginRight: "-15px",
    paddingLeft: "0",
    listStyle: "none",
    color: whiteColor,
    paddingTop: "0",
    paddingBottom: "0"
  },
  listItem: {
    float: "left",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0"
  },
  navLink: {
    color: whiteColor,
    margin: "0 5px",
    paddingTop: "15px",
    paddingBottom: "15px",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    position: "relative",
    display: "block",
    padding: "10px 15px",
    textDecoration: "none",
    "&:hover,&:focus": {
      color: whiteColor,
      background: "rgba(" + hexToRgb(grayColor) + ", 0.2)"
    }
  },
  listItemIcon: {
    marginTop: "-3px",
    top: "0px",
    position: "relative",
    marginRight: "3px",
    width: "20px",
    height: "20px",
    verticalAlign: "middle",
    color: "inherit",
    display: "inline-block"
  },
  listItemText: {
    flex: "none",
    padding: "0",
    minWidth: "0",
    margin: 0,
    display: "inline-block",
    position: "relative",
    whiteSpace: "nowrap"
  },
  navLinkActive: {
    backgroundColor: "rgba(" + hexToRgb(whiteColor) + ", 0.1)"
  },
  sidebarButton: {
    "&,&:hover,&:focus": {
      color: whiteColor
    },
    top: "-2px"
  }
});

export default pagesHeaderStyle;
