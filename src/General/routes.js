import Apps from "@material-ui/icons/Apps";
import { generalModuleColor } from "../_rootAsset/jss/material-dashboard-react";
import DashboardView from "./DashboardView";

import { GENERAL_MODULE } from "../_helper/accessControl";

export const generalModuleRoutes = [
  {
    collapse: true,
    name: "General",
    moduleName: GENERAL_MODULE,
    icon: Apps,
    component: DashboardView,
    views: [
      {
        path: "/General/Dashboard",
        name: "Dashboard",
        moduleName: GENERAL_MODULE,
        moduleIcon: Apps,
        moduleColor: generalModuleColor,
        component: DashboardView,
        layout: "/main"
      }
    ]
  }
];
