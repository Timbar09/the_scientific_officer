import { NavLink } from "react-router";

import Icon from "../../../../components/Icon";

import { useMediaQuery } from "../../../../hooks/useMediaQuery";

const HeaderBadge = ({
  className = "",
  iconName,
  value,
  linkTo,
  responsiveItem = "value",
  onClick,
}: {
  className?: string;
  iconName: string;
  value: string;
  linkTo?: string;
  responsiveItem?: "value" | "icon";
  onClick?: () => void;
}) => {
  const isSmallScreen = useMediaQuery({ breakpoint: "sm" });
  const isClickable = !!linkTo || !!onClick;
  const isIconResponsive = responsiveItem === "icon";

  const baseCN = "practice__header--badge";
  const clickableClass = isClickable ? `${baseCN}__clickable` : "";
  const displayValueClass = isSmallScreen || isIconResponsive ? "" : "sr-only";
  const displayIconClass = isSmallScreen || !isIconResponsive ? "" : "sr-only";
  const classNames = `${baseCN} ${clickableClass} ${className} flex ai-center gap-1 p-1`;

  if (linkTo) {
    return (
      <NavLink to={linkTo} className={classNames}>
        <Icon
          name={iconName}
          className={`${baseCN}__icon ${displayIconClass}`}
        />

        <span className={`${baseCN}__value ${displayValueClass}`}>{value}</span>
      </NavLink>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={classNames} onClick={onClick}>
        <Icon
          name={iconName}
          className={`${baseCN}__icon ${displayIconClass}`}
        />

        <span className={`${baseCN}__value ${displayValueClass}`}>{value}</span>
      </button>
    );
  }

  return (
    <div className={classNames}>
      <Icon name={iconName} className={`${baseCN}__icon ${displayIconClass}`} />

      <span className={`${baseCN}__value ${displayValueClass}`}>{value}</span>
    </div>
  );
};

export default HeaderBadge;
