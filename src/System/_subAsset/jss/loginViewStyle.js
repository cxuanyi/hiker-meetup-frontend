import {
  container,
  whiteColor,
  grayColor
} from "../../../_rootAsset/jss/material-dashboard-react";

const loginPageStyle = () => ({
  container: {
    ...container,
    zIndex: "4"
  },
  cardTitle: {
    color: whiteColor,
    display: "inline-block",
    paddingLeft: "10px"
  },
  textCenter: {
    textAlign: "center"
  },
  justifyContentCenter: {
    justifyContent: "center !important"
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: whiteColor
    },
    marginLeft: "5px",
    marginRight: "5px"
  },
  inputAdornment: {
    marginRight: "18px"
  },
  inputAdornmentIcon: {
    color: grayColor
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardHeader: {
    marginBottom: "20px"
  },
  socialLine: {
    padding: "0.9375rem 0"
  },
  icon: {
    display: "inline",
    marginLeft: "5px",
    marginRight: "5px"
  },
  icon2: {
    display: "inline",
    marginLeft: "5px",
    marginRight: "5px",
    color: "#4caf50"
  },
  error: {
    color: "black"
  },
  img: {
    width: "25px",
    verticalAlign: "middle",
    border: "0",
    paddingBottom: "5px"
  }
});

export default loginPageStyle;
