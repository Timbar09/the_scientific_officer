import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";

import NavDropdown from "./NavDropdown";

export interface NavItem {
  name: string;
  path: string;
  sub?: NavItem[];
}

interface NavMenuItemProps {
  item: NavItem;
  handleMenuItemClick?: () => void;
}

export const NavMenuItem = ({
  item,
  handleMenuItemClick,
}: NavMenuItemProps) => {
  const variants = {
    initial: { opacity: 1, marginTop: -40 },
    animate: { opacity: 1, marginTop: 0 },
    exit: { opacity: 1, marginTop: -40 },
  };

  return (
    <NavItem
      item={item}
      motionVariants={variants}
      isMobileMenu={true}
      handleMenuItemClick={handleMenuItemClick}
    />
  );
};

interface NavLinkItemProps {
  item: NavItem;
}

export const NavLinkItem = ({ item }: NavLinkItemProps) => {
  const variants = {
    initial: { opacity: 0, y: -2 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -2 },
  };

  return <NavItem item={item} motionVariants={variants} isMobileMenu={false} />;
};

interface NavItemProps {
  item: NavItem;
  motionVariants: Variants;
  isMobileMenu: boolean;
  handleMenuItemClick?: () => void;
}

const NavItem = ({
  item,
  motionVariants,
  isMobileMenu,
  handleMenuItemClick = () => {},
}: NavItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  const itemClassName = `header__nav--${isMobileMenu ? "menu" : "list"}`;
  const isItemActive =
    pathname === item.path || pathname.startsWith(`${item.path}/`);
  const isSubItemActive =
    item.sub?.some(
      (subItem) =>
        pathname === subItem.path || pathname.startsWith(`${subItem.path}/`),
    ) ?? false;
  const isDropdownActive = isItemActive || isSubItemActive;

  return (
    <li
      key={item.path}
      className={`${itemClassName}__item p-block-@md-4`}
      role="listitem"
      onMouseEnter={!isMobileMenu ? () => setIsOpen(true) : undefined}
      onMouseLeave={!isMobileMenu ? () => setIsOpen(false) : undefined}
    >
      {item.sub ? (
        <>
          <button
            type="button"
            className={`${itemClassName}__link flex ai-center jc-center ${
              isMobileMenu ? "p-2" : ""
            } ${isDropdownActive ? "active" : ""}`}
            aria-haspopup="true"
            aria-expanded={isOpen}
            onClick={isMobileMenu ? () => setIsOpen(!isOpen) : undefined}
          >
            {item.name}{" "}
            <motion.span
              className="material-symbols-outlined"
              initial={{ rotate: 0 }}
              animate={{ rotate: isOpen ? 180 : 0 }}
            >
              keyboard_arrow_down
            </motion.span>
          </button>

          <AnimatePresence>
            {isOpen && (
              <NavDropdown
                subItems={item.sub}
                isMobileMenu={isMobileMenu}
                motionVariants={motionVariants}
                closeDropdown={() => {
                  setIsOpen(false);
                  handleMenuItemClick();
                }}
              />
            )}
          </AnimatePresence>
        </>
      ) : (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `${itemClassName}__link flex jc-center ai-center ${
              isMobileMenu ? "p-2" : ""
            } ${isActive ? "active" : ""}`
          }
          {...(isMobileMenu ? { onClick: handleMenuItemClick } : {})}
        >
          {item.name}
        </NavLink>
      )}
    </li>
  );
};
