import customDropdownStyle from "../../../_rootComponent/CustomDropdown/jss/customDropdownStyle";

const adminNavbarLinksStyle = () => ({
  ...customDropdownStyle(),
  headerLinksSvg: {
    width: "27px !important",
    height: "27px !important"
  }
});

export default adminNavbarLinksStyle;
