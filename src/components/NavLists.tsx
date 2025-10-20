import { motion, AnimatePresence } from "motion/react";

import { NavMenuItem, NavItem } from "./NavItems";

const navLinks = [
  { name: "Home", path: "/" },
  {
    name: "Practice",
    path: "/practice",
    sub: [
      { name: "Practice Questions", path: "/practice/questions" },
      { name: "Mock Test", path: "/practice/mock-test" },
    ],
  },
  {
    name: "Resources",
    path: "/resources",
    sub: [
      { name: "Books", path: "/resources/books" },
      { name: "Articles", path: "/resources/articles" },
      { name: "Videos", path: "/resources/videos" },
    ],
  },
  { name: "About", path: "/about" },
];

export interface Menu {
  isNavOpen: boolean;
  isTablet: boolean;
  handleMenuItemClick: () => void;
}

export const MenuList = ({
  isNavOpen,
  isTablet,
  handleMenuItemClick,
}: Menu) => (
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
          <NavMenuItem
            key={link.path}
            item={link}
            handleMenuItemClick={handleMenuItemClick}
          />
        ))}
      </motion.ul>
    )}
  </AnimatePresence>
);

export const NavList = () => {
  // const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);

  return (
    <ul
      className="header__nav--list flex gap-3"
      role="navigation"
      id="navigation-list"
    >
      {navLinks.map((link) => (
        <NavItem
          key={link.path}
          item={link}
          // isSubMenuOpen={isSubMenuOpen}
          // setIsSubMenuOpen={setIsSubMenuOpen}
        />
      ))}
    </ul>
  );
};
