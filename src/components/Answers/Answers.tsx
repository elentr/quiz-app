import css from "./Answers.module.css";
import type { QuizQuestion, AnswerValue } from "../../types";

interface AnswersProps {
  question: QuizQuestion;
  selected?: AnswerValue;
  onSelect: (value: AnswerValue) => void;
}

export default function Answers({
  question,
  selected,
  onSelect,
}: AnswersProps) {
  if (question.type === "open_ended") {
    return (
      <textarea
        value={(selected as string) || ""}
        onChange={(e) => onSelect(e.target.value)}
        placeholder="Ваша відповідь..."
        className={css.textarea}
        rows={4}
      />
    );
  }

  // one_choice та multiple_choice
  const selectedArray =
    question.type === "multiple_choice" ? (selected as string[]) || [] : [];

  const singleSelected =
    question.type === "one_choice" ? (selected as string) || "" : "";

  return (
    <ul className={css.answers}>
      {question.answers?.map((answer) => {
        const isChecked =
          question.type === "multiple_choice"
            ? selectedArray.includes(answer)
            : singleSelected === answer;

        return (
          <li key={answer} className={css.answerItem}>
            <label>
              <input
                type={
                  question.type === "multiple_choice" ? "checkbox" : "radio"
                }
                name={question.type === "one_choice" ? question.id : undefined}
                checked={isChecked}
                onChange={() => {
                  if (question.type === "multiple_choice") {
                    if (isChecked) {
                      onSelect(selectedArray.filter((a) => a !== answer));
                    } else {
                      onSelect([...selectedArray, answer]);
                    }
                  } else {
                    onSelect(answer);
                  }
                }}
              />
              {answer}
            </label>
          </li>
        );
      })}
    </ul>
  );
}
