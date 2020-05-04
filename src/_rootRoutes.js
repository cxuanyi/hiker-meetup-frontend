// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import Event from "@material-ui/icons/Event";
// Views
import LoginView from "./System/Authentication/LoginView";
import DashboardView from "./General/DashboardView";
import EventReadListView from "./Event/EventReadListView";
import EventReadSingleView from "./Event/EventReadSingleView";

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
      path: "/Events/ListEvents/:eventId",
      name: "List Events",
      icon: Event,
      moduleColor: generalModuleColor,
      component: EventReadListView,
      layout: "/main",
      invisible: true
    },
    {
      path: "/Events/ListEvents",
      name: "List Events",
      icon: Event,
      moduleColor: generalModuleColor,
      component: EventReadListView,
      layout: "/main"
    },
    {
      path: "/Events/ViewEvent/:eventId",
      name: "View Event",
      icon: Event,
      moduleColor: generalModuleColor,
      component: EventReadSingleView,
      layout: "/main",
      invisible: true
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
