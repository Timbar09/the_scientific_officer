import { titlize } from "../../../../utils/titlize";

const Summary = ({ topics }: { topics: string[] }) => {
  return (
    <section
      className="practice__session--summary"
      aria-label="Topics Covered"
      title="Topics Covered"
    >
      <div className="practice__session--summary__topic">
        <h2 className="practice__session--summary__topic--title sr-only">
          Topics Covered:
        </h2>

        <div className="practice__session--summary__topic--list p-block-3 flex flex-wrap gap-2 ai-center">
          {topics.map((topic) => (
            <span key={topic} className="practice__session--summary__badge">
              {titlize(topic)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Summary;
