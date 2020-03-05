import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  grayColor
} from "../../../_rootAsset/jss/material-dashboard-react";

const cardIconStyle = {
  cardIcon: {
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
      borderRadius: "3px",
      backgroundColor: grayColor,
      padding: "15px",
      marginTop: "-20px",
      marginRight: "15px",
      float: "left"
    }
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader
};

export default cardIconStyle;
