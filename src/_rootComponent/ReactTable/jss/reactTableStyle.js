import {
  grayColor,
  defaultFont,
  alternateHeaderRowColor,
  alternateTableRowColor
} from "../../../_rootAsset/jss/material-dashboard-react";

const reactTableStyle = {
  outer: {
    display: "block",
    maxWidth: "100%"
  },
  tableWrap: {
    display: "block",
    maxWidth: "100%",
    overflowX: "scroll",
    overflowY: "hidden",
    borderBottom: "1px solid black"
  },
  pagination: {
    paddingTop: "50px"
  },
  pagingButtons: {
    verticalAlign: "middle",
    float: "left!important"
  },
  pagingText: {
    display: "inline-block",
    verticalAlign: "middle",
    float: "right!important",
    paddingTop: "10px",
    paddingRight: "5px"
  },
  pagingInput: {
    display: "inline-block",
    verticalAlign: "middle",
    float: "right!important",
    paddingTop: "3px"
  },
  right: {
    textAlign: "right",
    paddingRight: "10px"
  },
  center: {
    textAlign: "center"
  },
  left: {
    textAlign: "left",
    paddingLeft: "10px"
  },
  table: {
    width: "100%",
    backgroundColor: "transparent",
    borderStyle: "solid",
    border: "1px",
    borderColor: grayColor
  },
  tableHeadFontSize: {
    fontSize: "16px !important",
    fontWeight: "400 !important"
  },
  tableRowHead: {
    color: grayColor,
    backgroundColor: alternateHeaderRowColor
  },
  tableCell: {
    ...defaultFont,
    padding: "8px 8px!important",
    verticalAlign: "middle",
    fontSize: "14px",
    borderBottom: "none"
  },
  tableStripedRow: {
    backgroundColor: alternateTableRowColor
  },
  noRecordsFound: {
    padding: "20px",
    width: "100%",
    fontSize: "14px",
    textAlign: "center"
  }
};
export default reactTableStyle;
