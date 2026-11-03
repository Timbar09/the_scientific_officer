import type { ReactNode } from "react";

import { useLanguage } from "../context/useLanguage";

import Container from "../components/Container";

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  const { translations, isLoading, error, t } = useLanguage();

  if (isLoading && !translations) {
    return (
      <Container>
        <p>{t("common.loading")}...</p>
      </Container>
    );
  }

  if (error && !translations) {
    return (
      <Container>
        <p role="alert">Unable to load the home page: {error.message}</p>
      </Container>
    );
  }

  if (!translations) {
    return null;
  }

  return <>{children}</>;
};

export default Page;
