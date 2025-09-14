import { useState } from "react";
import { NavLink } from "react-router";
import { AnimatePresence, motion } from "motion/react";

import { useMediaQuery } from "../hooks/useMediaQuery";

import Button from "./Button";

const navLinks = [
  { name: "Home", path: "/" },
  {
    name: "Practice",
    path: "/practice",
  } /* Will add dropdown later (Practice-questions & Mock Test) */,
  {
    name: "Resources",
    path: "/resources",
  } /* Will add dropdown later (Books, Articles, Videos) */,
  // { name: "Tips and Strategies", path: "/tips-and-strategies" },
  { name: "About", path: "/about" },
];

interface MenuListProps {
  isNavOpen: boolean;
  isTablet: boolean;
  handleMenuItemClick: () => void;
}

const MenuList = ({
  isNavOpen,
  isTablet,
  handleMenuItemClick,
}: MenuListProps) => (
  <AnimatePresence>
    {isNavOpen && !isTablet && (
      <motion.ul
        className="header__nav--menu flex flex-col"
        role="menu"
        id="menu"
        initial={{ top: 0, right: "-100%" }}
        animate={{ top: 0, right: 0 }}
        exit={{ top: 0, right: "-100%" }}
      >
        {navLinks.map((link) => (
          <li
            key={link.path}
            className="header__nav--menu__item p-1"
            role="menuitem"
            onClick={handleMenuItemClick}
          >
            <NavLink to={link.path} className="header__nav--menu__link fw-bold">
              {link.name}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    )}
  </AnimatePresence>
);

const NavList = () => (
  <ul
    className="header__nav--list flex gap-3"
    role="navigation"
    id="navigation-list"
  >
    {navLinks.map((link) => (
      <li key={link.path} className="header__nav--list__item" role="listitem">
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            `header__nav--list__link${isActive ? " active" : ""}`
          }
        >
          {link.name}
        </NavLink>
      </li>
    ))}
  </ul>
);

const Header = () => {
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
    <header className="header p-block-3" role="banner">
      <div className="container flex ai-center jc-between">
        <div
          className="header__logo p-block-1 p-inline-3 fw-bold clr-neutral-700"
          role="logo"
        >
          The Scientific Officer
        </div>

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
      </div>
    </header>
  );
};

export default Header;
