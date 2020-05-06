import {
  whiteColor,
  blackColor,
  successColor,
  alternateBgColor,
  dangerColor,
  primaryColor,
  grayColor,
  informativeBgColor,
  hexToRgb,
  title
} from "./material-dashboard-react";

const eventFormStyle = {
  parentContainer: {
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  childContainer: {
    borderStyle: "solid",
    border: "1px",
    borderColor: grayColor
  },
  title: {
    ...title,
    display: "inline-block",
    fontSize: "21px",
    fontWeight: "350",
    paddingLeft: "10px",
    paddingRight: "5px"
  },
  subTitle: {
    display: "inline-block",
    fontSize: "17px",
    fontWeight: "300",
    paddingLeft: "15px",
    paddingRight: "5px",
    textDecoration: "underline"
  },
  subTitleWrapper: {
    paddingTop: "10px",
    paddingBottom: "7px"
  },
  iconWrapper: {
    paddingLeft: "4px",
    display: "inline-block",
    verticalAlign: "middle"
  },
  formButton: {
    float: "right"
  },
  labelHorizontalForm: {
    color: "rgba(" + hexToRgb(blackColor) + ", 0.9)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingTop: "39px",
    marginRight: "0",
    "@media (min-width: 992px)": {
      float: "right"
    }
  },
  labelHorizontalView: {
    color: "rgba(" + hexToRgb(blackColor) + ", 0.9)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "16px",
    marginRight: "0",
    "@media (min-width: 992px)": {
      float: "left"
    }
  },
  labelHorizontalUpload: {
    color: "rgba(" + hexToRgb(blackColor) + ", 0.9)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingTop: "30px",
    marginRight: "0",
    "@media (min-width: 992px)": {
      float: "right"
    }
  },
  horizontalDatepicker: {
    paddingTop: "30px",
    paddingBottom: "20px"
  },
  footer: {
    padding: "0 15px 20px 15px"
  },
  buttonLeft: {
    float: "left!important"
  },
  buttonRight: {
    float: "right!important"
  },
  gridAlternateBgColor: {
    backgroundColor: alternateBgColor
  },
  gridInformativeBgColor: {
    backgroundColor: informativeBgColor
  },
  staticFormGroup: {
    marginLeft: "0",
    marginRight: "0",
    paddingBottom: "10px",
    margin: "8px 0 0 0",
    position: "relative",
    "&:before,&:after": {
      display: "table",
      content: '" "'
    },
    "&:after": {
      clear: "both"
    }
  },
  staticFormControl: {
    marginBottom: "0",
    paddingTop: "8px",
    paddingBottom: "8px",
    minHeight: "34px"
  },
  inputAdornment: {
    marginRight: "8px",
    position: "relative"
  },
  inputAdornmentIconSuccess: {
    color: successColor + "!important"
  },
  inputAdornmentIconError: {
    color: dangerColor + "!important"
  },
  select: {
    paddingTop: "30px",
    fontSize: "15px",
    width: "600px",
    fontWeight: "400",
    color: grayColor,
    "&:focus": {
      backgroundColor: "transparent"
    },
    "&[aria-owns] + input + svg": {
      transform: "rotate(180deg)"
    },
    "& + input + svg": {
      transition: "all 300ms linear"
    }
  },
  select2: {
    paddingTop: "30px",
    fontSize: "15px",
    width: "300px",
    fontWeight: "400",
    color: grayColor,
    "&:focus": {
      backgroundColor: "transparent"
    },
    "&[aria-owns] + input + svg": {
      transform: "rotate(180deg)"
    },
    "& + input + svg": {
      transition: "all 300ms linear"
    }
  },
  select3: {
    paddingTop: "30px",
    fontSize: "15px",
    width: "100px",
    fontWeight: "400",
    color: grayColor,
    "&:focus": {
      backgroundColor: "transparent"
    },
    "&[aria-owns] + input + svg": {
      transform: "rotate(180deg)"
    },
    "& + input + svg": {
      transition: "all 300ms linear"
    }
  },
  selectFormControl: {
    margin: "7px 0 17px 0 !important",
    "& > div": {
      "&:before": {
        borderBottomWidth: "1px !important",
        borderBottomColor: grayColor + "!important"
      },
      "&:after": {
        borderBottomColor: primaryColor + "!important"
      }
    }
  },
  selectLabel: {
    fontSize: "12px",
    textTransform: "uppercase",
    color: grayColor + " !important",
    top: "8px"
  },
  selectMenu: {
    "& > div > ul": {
      border: "0",
      padding: "5px 0",
      margin: "0",
      boxShadow: "none",
      minWidth: "100%",
      borderRadius: "4px",
      boxSizing: "border-box",
      display: "block",
      fontSize: "14px",
      textAlign: "left",
      listStyle: "none",
      backgroundColor: whiteColor,
      backgroundClip: "padding-box"
    },
    "& $selectPaper $selectMenuItemSelectedMultiple": {
      backgroundColor: "inherit"
    },
    "& > div + div": {
      maxHeight: "266px !important"
    }
  },
  selectMenuItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "2",
    whiteSpace: "nowrap",
    color: grayColor,
    paddingRight: "30px",
    "&:hover": {
      backgroundColor: primaryColor,
      color: whiteColor
    }
  },
  selectMenuItemSelected: {
    backgroundColor: primaryColor + "!important",
    color: whiteColor
  },
  selectMenuItemSelectedMultiple: {
    backgroundColor: "transparent !important",
    "&:hover": {
      backgroundColor: primaryColor + "!important",
      color: whiteColor,
      "&:after": {
        color: whiteColor
      }
    },
    "&:after": {
      top: "16px",
      right: "12px",
      width: "12px",
      height: "5px",
      borderLeft: "2px solid currentColor",
      transform: "rotate(-45deg)",
      opacity: "1",
      color: grayColor,
      position: "absolute",
      content: "''",
      borderBottom: "2px solid currentColor",
      transition: "opacity 90ms cubic-bezier(0,0,.2,.1)"
    }
  },
  selectPaper: {
    boxSizing: "borderBox",
    borderRadius: "4px",
    padding: "0",
    minWidth: "100%",
    display: "block",
    border: "0",
    boxShadow: "0 2px 5px 0 rgba(" + hexToRgb(blackColor) + ", 0.26)",
    backgroundClip: "padding-box",
    margin: "2px 0 0",
    fontSize: "14px",
    textAlign: "left",
    listStyle: "none",
    backgroundColor: "transparent",
    maxHeight: "266px"
  },
  viewDocumentButton: {
    marginTop: "27px"
  },
  formText: {
    color: "rgba(" + hexToRgb(blackColor) + ", 0.9)",
    display: "inline-flex",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingTop: "39px",
    marginBottom: "16px",
    marginRight: "0",
    textDecoration: "underline",
    "@media (min-width: 992px)": {
      float: "left"
    }
  },
  viewText: {
    display: "inline-flex",
    paddingTop: "8px",
    "@media (min-width: 992px)": {
      float: "left"
    }
  },
  viewTextLink: {
    display: "inline-flex",
    textDecoration: "underline",
    paddingTop: "8px",
    "@media (min-width: 992px)": {
      float: "left"
    }
  },
  errorText: {
    display: "inline-flex",
    color: "rgba(" + dangerColor + ", 0.9)",
    paddingTop: "10px",
    paddingLeft: "10px",
    "@media (min-width: 992px)": {
      float: "left"
    }
  },
  left: {
    float: "left"
  },
  right: {
    float: "right"
  }
};

export default eventFormStyle;
