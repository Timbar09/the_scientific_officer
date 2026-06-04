import { useState } from "react";

import { useMediaQuery } from "../../hooks/useMediaQuery";

import Icon from "../Icon";
import Button from "../Button";
import { MenuList, NavList } from "./NavLists";

interface MenuButtonProps {
  isNavOpen: boolean;
  toggleNavMenu: () => void;
}

const MenuToggleButton = ({ isNavOpen, toggleNavMenu }: MenuButtonProps) => (
  <button
    className="header__nav--toggle__button grid p-1"
    aria-label="Toggle navigation menu"
    aria-expanded={isNavOpen}
    aria-controls="navigation-list"
    onClick={toggleNavMenu}
  >
    <Icon name={isNavOpen ? "close" : "menu"} />
  </button>
);

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
      <MenuToggleButton isNavOpen={isNavOpen} toggleNavMenu={toggleNavMenu} />

      <MenuList
        isNavOpen={isNavOpen}
        isTablet={isTablet}
        handleMenuItemClick={toggleNavMenu}
      />

      {isTablet && (
        <>
          <NavList />

          <Button icon={{ name: "heart_plus" }}>Contribute</Button>
        </>
      )}
    </nav>
  );
};
export default Nav;
