import { MdHome} from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import Dashboard from "../pages/Dashboard/Dashboard";
import { IconType } from "react-icons/lib";
import { ComponentType} from "react";

type route = {
    name: string,
    layout: string,
    path: string,
    icon?: IconType,
    component?: ComponentType
}

const routes : route[] = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/",
    icon: MdHome,
    component: Dashboard
  },
  {
    name: "Users",
    layout: "/admin",
    path: "/users",
    icon: HiMiniUsers,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: MdHome,
  },
];

export default routes;
