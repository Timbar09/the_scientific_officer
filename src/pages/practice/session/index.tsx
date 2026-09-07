import useSession from "../../../hooks/useSession";

import Container from "../../../components/Container";
import PracticeSessionHeader from "./Header";

import Loader from "./Loader";
import Results from "./Results";
import QuestionView from "./QuestionView";
import NoQuestionsView from "./NoQuestionsView";

const PracticeSession = () => {
  const session = useSession();
  const { settings, func, questions, revealedHintQuestionIds } = session;
  const { list, loading, current } = questions;

  const isHintRevealed = current.question
    ? revealedHintQuestionIds.has(current.question.id)
    : false;

  if (!settings || loading) {
    return <Loader />;
  }

  if (list.length === 0) {
    return (
      <div className="practice page">
        <Container>
          <NoQuestionsView />
        </Container>
      </div>
    );
  }

  if (!current.question) {
    return null;
  }

  return (
    <>
      <PracticeSessionHeader
        isSessionSubmitted={session.isSubmitted}
        displayHint={settings.hintsEnabled && !isHintRevealed}
        onRevealHint={func.revealHint}
        settings={settings}
        questions={questions}
        submit={func.submit}
      />

      <div className="practice page">
        <Container>
          {!session.isSubmitted ? (
            <QuestionView session={session} />
          ) : session.results ? (
            <Results sessionResults={session.results} questions={list} />
          ) : null}
        </Container>
      </div>
    </>
  );
};

export default PracticeSession;
