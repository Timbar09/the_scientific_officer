import { NavLink } from "react-router";
import { useMediaQuery } from "../hooks/useMediaQuery";

import Button from "./Button";

interface UnderConstructionProps {
  page: string;
}

const UnderConstruction = ({ page }: UnderConstructionProps) => {
  const isMediumScreen: boolean = useMediaQuery({ breakpoint: "md" });

  return (
    <div className="under-construction">
      <div className="container flex jc-center ai-center flex-col gap-4">
        <header className="under-construction__header flex flex-col flex-@md-row ai-center jc-center">
          <h2 className="under-construction__title flex-@md flex-@md-col jc-@md-center">
            {isMediumScreen ? (
              <>
                <span>Page</span> <span>Under</span> <span>Construction</span>
              </>
            ) : (
              "Page Under Construction"
            )}
          </h2>

          <span className="under-construction__icon">🚧</span>
        </header>

        <p className="under-construction__description">
          The {page} page is currently under construction. Please check back
          later!
        </p>

        <Button variant="primary">
          <NavLink to="/">Go Back Home</NavLink>
        </Button>
      </div>
    </div>
  );
};

export default UnderConstruction;
