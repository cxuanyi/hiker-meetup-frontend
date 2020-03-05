import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  whiteColor
} from "../../../_rootAsset/jss/material-dashboard-react";

const cardHeaderStyle = {
  cardHeader: {
    padding: "0.75rem 1.25rem",
    marginBottom: "0",
    borderBottom: "none",
    background: "transparent",
    zIndex: "3 !important",
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
      margin: "0 15px",
      padding: "0",
      position: "relative",
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        borderRadius: "3px",
        marginTop: "-20px",
        padding: "15px"
      }
    },
    "&$cardHeaderText": {
      display: "inline-block"
    }
  },
  cardHeaderIcon: {
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
      background: "transparent",
      boxShadow: "none"
    },
    "& material-icons": {
      width: "33px",
      height: "33px",
      textAlign: "center",
      lineHeight: "33px"
    },
    "& svg": {
      width: "24px",
      height: "24px",
      textAlign: "center",
      lineHeight: "33px",
      margin: "5px 4px 0px"
    }
  },
  warningCardHeader: {
    color: whiteColor,
    "&:not($cardHeaderText):not($cardHeaderIcon)": {
      ...warningCardHeader
    }
  },
  successCardHeader: {
    color: whiteColor,
    "&:not($cardHeaderText):not($cardHeaderIcon)": {
      ...successCardHeader
    }
  },
  dangerCardHeader: {
    color: whiteColor,
    "&:not($cardHeaderText):not($cardHeaderIcon)": {
      ...dangerCardHeader
    }
  },
  infoCardHeader: {
    color: whiteColor,
    "&:not($cardHeaderText):not($cardHeaderIcon)": {
      ...infoCardHeader
    }
  },
  primaryCardHeader: {
    color: whiteColor,
    "&:not($cardHeaderText):not($cardHeaderIcon)": {
      ...primaryCardHeader
    }
  }
};

export default cardHeaderStyle;
