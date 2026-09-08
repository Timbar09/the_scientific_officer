import { motion } from "motion/react";

const BASE_CN = "practice__header--progress";

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

  const typeBaseCN = `${BASE_CN}__${variant}`;
  const stepOrRailCN = isStepped ? "step" : "rail";

  return (
    <div className={`${BASE_CN} ${typeBaseCN} flex gap-1 ai-center`}>
      <div
        className={`${BASE_CN}__container ${typeBaseCN}--${stepOrRailCN}__container`}
      >
        {variant === "linear" ? (
          <LinearProgressBar
            progressPercentage={progressPercentage}
            progressLabel={progressLabel}
          />
        ) : (
          <SteppedProgressBar progressPercentage={progressPercentage} />
        )}
      </div>

      <div className={`${BASE_CN}__value`}>
        {`${Math.round(progressPercentage)}%`}
      </div>
    </div>
  );
};

const SteppedProgressBar = ({
  progressPercentage,
}: {
  progressPercentage: number;
}) => {
  const steps = 35;

  const typeBaseCN = `${BASE_CN}__stepped`;

  return (
    <div className={`${typeBaseCN}--step__list flex jc-between`}>
      {Array.from({ length: steps }).map((_, index) => {
        const stepFraction = (index + 1) / steps;
        const stepPercentage = stepFraction * 100;
        const isCompleted = stepPercentage <= progressPercentage;

        const cssVars = {
          "--step-bg-opacity": Math.max(0.25, stepFraction), // Adjust the opacity based on the step fraction
        } as React.CSSProperties;
        const stepCN = isCompleted
          ? `${typeBaseCN}--step__item--completed`
          : "";

        return (
          <div key={index} className={`${typeBaseCN}--step__item--container`}>
            <motion.div
              style={cssVars}
              className={`${typeBaseCN}--step__item ${stepCN}`}
              animate={{
                opacity: isCompleted ? 1 : 0,
                scaleY: isCompleted ? 1 : 0.85,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const LinearProgressBar = ({
  progressPercentage,
  progressLabel,
}: {
  progressPercentage: number;
  progressLabel: string;
}) => {
  const typeBaseCN = `${BASE_CN}__linear`;

  return (
    <div className={`${typeBaseCN}--rail`}>
      <motion.div
        className={`${typeBaseCN}--rail__bar`}
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        aria-label={progressLabel}
        data-progress={progressLabel}
      ></motion.div>
    </div>
  );
};

export default ProgressBar;
