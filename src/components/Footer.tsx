import { NavLink } from "react-router";

import Container from "./Container";

const Footer = () => {
  return (
    <footer className="footer bg-primary-900 p-block-start-5">
      <Container>
        <div className="footer__top p-block-3 flex flex-col flex-@md-row jc-between gap-4">
          <div className="footer__top--group">
            <h2 className="footer__title m-block-end-1">
              The Scientific Officer
            </h2>

            <p className="footer__description">
              Empowering scientific officers with tools and resources for career
              success.
            </p>
          </div>

          <QuickLinks />

          <ResourcesLinks />

          <ContactLinks />
        </div>

        <FooterBottom />
      </Container>
    </footer>
  );
};

const QuickLinks = () => {
  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Practice", path: "/practice" },
    { name: "Careers", path: "/careers" },
  ];

  return (
    <div className="footer__top--group">
      <h3 className="footer__subtitle m-block-end-1">Quick Links</h3>

      <ul className="footer__list">
        {quickLinks.map((link) => (
          <li key={link.name} className="footer__list--item">
            <NavLink className="footer__link" to={link.path}>
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ResourcesLinks = () => {
  const resourcesLinks = [
    { name: "Books", path: "/resources/books" },
    { name: "Articles", path: "/resources/articles" },
    { name: "Videos", path: "/resources/videos" },
  ];

  return (
    <div className="footer__top--group">
      <h3 className="footer__subtitle m-block-end-1">Resources</h3>

      <ul className="footer__list">
        {resourcesLinks.map((link) => (
          <li key={link.name} className="footer__list--item">
            <NavLink className="footer__link" to={link.path}>
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ContactLinks = () => {
  const socialLinks = [
    { name: "X", path: "https://twitter.com/scientificoffic1" },
    {
      name: "LinkedIn",
      path: "https://www.linkedin.com/company/scientificofficer",
    },
    { name: "Facebook", path: "https://www.facebook.com/scientificofficer" },
    { name: "Instagram", path: "https://www.instagram.com/scientificofficer" },
  ];

  return (
    <div className="footer__top--group">
      <h3 className="footer__subtitle m-block-end-1">Contact Us</h3>

      <ul className="footer__list flex jc-center jc-@md-start flex-wrap gap-2">
        {socialLinks.map((link) => (
          <li key={link.name} className="footer__list--item">
            <a
              className="footer__link"
              href={link.path}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      <p className="m-block-start-1">
        Email:{" "}
        <a href="mailto:info@scientificofficer.com" className="footer__link">
          info@scientificofficer.com
        </a>
      </p>
    </div>
  );
};

const FooterBottom = () => {
  return (
    <div className="footer__bottom p-block-3 flex flex-wrap jc-center jc-@md-between ai-center gap-4">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} The Scientific Officer. All rights
        reserved.
      </p>

      <p className="footer__author">
        Developed by{" "}
        <a
          className="footer__link"
          href="https://milesmosweu.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Miles
        </a>
      </p>
    </div>
  );
};

export default Footer;
