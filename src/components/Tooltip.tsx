import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { MotionProps } from "framer-motion";

import Icon from "./Icon";
// import { IoIosArrowForward as LinkIcon } from "react-icons/io";

interface TooltipProps {
  children: React.ReactNode;
  isLink?: boolean;
  styles?: React.CSSProperties;
  animation?: MotionProps;
}

const Tooltip = ({
  children,
  isLink = false,
  styles = {},
  animation,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({
    left: "50%",
    right: "auto",
    translate: "-50% 0",
  });
  const parentRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const parent = parentRef.current?.parentNode;
    if (!parent) return;

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    parent.addEventListener("mouseenter", show);
    parent.addEventListener("mouseleave", hide);

    return () => {
      parent.removeEventListener("mouseenter", show);
      parent.removeEventListener("mouseleave", hide);
    };
  }, []);

  useEffect(() => {
    if (visible && parentRef.current && tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const difference = {
        left: tooltipRect.left,
        right: window.innerWidth - tooltipRect.right,
      };

      const sideCloserToEdge =
        difference.left < difference.right ? "left" : "right";

      const isOverflowing = difference[sideCloserToEdge] < 0;

      if (!isOverflowing) return;

      let left = "50%";
      let translate = "-50% 0";
      let right = "auto";

      if (sideCloserToEdge === "left") {
        left = "0px";
        right = "auto";
        translate = "none";
      } else {
        right = "0px";
        left = "auto";
        translate = "none";
      }

      setPosition({ left, right, translate });
    }
  }, [visible]);

  const tooltipAnimationProps: MotionProps = animation
    ? animation
    : {
        initial: { opacity: 0, y: -10, scale: 1.1 },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.3 },
      };

  const customVariables = {
    "--left": position.left === "0px" ? "16px" : position.left,
    "--right": position.right === "0px" ? "16px" : position.right,
    "--translate": position.translate,
  };

  return (
    <AnimatePresence>
      <span
        key={crypto.randomUUID()}
        ref={parentRef}
        style={{ display: "none" }}
      />

      {visible && (
        <motion.span
          key={crypto.randomUUID()}
          ref={tooltipRef}
          className="tooltip"
          {...tooltipAnimationProps}
          style={{
            ...styles,
            ...position,
            ...customVariables,
          }}
        >
          <p className="tooltip__text">{children}</p>

          {isLink && (
            <span className="tooltip__icon--container">
              <Icon
                name="east"
                className="tooltip__icon tooltip__icon--second"
              />
            </span>
          )}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default Tooltip;
