import {
  drawerWidth,
  whiteColor
} from "../../../_rootAsset/jss/material-dashboard-react";

const appStyle = () => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
    "&:after": {
      display: "table",
      clear: "both",
      content: '" "'
    }
  },
  mainPanel: {
    width: `calc(100% - ${drawerWidth}px)`,
    overflow: "auto",
    position: "relative",
    float: "right",
    maxHeight: "100%",
    overflowScrolling: "touch",
    background: whiteColor
  },
  content: {
    marginTop: "58px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  }
});

export default appStyle;
