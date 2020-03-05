import {
  defaultFont,
  infoColor,
  whiteColor,
  blackColor,
  grayColor,
  hexToRgb
} from "../../../_rootAsset/jss/material-dashboard-react";

const sidebarStyle = () => ({
  list: {
    marginTop: "15px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    color: "inherit",
    "&:before,&:after": {
      display: "table",
      content: '" "'
    },
    "&:after": {
      clear: "both"
    }
  },
  item: {
    color: "inherit",
    position: "relative",
    display: "block",
    textDecoration: "none",
    margin: "0",
    padding: "0"
  },
  userItem: {
    "&:last-child": {
      paddingBottom: "0px"
    }
  },
  itemLink: {
    paddingLeft: "10px",
    paddingRight: "10px",
    transition: "all 300ms linear",
    margin: "10px 15px 0",
    borderRadius: "3px",
    position: "relative",
    display: "block",
    padding: "10px 15px",
    backgroundColor: "#ededed",
    ...defaultFont,
    width: "auto",
    "&:hover": {
      outline: "none",
      backgroundColor: "#dbdbdb",
      boxShadow: "none"
    },
    "&,&:hover,&:focus": {
      color: "inherit"
    }
  },
  itemIcon: {
    color: "inherit",
    width: "30px",
    height: "24px",
    float: "left",
    position: "inherit",
    top: "3px",
    marginRight: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    opacity: "0.8"
  },
  itemText: {
    color: "inherit",
    ...defaultFont,
    margin: "0",
    lineHeight: "30px",
    fontSize: "14px",
    transform: "translate3d(0px, 0, 0)",
    opacity: "1",
    transition: "transform 300ms ease 0s, opacity 300ms ease 0s",
    position: "relative",
    display: "block",
    height: "auto",
    whiteSpace: "nowrap",
    padding: "0 16px !important"
  },
  userItemText: {
    lineHeight: "22px"
  },
  collapseList: {
    marginTop: "0",
    "& $caret": {
      marginTop: "8px"
    }
  },
  collapseItem: {
    position: "relative",
    display: "block",
    textDecoration: "none",
    margin: "10px 0 0 0",
    padding: "0"
  },
  collapseItemLink: {
    transition: "all 300ms linear",
    margin: "0 15px",
    borderRadius: "3px",
    position: "relative",
    display: "block",
    padding: "10px",
    backgroundColor: "transparent",
    ...defaultFont,
    width: "auto",
    "&:hover": {
      outline: "none",
      backgroundColor: "rgba(" + hexToRgb(grayColor) + ", 0.2)",
      boxShadow: "none"
    },
    "&,&:hover,&:focus": {
      color: "inherit"
    }
  },
  collapseItemMini: {
    color: "inherit",
    ...defaultFont,
    textTransform: "uppercase",
    width: "30px",
    marginRight: "15px",
    textAlign: "center",
    letterSpacing: "1px",
    position: "relative",
    float: "left",
    display: "inherit",
    transition: "transform 300ms ease 0s, opacity 300ms ease 0s",
    fontSize: "12px"
  },
  caret: {
    marginTop: "13px",
    position: "absolute",
    right: "18px",
    transition: "all 150ms ease-in",
    display: "inline-block",
    width: "0",
    height: "0",
    marginLeft: "2px",
    verticalAlign: "middle",
    borderTop: "4px solid",
    borderRight: "4px solid transparent",
    borderLeft: "4px solid transparent"
  },
  userCaret: {
    marginTop: "10px"
  },
  caretActive: {
    transform: "rotate(180deg)"
  },
  blue: {
    "&,&:hover,&:focus": {
      color: whiteColor,
      backgroundColor: infoColor,
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(infoColor) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(infoColor) +
        ",.2)"
    }
  },
  sidebarWrapper: {
    position: "relative",
    overflow: "auto",
    width: "260px",
    overflowScrolling: "touch",
    color: "inherit",
    paddingTop: "16px",
    paddingBottom: "16px"
  },
  user: {
    paddingTop: "10px",
    paddingLeft: "20px",
    position: "relative"
  },
  greeting: {
    fontSize: "15px"
  },
  userSessionInfo: {
    fontSize: "12px"
  },
  img: {
    width: "25px",
    verticalAlign: "middle",
    border: "0",
    paddingBottom: "5px"
  },
  logo: {
    margin: "0",
    textAlign: "center",
    paddingBottom: "5px"
  },
  logoNormal: {
    display: "inline",
    textTransform: "uppercase",
    fontSize: "15px",
    fontWeight: "400",
    "&,&:hover,&:focus": {
      color: "inherit"
    },
    paddingLeft: "12px"
  }
});

export default sidebarStyle;
