import { useState } from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "motion/react";

interface NavItem {
  name: string;
  path: string;
  sub?: NavItem[];
}

interface NavItemProps {
  item: NavItem;
  handleMenuItemClick?: () => void;
}

export const NavMenuItem = ({ item, handleMenuItemClick }: NavItemProps) => {
  return (
    <li
      key={item.path}
      className="header__nav--menu__item p-1"
      role="menuitem"
      onClick={handleMenuItemClick}
    >
      <NavLink to={item.path} className="header__nav--menu__link fw-bold">
        {item.name}
      </NavLink>
    </li>
  );
};

export const NavItem = ({ item }: NavItemProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);

  return (
    <li
      key={item.path}
      className="header__nav--list__item"
      role="listitem"
      onMouseEnter={() => setIsSubMenuOpen && setIsSubMenuOpen(true)}
      onMouseLeave={() => setIsSubMenuOpen && setIsSubMenuOpen(false)}
    >
      {item.sub ? (
        <>
          <button
            type="button"
            className="header__nav--list__link flex ai-center"
            aria-haspopup="true"
            aria-expanded={isSubMenuOpen}
          >
            {item.name}{" "}
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </button>

          <AnimatePresence>
            {isSubMenuOpen && <DropDownMenu subItems={item.sub} />}
          </AnimatePresence>
        </>
      ) : (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `header__nav--list__link flex ${isActive ? "active" : ""}`
          }
        >
          {item.name}
        </NavLink>
      )}
    </li>
  );
};

const DropDownMenu = ({ subItems }: { subItems: NavItem[] }) => {
  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0, y: -2 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -2 }}
      className="header__nav--list__dropdown p-block-1"
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
            <NavLink to={item.path} className="header__nav--list__link">
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
