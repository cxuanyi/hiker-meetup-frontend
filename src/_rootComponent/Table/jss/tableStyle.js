import {
  grayColor,
  defaultFont,
  alternateHeaderRowColor,
  alternateTableRowColor
} from "../../../_rootAsset/jss/material-dashboard-react";

const tableStyle = () => ({
  right: {
    textAlign: "right"
  },
  table: {
    width: "100%",
    backgroundColor: "transparent",
    borderStyle: "solid",
    border: "1px",
    borderColor: grayColor
  },
  tableHeadFontSize: {
    fontSize: "14px !important",
    fontWeight: "400 !important"
  },
  tableHeadCell: {
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
  }
});

export default tableStyle;
