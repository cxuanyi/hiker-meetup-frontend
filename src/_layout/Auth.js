import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import AuthNavbar from "./_subComponent/AuthNavbar";
import Footer from "./_subComponent/Footer";
// styles
import styles from "./_subAsset/jss/authStyle";
// others
import useRouteApi from "../_rootRoutes";

const useStyles = makeStyles(styles);

export default function Pages(props) {
  const { ...rest } = props;
  // ref for the wrapper div
  const wrapper = React.createRef();
  // styles
  const classes = useStyles();
  // loading routes
  const { allRoutes } = useRouteApi();
  const routes = allRoutes;

  React.useEffect(() => {
    document.body.style.overflow = "unset";
  });
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
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
  const getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  return (
    <div>
      <AuthNavbar brandText={getActiveRoute(routes)} {...rest} />
      <div className={classes.wrapper} ref={wrapper}>
        <div className={classes.fullPage}>
          <Switch>
            {getRoutes(routes)}
            <Redirect from="/auth" to="/auth/login-page" />
          </Switch>
          <Footer showDivider={false} />
        </div>
      </div>
    </div>
  );
}
