import css from "./QuestionBox.module.css";
import Progress from "../Progress/Progress";
import Question from "../Question/Question";
import Answers from "../Answers/Answers";
import NavButtons from "../NavButtons/NavButtons";
import type { QuizStep, AnswersRecord, AnswerValue } from "../../types";

interface QuestionBoxProps {
  step: QuizStep;
  currentStepIndex: number;
  totalSteps: number;
  answers: AnswersRecord;
  onAnswer: (id: string, value: AnswerValue) => void;
  onNext: () => void;
  onPrev: () => void;
  isLastStep: boolean;
  canNext: boolean;
}

export default function QuestionBox({
  step,
  currentStepIndex,
  totalSteps,
  answers,
  onAnswer,
  onNext,
  onPrev,
  isLastStep,
  canNext,
}: QuestionBoxProps) {
  return (
    <div className={css.container}>
      <Progress current={currentStepIndex + 1} total={totalSteps} />

      {step.questions.map((question) => (
        <div key={question.id} className={css.questionWrapper || ""}>
          <Question text={question.questionText} />
          <Answers
            question={question}
            selected={answers[question.id]}
            onSelect={(value: AnswerValue) => onAnswer(question.id, value)}
          />
        </div>
      ))}

      <NavButtons
        onPrev={currentStepIndex > 0 ? onPrev : undefined}
        onNext={onNext}
        isLastStep={isLastStep}
        disabled={!canNext}
      />
    </div>
  );
}
