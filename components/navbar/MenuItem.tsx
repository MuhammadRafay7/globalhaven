"use client";
import React, { FC } from "react";
import Menu from "../Menu";

interface MenuItemProps {
  onClick?: () => void;
  label: string;
}

export const MenuItemStyle =
  "hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150 font-semibold select-none text-slate-700 dark:text-slate-200";

const MenuItem: FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <Menu.Button className={MenuItemStyle} onClick={onClick}>
      {label}
    </Menu.Button>
  );
};

export default MenuItem;
