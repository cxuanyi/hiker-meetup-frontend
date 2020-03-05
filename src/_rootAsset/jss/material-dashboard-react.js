/*!

=========================================================
* Material Dashboard PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// ##############################
// // // Function that converts from hex color to rgb color
// // // Example: input = #9c27b0 => output = 156, 39, 176
// // // Example: input = 9c27b0 => output = 156, 39, 176
// // // Example: input = #999 => output = 153, 153, 153
// // // Example: input = 999 => output = 153, 153, 153
// #############################
const hexToRgb = input => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

const drawerWidth = 260;

const container = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  "@media (min-width: 768px)": {
    width: "750px"
  },
  "@media (min-width: 992px)": {
    width: "970px"
  },
  "@media (min-width: 1200px)": {
    width: "1170px"
  },
  "&:before,&:after": {
    display: "table",
    content: '" "'
  },
  "&:after": {
    clear: "both"
  }
};

const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: "300",
  lineHeight: "1.5em"
};

const defaultColor = "#757575";
const primaryColor = "#004F9A";
const warningColor = "#ff9800";
const dangerColor = "#f44336";
const successColor = "#4caf50";
const infoColor = "#00acc1";
const grayColor = "#4b4b4b";
const corporateColor = "#fced0c";
const blackColor = "#000";
const whiteColor = "#FFF";
const alternateBgColor = "#eff7ff";
const informativeBgColor = "#fff6eb";
const alternateHeaderRowColor = "#e8e8e8";
const alternateTableRowColor = "#f8f8f8";

const generalModuleColor = "#8CC152";
const orfModuleColor = "#004F9A";

const warningCardHeader = {
  background:
    "linear-gradient(60deg, " + warningColor + ", " + warningColor + ")"
};
const successCardHeader = {
  background:
    "linear-gradient(60deg, " + successColor + ", " + successColor + ")"
};
const dangerCardHeader = {
  background: "linear-gradient(60deg, " + dangerColor + ", " + dangerColor + ")"
};
const infoCardHeader = {
  background: "linear-gradient(60deg, " + infoColor + ", " + infoColor + ")"
};
const primaryCardHeader = {
  background:
    "linear-gradient(60deg, " + primaryColor + ", " + primaryColor + ")"
};
const title = {
  color: grayColor,
  textDecoration: "none",
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
};
export {
  hexToRgb,
  drawerWidth,
  container,
  defaultFont,
  defaultColor,
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  grayColor,
  blackColor,
  whiteColor,
  corporateColor,
  alternateBgColor,
  informativeBgColor,
  generalModuleColor,
  orfModuleColor,
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  title,
  alternateHeaderRowColor,
  alternateTableRowColor
};
