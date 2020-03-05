import {
  defaultFont,
  primaryColor,
  whiteColor,
  blackColor,
  grayColor,
  hexToRgb
} from "../../../_rootAsset/jss/material-dashboard-react";

const customDropdownStyle = () => ({
  dropdown: {
    border: "0",
    boxShadow: "0 2px 5px 0 rgba(" + hexToRgb(blackColor) + ", 0.26)",
    zIndex: "1000",
    minWidth: "160px",
    padding: "5px 0",
    margin: "2px 0 0",
    fontSize: "14px",
    textAlign: "left",
    backgroundColor: whiteColor
  },
  menuList: {
    padding: "0"
  },
  dropdownItem: {
    ...defaultFont,
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    position: "relative",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    height: "100%",
    color: grayColor,
    whiteSpace: "nowrap",
    minHeight: "unset"
  },
  darkHover: {
    "&:hover": {
      boxShadow:
        "0 4px 20px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 7px 10px -5px rgba(" +
        hexToRgb(grayColor) +
        ", 0.4)",
      backgroundColor: grayColor,
      color: whiteColor
    }
  },
  primaryHover: {
    "&:hover": {
      backgroundColor: primaryColor,
      color: whiteColor
    }
  },
  dropdownDividerItem: {
    margin: "5px 0",
    backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.12)",
    height: "1px",
    overflow: "hidden"
  },
  buttonIcon: {
    width: "20px",
    height: "20px"
  },
  caret: {
    transition: "all 150ms ease-in",
    display: "inline-block",
    width: "0",
    height: "0",
    marginLeft: "4px",
    verticalAlign: "middle",
    borderTop: "4px solid",
    borderRight: "4px solid transparent",
    borderLeft: "4px solid transparent"
  },

  dropdownHeader: {
    display: "block",
    padding: "0.1875rem 1.25rem",
    fontSize: "0.75rem",
    lineHeight: "1.428571",
    color: grayColor,
    whiteSpace: "nowrap",
    fontWeight: "inherit",
    marginTop: "10px",
    minHeight: "unset",
    "&:hover,&:focus": {
      backgroundColor: "transparent",
      cursor: "auto"
    }
  },
  noLiPadding: {
    padding: "0"
  }
});

export default customDropdownStyle;
