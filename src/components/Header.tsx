import { useLanguage } from "../context/useLanguage";
import { useMediaQuery } from "../hooks/useMediaQuery";

import Nav from "./Nav";
import Button from "./Button";
import Container from "./Container";
import Tooltip from "./Tooltip";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const isTablet: boolean = useMediaQuery({ breakpoint: "md" });
  const { t } = useLanguage();
  const translationKey = "navigation.contribute";
  const text = t(translationKey);
  const translatedText = text === translationKey ? "Contribute" : text;

  return (
    <header className="header p-block-3" role="banner">
      <Container className="flex ai-center jc-between p-inline-@md-3" size="lg">
        <Logo />

        <Nav type="list" />

        <div className="flex ai-center gap-1">
          {isTablet && (
            <Button icon={{ name: "heart_plus" }}>{translatedText}</Button>
          )}

          <LanguageSelector />

          <Nav type="menu" />
        </div>
      </Container>
    </header>
  );
};

const Logo = () => {
  return (
    <div
      className="header__logo p-block-1 p-block-@md-0 p-inline-3 p-inline-@md-1 fw-bold clr-primary-900"
      role="logo"
    >
      The Scientific Officer
      <Tooltip isLink>This just the logo, fam!</Tooltip>
    </div>
  );
};

export default Header;
