import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";
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
    name: "NFT Marketplace",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: MdOutlineShoppingCart,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: MdBarChart,
    path: "/data-tables",
    
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: MdPerson,
    
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/login",
    icon: MdLock,
    
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: MdHome,
    
  },
];

export default routes;
