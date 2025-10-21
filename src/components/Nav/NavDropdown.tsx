import { NavLink } from "react-router";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { NavItem } from "./NavItems";

interface NavDropdownProps {
  subItems: NavItem[];
  isMobileMenu: boolean;
  motionVariants: Variants;
  closeDropdown: () => void;
}

const NavDropdown = ({
  subItems,
  motionVariants,
  isMobileMenu,
  closeDropdown,
}: NavDropdownProps) => {
  return isMobileMenu ? (
    <div key="modal" className="header__nav--list__dropdown p-block-1">
      <ul
        className="header__nav--list__dropdown--list p-block-2 p-inline-3"
        role="menu"
      >
        {subItems.map((item) => (
          <motion.li
            key={item.path}
            className="header__nav--list__item"
            role="menuitem"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={motionVariants}
          >
            <NavLink
              to={item.path}
              className="header__nav--list__link"
              onClick={closeDropdown}
            >
              {item.name}
            </NavLink>
          </motion.li>
        ))}
      </ul>
    </div>
  ) : (
    <motion.div
      key="modal"
      className="header__nav--list__dropdown p-block-1"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={motionVariants}
    >
      <ul
        className="header__nav--list__dropdown--list p-block-2 p-inline-3"
        role="menu"
      >
        {subItems.map((item) => (
          <li
            key={item.path}
            className="header__nav--list__item"
            role="menuitem"
          >
            <NavLink
              to={item.path}
              className="header__nav--list__link"
              onClick={closeDropdown}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default NavDropdown;
