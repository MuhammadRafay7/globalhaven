import React, { Suspense } from "react";
import Logo from "./Logo";
import Search from "./Search";
import Categories from "./Categories";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/services/user";

const Navbar: React.FC = async () => {
  const user = await getCurrentUser();

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md z-10 border-b border-slate-100 dark:border-dark-border transition-colors duration-300">
      <nav className="py-3">
        <div className="flex main-container flex-row justify-between items-center gap-3 md:gap-0">
          <Logo />
          <Suspense fallback={<></>}>
            <Search />
          </Suspense>
          <UserMenu user={user} />
        </div>
      </nav>
      <Categories />
    </header>
  );
};

export default Navbar;
