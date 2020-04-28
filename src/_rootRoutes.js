// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import Event from "@material-ui/icons/Event";
// Views
import LoginView from "./System/Authentication/LoginView";
import DashboardView from "./General/DashboardView";

import { generalModuleColor } from "./_rootAsset/jss/material-dashboard-react";

const useRouteApi = () => {
  const sidebarRoutes = [
    {
      path: "/General/Dashboard",
      name: "Dashboard",
      icon: Apps,
      moduleColor: generalModuleColor,
      component: DashboardView,
      layout: "/main"
    },
    {
      path: "/Events/ListEvents",
      name: "List Events",
      icon: Event,
      moduleColor: generalModuleColor,
      component: DashboardView,
      layout: "/main"
    }
  ];

  const systemRoutes = [
    {
      path: "/login-page",
      name: "Login Page",
      component: LoginView,
      layout: "/auth",
      invisible: true
    },
    {
      path: "/logout-page",
      name: "Login Page",
      component: LoginView,
      layout: "/auth",
      invisible: true
    }
  ];

  let allRoutes = [...systemRoutes, ...sidebarRoutes];

  return { allRoutes };
};
export default useRouteApi;
