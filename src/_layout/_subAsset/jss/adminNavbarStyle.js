import {
  whiteColor,
  grayColor,
  title
} from "../../../_rootAsset/jss/material-dashboard-react";

const headerStyle = () => ({
  appBar: {
    backgroundColor: whiteColor,
    boxShadow: "none",
    position: "absolute",
    width: "100%",
    zIndex: "1029",
    color: grayColor,
    display: "block"
  },
  container: {
    minHeight: "70px"
  },
  titleWrapper: {
    flex: 1
  },
  title: {
    ...title,
    fontSize: "28px",
    fontWeight: "300",
    paddingTop: "20px",
    paddingLeft: "10px",
    display: "inline"
  }
});

export default headerStyle;
