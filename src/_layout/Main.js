import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import AdminNavbar from "./_subComponent/AdminNavbar";
import Footer from "./_subComponent/Footer";
import Sidebar from "./_subComponent/Sidebar";
// styles
import adminStyles from "./_subAsset/jss/adminStyle";
import sweetAlertStyle from "../_rootComponent/CustomAlert/jss/sweetAlertStyle";
// others
import { UserContext } from "../_rootContext/UserContext";
import useRouteApi from "../_rootRoutes";

const useAdminStyles = makeStyles(adminStyles);
const useSweetAlertStyle = makeStyles(sweetAlertStyle);

const Main = props => {
  const { ...rest } = props;
  const classes = { ...useAdminStyles(), ...useSweetAlertStyle() };
  // states and functions
  const { userInContext } = React.useContext(UserContext);
  // styles
  const logo = require("../_rootAsset/img/logo.png");
  // loading routes
  const { allRoutes } = useRouteApi(userInContext);
  const routes = allRoutes;
  // ref for main panel div
  const mainPanel = React.createRef();

  const getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        let routeToCheck = routes[i].layout + routes[i].path;
        routeToCheck =
          routeToCheck.indexOf("/:") > -1
            ? routeToCheck.substring(0, routeToCheck.indexOf("/:"))
            : routeToCheck;

        if (window.location.href.indexOf(routeToCheck) !== -1) {
          return routes[i];
        }
      }
    }
    return activeRoute;
  };
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/main") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const activeRoute = getActiveRoute(routes);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        userInContext={userInContext}
        logo={logo}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <AdminNavbar
          ModuleIcon={activeRoute.moduleIcon}
          ModuleColor={activeRoute.moduleColor}
          pageTitle={`${activeRoute.moduleName}: ${activeRoute.name}`}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="/main" to="/main/General/Dashboard" />
            </Switch>
          </div>
        </div>
        <Footer showDivider={true} fluid />
      </div>
    </div>
  );
};

export default Main;
