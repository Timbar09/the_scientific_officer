import PracticeLoaderView from "./PracticeLoaderView";
import PracticeNoQuestionsView from "./PracticeNoQuestionsView";
import PracticeQuestionView from "./PracticeQuestionView";
import PracticeResults from "./PracticeResults";
import usePracticeSession from "../../../hooks/usePracticeSession";

const PracticeSession = () => {
  const session = usePracticeSession();

  if (!session.settings || session.isLoading) {
    return <PracticeLoaderView />;
  }

  if (session.filteredQuestions.length === 0) {
    return (
      <div className="practice page">
        <div className="container">
          <PracticeNoQuestionsView />
        </div>
      </div>
    );
  }

  if (!session.currentQuestion || !session.currentVariant) {
    return null;
  }

  return (
    <div className="practice page">
      <div className="container">
        <h1 className="page__title">
          {session.isComplete ? "Practice Results" : "Practice Session"}
        </h1>

        {!session.isComplete ? (
          <PracticeQuestionView session={session} />
        ) : session.results ? (
          <PracticeResults
            sessionResults={session.results}
            filteredQuestions={session.filteredQuestions}
            settings={session.settings}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PracticeSession;
