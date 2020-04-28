import React from "react";
import PropTypes from "prop-types";
// javascript plugin used to create scrollbars on windows
import { NavLink } from "react-router-dom";
import cx from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";
import { Divider } from "@material-ui/core";
import SubdirectoryArrowRight from "@material-ui/icons/SubdirectoryArrowRight";
// styles
import sidebarStyle from "../_subAsset/jss/sidebarStyle.js";
// others
import { getEpochToDisplayDate } from "../../_helper/date";

import { Link } from "react-router-dom";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getCollapseStates(props.routes)
    };
  }
  mainPanel = React.createRef();
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {};
    routes.map(prop => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? "active" : "";
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    const { classes } = this.props;

    return routes.map((prop, key) => {
      if (prop.redirect) return null;
      if (prop.collapse) {
        let st = {};
        st[prop["state"]] = !this.state[prop.state];
        const navLinkClasses =
          classes.itemLink +
          " " +
          cx({
            [" " + classes.collapseActive]: this.getCollapseInitialState(
              prop.views
            )
          });
        const itemText = classes.itemText;
        const collapseItemText = classes.collapseItemText;
        const itemIcon = classes.itemIcon;
        const caret = classes.caret;
        return (
          <ListItem
            key={key}
            className={cx(
              { [classes.item]: prop.icon !== undefined },
              { [classes.collapseItem]: prop.icon === undefined }
            )}
          >
            <NavLink
              to={"#"}
              className={navLinkClasses}
              onClick={e => {
                e.preventDefault();
                this.setState(st);
              }}
            >
              <prop.icon className={itemIcon} />
              <ListItemText
                primary={prop.name}
                secondary={
                  <b
                    className={
                      caret +
                      " " +
                      (this.state[prop.state] ? classes.caretActive : "")
                    }
                  />
                }
                disableTypography={true}
                className={cx(
                  { [itemText]: prop.icon !== undefined },
                  { [collapseItemText]: prop.icon === undefined }
                )}
              />
            </NavLink>
            <Collapse in={this.state[prop.state]} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}>
                {this.createLinks(prop.views)}
              </List>
            </Collapse>
          </ListItem>
        );
      }
      if (prop.invisible) return null;

      const innerNavLinkClasses =
        classes.collapseItemLink +
        " " +
        cx({
          [" " + classes["blue"]]: this.activeRoute(prop.path)
        });
      const navLinkClasses =
        classes.itemLink +
        " " +
        cx({
          [" " + classes["blue"]]: this.activeRoute(prop.path)
        });
      const itemText = classes.itemText;
      const itemIcon = classes.itemIcon;
      return (
        <ListItem
          key={key}
          className={cx(
            { [classes.item]: prop.icon !== undefined },
            { [classes.collapseItem]: prop.icon === undefined }
          )}
        >
          <NavLink
            to={prop.layout + prop.path}
            className={cx(
              { [navLinkClasses]: prop.icon !== undefined },
              { [innerNavLinkClasses]: prop.icon === undefined }
            )}
          >
            {prop.icon !== undefined ? (
              typeof prop.icon === "string" ? (
                <Icon className={itemIcon}>{prop.icon}</Icon>
              ) : (
                <prop.icon className={itemIcon} />
              )
            ) : (
              <span className={classes.collapseItemMini}>
                <SubdirectoryArrowRight />
              </span>
            )}
            <ListItemText
              primary={prop.name}
              disableTypography={true}
              className={cx({ [itemText]: prop.icon !== undefined })}
            />
          </NavLink>
        </ListItem>
      );
    });
  };
  render() {
    const { classes, routes, logo } = this.props;
    const { userInContext } = this.props;

    return (
      <div ref={this.mainPanel}>
        <Drawer anchor="left" variant="permanent">
          <div className={classes.sidebarWrapper}>
            <div className={classes.logo}>
              <Link to="/main/ORFManagement/FZ2PMSReadList">
                <img src={logo} alt="logo" className={classes.img} />
              </Link>
              <Link
                className={classes.logoNormal}
                to="/main/ORFManagement/FZ2PMSReadList"
              >
                Hikers' Meet-Up
              </Link>
            </div>
            <Divider />
            <div className={classes.user}>
              <p className={classes.greeting}>
                Hello, {userInContext.user.given_name}.
              </p>
              <p className={classes.userSessionInfo}>
                Logged in: {getEpochToDisplayDate(userInContext.iat)}
                <br />
                Sess. ends: {getEpochToDisplayDate(userInContext.exp)}
              </p>
            </div>
            <Divider />
            <List className={classes.list}>{this.createLinks(routes)}</List>
          </div>
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  userInContext: PropTypes.object,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.string
};
export default withStyles(sidebarStyle)(Sidebar);
