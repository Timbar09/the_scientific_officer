import { NavLink } from "react-router";
import { motion } from "motion/react";

import { useLanguage } from "../../context/useLanguage";

import type { Variants } from "motion/react";
import type { NavItem } from "./NavItems";

import Icon from "../Icon";
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
  const { t } = useLanguage();

  const getText = (item: NavItem) => {
    const translationKey = `navigation.${item.name.toLowerCase()}`;
    const text = t(translationKey);
    return text === translationKey ? item.name : text;
  };

  return isMobileMenu ? (
    <div key="modal" className="header__nav--menu__dropdown">
      <ul
        className="header__nav--menu__dropdown--list p-block-start-0 p-block-end-2 p-inline-3"
        role="menu"
      >
        {subItems.map((item) => (
          <motion.li
            key={item.path}
            className="header__nav--menu__dropdown__item"
            role="menuitem"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={motionVariants}
          >
            <NavLink
              to={item.path}
              className="header__nav--menu__dropdown__link p-1"
              onClick={closeDropdown}
            >
              {getText(item)}
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
      <ul className="header__nav--list__dropdown--list p-2" role="menu">
        {subItems.map((item) => (
          <li
            key={item.path}
            className="header__nav--list__item"
            role="menuitem"
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `header__nav--list__link p-block-2 p-inline-3 flex ai-center gap-1 ${isActive ? "active removeArrowIcon" : ""}`
              }
              onClick={closeDropdown}
            >
              {getText(item)}{" "}
              <span className="header__nav--list__dropdown--item__icon flex ai-center">
                <Icon name="remove" /> <Icon name="arrow_right_alt" />
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default NavDropdown;
