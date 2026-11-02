import { motion, AnimatePresence } from "motion/react";

import { useLanguage } from "../../context/useLanguage";

import Button from "../Button";
import { NavMenuItem, NavLinkItem } from "./NavItems";

const navLinks = [
  { name: "Home", path: "/" },
  {
    name: "Practice",
    path: "/practice",
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
  display: boolean;
  onClick: () => void;
}

const animationProps = {
  initial: { top: 0, right: "-100%" },
  animate: { top: 0, right: 0 },
  exit: { top: 0, right: "-100%" },
};

export const MenuList = ({ display, onClick }: Menu) => (
  <AnimatePresence>
    {display && (
      <motion.ul
        className="header__nav--menu flex flex-col"
        role="menu"
        id="menu"
        {...animationProps}
      >
        {navLinks.map((link) => (
          <NavMenuItem
            key={link.path}
            item={link}
            handleMenuItemClick={onClick}
          />
        ))}
      </motion.ul>
    )}
  </AnimatePresence>
);

export const NavList = ({ display }: { display: boolean }) => {
  const { t } = useLanguage();
  const translationKey = "navigation.contribute";
  const text = t(translationKey);
  const translatedText = text === translationKey ? "Contribute" : text;

  if (!display) return null;

  return (
    <>
      <ul
        className="header__nav--list flex gap-3"
        role="navigation"
        id="navigation-list"
      >
        {navLinks.map((link) => (
          <NavLinkItem key={link.path} item={link} />
        ))}
      </ul>

      <Button icon={{ name: "heart_plus" }}>{translatedText}</Button>
    </>
  );
};
