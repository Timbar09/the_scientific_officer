const Footer = () => {
  return (
    <footer className="footer bg-primary-900 p-block-start-5">
      <div className="container">
        <div className="footer__top p-block-3">
          <ul className="footer__top--group__list flex flex-col flex-@md-row jc-between gap-4">
            <li className="footer__top--group__item">
              <h2 className="footer__title m-block-end-1">
                The Scientific Officer
              </h2>
              <p className="footer__description">
                Empowering scientific officers with tools and resources for
                career success.
              </p>
            </li>

            <li className="footer__top--group__item">
              <h3 className="footer__subtitle m-block-end-1">Quick Links</h3>

              <ul className="footer__links">
                <li className="footer__link">
                  <a href="/about">About Us</a>
                </li>
                <li className="footer__link">
                  <a href="/practice">Practice</a>
                </li>
                <li className="footer__link">
                  <a href="/careers">Careers</a>
                </li>
              </ul>
            </li>

            <li className="footer__top--group__item">
              <h3 className="footer__subtitle m-block-end-1">Resources</h3>

              <ul className="footer__links">
                <li className="footer__link">
                  <a href="/blog">Blog</a>
                </li>
                <li className="footer__link">
                  <a href="/downloads">Downloads</a>
                </li>
                <li className="footer__link">
                  <a href="/faq">FAQ</a>
                </li>
              </ul>
            </li>

            <li className="footer__top--group__item">
              <h3 className="footer__subtitle m-block-end-1">Contact Us</h3>

              <ul className="footer__social--link__list flex jc-center jc-@md-start flex-wrap gap-2">
                <li className="footer__social--link">
                  <a
                    href="https://twitter.com/scientificoffic1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X
                  </a>
                </li>
                <li className="footer__social--link">
                  <a
                    href="https://www.linkedin.com/company/scientificofficer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="footer__social--link">
                  <a
                    href="https://www.facebook.com/scientificofficer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li className="footer__social--link">
                  <a
                    href="https://www.instagram.com/scientificofficer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              </ul>

              <ul className="footer__links m-block-start-1">
                <li className="footer__link">
                  Email:{" "}
                  <a href="mailto:thescientificofficer@gmail.com">
                    thescientificofficer@gmail.com
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="footer__bottom p-block-3 flex flex-wrap jc-center jc-@md-between ai-center gap-4">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} The Scientific Officer. All rights
            reserved.
          </p>

          <p className="footer__author">
            Developed by{" "}
            <a
              href="https://milesmosweu.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Miles
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
