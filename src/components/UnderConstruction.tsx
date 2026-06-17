import { useMediaQuery } from "../hooks/useMediaQuery";

import Button from "./Button";
import Container from "./Container";

interface UnderConstructionProps {
  page: string;
}

const UnderConstruction = ({ page }: UnderConstructionProps) => {
  const isMediumScreen: boolean = useMediaQuery({ breakpoint: "md" });

  return (
    <div className="under-construction">
      <Container className="flex jc-center ai-center flex-col">
        <h1 className="under-construction__title m-block-end-4">{page} Page</h1>

        <header className="under-construction__header flex flex-col flex-@md-row ai-center jc-center">
          <h2 className="under-construction__header--title flex-@md flex-@md-col jc-@md-center">
            {isMediumScreen ? (
              <>
                <span>Page</span> <span>Under</span> <span>Construction</span>
              </>
            ) : (
              "Page Under Construction"
            )}
          </h2>

          <span className="under-construction__header--icon">🚧</span>
        </header>

        <p className="under-construction__description m-block-end-4">
          The {page} page is currently under construction. Please check back
          later!
        </p>

        <Button to="/" icon={{ name: "Arrow_back" }}>
          Go Back Home
        </Button>
      </Container>
    </div>
  );
};

export default UnderConstruction;
