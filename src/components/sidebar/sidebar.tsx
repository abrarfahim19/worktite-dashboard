"use client";

import { Icons } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const isActiveLink = (currentPath: string, menuPath: string) => {
  if (currentPath === "/dashboard") {
    return true;
  } else if (currentPath.startsWith(menuPath)) {
    return true;
  } else return false;
};

const SideBarBottomMenus = [
  {
    activeIcon: <Icons.messageActive className="h-4 w-4" />,
    inactiveIcon: <Icons.messageInactive className="h-4 w-4" />,
    name: "message",
    path: "/dashboard/message",
    badge: 15,
  },
  {
    activeIcon: <Icons.settingsActive color="red" className="h-4 w-4" />,
    inactiveIcon: <Icons.settingsInactive className="h-4 w-4" />,
    name: "Settings",
    path: "/dashboard/settings",
  },
  {
    activeIcon: <Icons.logoutActive className="h-4 w-4" />,
    inactiveIcon: <Icons.logoutInactive className="h-4 w-4" />,
    name: "Logout",
    path: "/logout",
  },
];

const SideBarTopMenus = [
  {
    activeIcon: <Icons.dashboardActive className="h-4 w-4" />,
    inactiveIcon: <Icons.dashboardInactive className="h-4 w-4" />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    activeIcon: <Icons.designActive color="red" className="h-4 w-4" />,
    inactiveIcon: <Icons.designInactive className="h-4 w-4" />,
    name: "Worktite design",
    path: "/dashboard/designs",
  },
  {
    activeIcon: <Icons.projectActive className="h-4 w-4" />,
    inactiveIcon: <Icons.projectInactive className="h-4 w-4" />,
    name: "Project",
    path: "/dashboard/project",
    badge: 5,
  },
  {
    activeIcon: <Icons.appointementActive className="h-4 w-4" />,
    inactiveIcon: <Icons.appointmentInactive className="h-4 w-4" />,
    name: "Appointment",
    path: "/dashboard/appointment",
  },
  {
    activeIcon: <Icons.calenderActive className="h-4 w-4" />,
    inactiveIcon: <Icons.calenderInactive className="h-4 w-4" />,
    name: "Calender",
    path: "/dashboard/calender",
  },
  {
    activeIcon: <Icons.ourClientActive className="h-4 w-4" />,
    inactiveIcon: <Icons.ourClientInactive className="h-4 w-4" />,
    name: "Our Client",
    path: "/dashboard/clients",
  },
];

export const Sidebar = () => {
  const pathName = usePathname();

  console.log("Path name", pathName);
  return (
    <div className="h-screen w-72 bg-softDark">
      <div className="flex items-center justify-center py-10">
        <Image src="/logo.svg" alt="logo" width={70} height={70} />
      </div>
      <div className="flex flex-col gap-40 bg-softDark pb-10">
        <div className="">
          <ul>
            {SideBarTopMenus.map((menu, index) => {
              console.log(
                "Path Name is: ",
                pathName,
                "Menu Path is:",
                menu.path,
              );
              return (
                <li key={index} className="">
                  <Link href={menu.path}>
                    <SideButton
                      active={isActiveLink(pathName, menu.path)}
                      activeIcon={menu.activeIcon}
                      inactiveIcon={menu.inactiveIcon}
                      badge={menu.badge && menu.badge}
                    >
                      {menu.name}
                    </SideButton>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="">
          <ul>
            {SideBarBottomMenus.map((menu, index) => {
              return (
                <li key={index} className="">
                  <Link href={menu.path}>
                    <SideButton
                      active={pathName === menu.path}
                      activeIcon={menu.activeIcon}
                      inactiveIcon={menu.inactiveIcon}
                      badge={menu.badge && menu.badge}
                    >
                      {menu.name}
                    </SideButton>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const SideButton = ({
  activeIcon,
  inactiveIcon,
  children,
  active,
  badge,
}: {
  activeIcon: React.ReactElement;
  inactiveIcon: React.ReactElement;
  children: React.ReactNode;
  active: boolean;
  badge?: number;
}) => {
  return (
    <Button
      className={` w-full items-center justify-between rounded-none ${active ? "bg-white text-brand hover:bg-white" : "bg-softDark text-white"}  font-semibold `}
    >
      <div
        className={`flex items-center gap-2 border-l-2 pl-2 ${active ? "border-brand" : "border-softDark"}`}
      >
        {!active ? inactiveIcon : activeIcon}
        {children}
      </div>
      {badge && <Badge>{badge}</Badge>}
    </Button>
  );
};
