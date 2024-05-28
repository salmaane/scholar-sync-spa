import { MdHome} from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import Dashboard from "../pages/Dashboard/Dashboard";
import { IconType } from "react-icons/lib";
import { FaBookBookmark} from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaWarehouse } from "react-icons/fa6";
import { IoGitBranch } from "react-icons/io5";
import { PiExamBold } from "react-icons/pi";
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
    path: "/user",
    icon: HiMiniUsers,
  },
  {
    name: "Subjects",
    layout: "/admin",
    path: "/subject",
    icon: FaBookBookmark,
  },
  {
    name: "Exams",
    layout: "/admin",
    path: "/exam",
    icon: PiExamBold,
  },
  {
    name: "Classes",
    layout: "/admin",
    path: "/class",
    icon: SiGoogleclassroom,
  },
  {
    name: "Groups",
    layout: "/admin",
    path: "/group",
    icon: FaPeopleGroup,
  },
  {
    name: "Departments",
    layout: "/admin",
    path: "/department",
    icon: FaWarehouse,
  },
  {
    name: "Sectors",
    layout: "/admin",
    path: "/sector",
    icon: IoGitBranch,
  },
];

export default routes;
