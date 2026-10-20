import { useEffect, useState } from "react";

import Button from "../../../../components/Button";

interface Props {
  isOpen: boolean;
  confirmLeave: () => void;
  cancelLeave: () => void;
}

const ConfirmLeaveModal = ({ isOpen, confirmLeave, cancelLeave }: Props) => {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleConfirmLeave = () => {
    if (isLeaving) return;

    setIsLeaving(true);

    confirmLeave();
  };

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLeaving) {
        cancelLeave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, cancelLeave, isLeaving]);

  if (!isOpen) return null;

  const baseCN = "practice__session--modal";
  const actionsCN = `${baseCN}__actions flex flex-wrap gap-2 jc-between ai-center m-block-start-3`;

  return (
    <div
      className={`${baseCN} flex jc-center ai-center`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-leave-title"
      aria-describedby="confirm-leave-description"
    >
      <div className={`${baseCN}__content p-4`}>
        <h3 className={`${baseCN}__title`} id="confirm-leave-title">
          Leave Session?
        </h3>

        <p
          className={`${baseCN}__description m-block-1`}
          id="confirm-leave-description"
        >
          Your progress will be lost. Are you sure you want to leave?
        </p>

        <div className={actionsCN}>
          <Button
            className={`${baseCN}__leave`}
            variant="tertiary"
            onClick={handleConfirmLeave}
          >
            {isLeaving ? "Leaving..." : "Yes, Leave"}
          </Button>

          <Button onClick={cancelLeave}>Stay and Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLeaveModal;
