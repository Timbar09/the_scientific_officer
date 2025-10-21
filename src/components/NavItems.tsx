import { useState } from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";

interface NavItem {
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

  const itemClassName = `header__nav--${isMobileMenu ? "menu" : "list"}`;

  return (
    <li
      key={item.path}
      className={`${itemClassName}__item`}
      role="listitem"
      onMouseEnter={!isMobileMenu ? () => setIsOpen(true) : undefined}
      onMouseLeave={!isMobileMenu ? () => setIsOpen(false) : undefined}
    >
      {item.sub ? (
        <>
          <button
            type="button"
            className={`${itemClassName}__link flex ai-center jc-center ${
              isMobileMenu ? "fw-bold p-1" : ""
            }`}
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
              isMobileMenu ? "fw-bold p-1" : ""
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
  console.log("isMobileMenu", isMobileMenu);

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
