"use client";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { User } from "next-auth";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import Menu from "@/components/Menu";
import RentModal from "../modals/RentModal";
import Modal from "../modals/Modal";
import AuthModal from "../modals/AuthModal";
import ThemeToggle from "../ThemeToggle";
import { menuItems } from "@/utils/constants";

interface UserMenuProps {
  user?: User;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const router = useRouter();

  const redirect = (url: string) => {
    router.push(url);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <ThemeToggle className="hidden md:block" />
        <Modal>
          <Modal.Trigger name={user ? "share" : "Login"}>
            <button
              type="button"
              className="hidden md:block text-sm font-semibold py-2.5 px-4 rounded-full hover:bg-slate-100 dark:hover:bg-dark-card transition-colors duration-200 cursor-pointer text-slate-700 dark:text-slate-200"
            >
              Share your home
            </button>
          </Modal.Trigger>
          <Menu>
            <Menu.Toggle id="user-menu">
              <button
                type="button"
                className="p-3 md:py-1.5 md:px-2.5 border border-slate-200 dark:border-dark-border flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition-all duration-200 bg-white dark:bg-dark-card"
              >
                <AiOutlineMenu className="text-slate-700 dark:text-slate-200" />
                <div className="hidden md:block">
                  <Avatar src={user?.image} />
                </div>
              </button>
            </Menu.Toggle>
            <Menu.List className="shadow-[0_0_36px_4px_rgba(0,0,0,0.12)] dark:shadow-[0_0_36px_4px_rgba(0,0,0,0.4)] rounded-xl bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border text-sm overflow-hidden">
              {user ? (
                <>
                  {menuItems.map((item) => (
                    <MenuItem
                      label={item.label}
                      onClick={() => redirect(item.path)}
                      key={item.label}
                    />
                  ))}
                  <Modal.Trigger name="share">
                    <MenuItem label="Share your home" />
                  </Modal.Trigger>
                  <div className="flex items-center justify-between px-4 py-2 md:hidden">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Dark mode</span>
                    <ThemeToggle />
                  </div>
                  <hr className="border-slate-100 dark:border-dark-border" />
                  <MenuItem label="Log out" onClick={signOut} />
                </>
              ) : (
                <>
                  <Modal.Trigger name="Login">
                    <MenuItem label="Log in" />
                  </Modal.Trigger>
                  <Modal.Trigger name="Sign up">
                    <MenuItem label="Sign up" />
                  </Modal.Trigger>
                  <div className="flex items-center justify-between px-4 py-2 md:hidden">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Dark mode</span>
                    <ThemeToggle />
                  </div>
                </>
              )}
            </Menu.List>
          </Menu>
          <Modal.Window name="Login">
            <AuthModal name="Login" />
          </Modal.Window>
          <Modal.Window name="Sign up">
            <AuthModal name="Sign up" />
          </Modal.Window>
          <Modal.Window name="share">
            <RentModal />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
};

export default UserMenu;
