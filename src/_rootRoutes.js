// @material-ui/icons
import Build from "@material-ui/icons/Build";
import Create from "@material-ui/icons/Create";
import Memory from "@material-ui/icons/Memory";
import BarChart from "@material-ui/icons/BarChart";
import DragIndicator from "@material-ui/icons/DragIndicator";
// Custom routes
import { generalModuleRoutes } from "./General/routes";
// Views
import LoginView from "./System/Authentication/LoginView";
import ReadLoginView from "./System/Authentication/ReadLoginView";

import {
  SYSTEM_MODULE,
  MISCELLANEOUS_MODULE,
  REPORTS_MODULE,
  PARTS_MASTER_DATA_MODULE,
  ORDER_PROCESSING_MODULE,
  TROUBLESHOOTING_MODULE
} from "./_helper/accessControl";

const useRouteApi = userInContext => {
  const sidebarRoutes = [
    ...generalModuleRoutes,
    {
      collapse: true,
      name: "Troubleshooting",
      moduleName: TROUBLESHOOTING_MODULE,
      icon: Build,
      state: "componentsCollapse",
      views: []
    },
    {
      collapse: true,
      name: "Order Processing",
      moduleName: ORDER_PROCESSING_MODULE,
      icon: Create,
      state: "formsCollapse",
      views: []
    },
    {
      collapse: true,
      name: "Parts Master Data",
      moduleName: PARTS_MASTER_DATA_MODULE,
      icon: Memory,
      state: "tablesCollapse",
      views: []
    },
    {
      collapse: true,
      name: "Reports",
      moduleName: REPORTS_MODULE,
      icon: BarChart,
      state: "mapsCollapse",
      views: []
    },
    {
      collapse: true,
      name: "Miscellaneous",
      moduleName: MISCELLANEOUS_MODULE,
      icon: DragIndicator,
      state: "mapsCollapse",
      views: []
    }
  ];

  const systemRoutes = [
    {
      path: "/login-page",
      name: "Login Page",
      moduleName: SYSTEM_MODULE,
      component: LoginView,
      layout: "/auth",
      invisible: true
    },
    {
      path: "/read-login",
      name: "Login Page",
      moduleName: SYSTEM_MODULE,
      component: ReadLoginView,
      layout: "/auth",
      invisible: true
    }
  ];

  let allRoutes = userInContext
    ? [...systemRoutes, ...sidebarRoutes]
    : systemRoutes; //Params Routes must be in front+

  if (userInContext) {
    const topLevelFilteredRoutes = allRoutes.filter(route => {
      return Object.keys(userInContext.acl).includes(route.moduleName);
    });
    const aclAllowedViewsTemp = Object.keys(userInContext.acl).map(i =>
      Object.keys(userInContext.acl[i])
    );
    let aclAllowedViews = [];
    aclAllowedViewsTemp.forEach(
      arrayViews => (aclAllowedViews = [...aclAllowedViews, ...arrayViews])
    );

    const secondLevelFilteredRoutes = topLevelFilteredRoutes.filter(route => {
      if (route.views) {
        const filterModuleViews = route.views.filter(view => {
          return aclAllowedViews.includes(view.path);
        });
        route.views = [...filterModuleViews];
        return true;
      }

      if (route.path) {
        if (route.path.includes(":")) return true;
      }
      return false;
    });

    allRoutes = [...secondLevelFilteredRoutes];
  }

  return { allRoutes };
};
export default useRouteApi;
