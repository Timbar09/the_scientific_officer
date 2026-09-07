const ProgressBar = ({
  unanswered,
  total,
  variant = "linear",
}: {
  unanswered: number;
  total: number;
  variant?: "linear" | "stepped";
}) => {
  const progressPercentage = ((total - unanswered) / total) * 100;
  const progressLabel = `${total - unanswered} out of ${total} answered`;
  const isStepped = variant === "stepped";

  const baseCN = "practice__header--progress";
  const typeBaseCN = `${baseCN}__${variant}`;
  const stepOrRailCN = isStepped ? "step" : "rail";

  return (
    <div className={`${baseCN} ${typeBaseCN} flex gap-1 ai-center`}>
      <div
        className={`${baseCN}__container ${typeBaseCN}--${stepOrRailCN}__container`}
      >
        {variant === "linear" ? (
          <div className={`${typeBaseCN}--rail`}>
            <div
              className={`${typeBaseCN}--rail__bar`}
              style={{ width: `${progressPercentage}%` }}
              aria-label={progressLabel}
              data-progress={progressLabel}
            ></div>
          </div>
        ) : (
          <>
            <div className={`${typeBaseCN}--step__list flex jc-between`}>
              {Array.from({ length: 50 }).map((_, index) => {
                const stepPercentage = ((index + 1) / 50) * 100;
                const isCompleted = stepPercentage <= progressPercentage;

                const stepCN = isCompleted
                  ? `${typeBaseCN}--step__item--completed`
                  : "";

                return (
                  <div
                    key={index}
                    className={`${typeBaseCN}--step__item ${stepCN}`}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className={`${baseCN}__value`}>
        {`${Math.round(progressPercentage)}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
