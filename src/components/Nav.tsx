import { useState } from "react";

import { useMediaQuery } from "../hooks/useMediaQuery";

import Button from "./Button";
import { MenuList, NavList } from "./NavLists";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const isTablet: boolean = useMediaQuery({ breakpoint: "md" });

  const toggleNavMenu = () => {
    setIsNavOpen(!isNavOpen);

    const overlay = document.getElementById("overlay")!;

    if (!isNavOpen) {
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";
    } else {
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };

  return (
    <nav className="header__nav flex ai-center gap-5" role="navigation">
      <button
        className="header__nav--toggle__button grid p-1"
        aria-label="Toggle navigation menu"
        aria-expanded={isNavOpen}
        aria-controls="navigation-list"
        onClick={toggleNavMenu}
      >
        <span className="material-symbols-outlined">
          {isNavOpen ? "close" : "menu"}
        </span>
      </button>

      <MenuList
        isNavOpen={isNavOpen}
        isTablet={isTablet}
        handleMenuItemClick={toggleNavMenu}
      />

      {isTablet && <NavList />}

      {isTablet && <Button />}
    </nav>
  );
};
export default Nav;
