import React from "react";
import classNames from "classnames";
import { Auth } from "aws-amplify";

// react additional components
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";

// @material-ui/icons
import Person from "@material-ui/icons/Person";

// core components
import Button from "../../_rootComponent/CustomButtons/Button";

// styles for this view
import adminNavBarStyle from "../_subAsset/jss/adminNavbarLinksStyle";
import sweetAlertStyle from "../../_rootComponent/CustomAlert/jss/sweetAlertStyle";

// others
import { UserContext } from "../../_rootContext/UserContext";
import { userInContextLogoutTemplate } from "../../_helper/objTemplate";

const useAdminNavBarStyle = makeStyles(adminNavBarStyle);
const useSweetAlertStyle = makeStyles(sweetAlertStyle);

export default function HeaderLinks() {
  const { setUserInContext } = React.useContext(UserContext);
  const [openProfile, setOpenProfile] = React.useState(null);
  const [alert, setAlert] = React.useState(null);
  const classes = { ...useAdminNavBarStyle(), ...useSweetAlertStyle() };
  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);
  const managerClasses = classNames({
    [classes.managerClasses]: true
  });

  const logoutAlert = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-200px" }}
        title="Exit application, you sure?"
        onConfirm={() => {
          hideAlert();
          setOpenProfile(null);
          Auth.signOut();
          localStorage.clear();
          setUserInContext(userInContextLogoutTemplate);
        }}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnText="Yes, exit application!"
        cancelBtnText="Cancel"
        showCancel
      >
        No worries, you can always login again.
      </SweetAlert>
    );
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  return (
    <div>
      {alert}
      <div className={managerClasses}>
        <Button
          color="transparent"
          aria-label="Person"
          justIcon
          aria-owns={openProfile ? "profile-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
          muiClasses={{ label: "" }}
        >
          <Person className={classes.headerLinksSvg + " " + classes.links} />
          <Hidden mdUp implementation="css">
            <span onClick={handleClickProfile} className={classes.linkText}>
              {"Profile"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openProfile,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem onClick={logoutAlert} className={dropdownItem}>
                      {"Log out"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

HeaderLinks.propTypes = {};
