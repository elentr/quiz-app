import css from "./NavButtons.module.css";

interface NavButtonsProps {
  onPrev?: () => void;
  onNext: () => void;
  isLastStep: boolean;
  disabled?: boolean;
}

export default function NavButtons({
  onPrev,
  onNext,
  isLastStep,
  disabled = false,
}: NavButtonsProps) {
  return (
    <div className={css.btns}>
      {onPrev && (
        <button type="button" onClick={onPrev} className={css.btn}>
          ← Previous
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className={css.btn}
      >
        {isLastStep ? "Submit" : "Next →"}
      </button>
    </div>
  );
}
