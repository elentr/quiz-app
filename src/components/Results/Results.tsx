import type { AnswerValue } from "../../types";
import css from "./Results.module.css";

interface ResultsProps {
  score: number;
  total: number;
  answers: Record<string, AnswerValue>;
}

export default function Results({ score, total, answers }: ResultsProps) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const userName = (answers["q0"] as string)?.trim() || "друже";

  return (
    <div className={css.container}>
      <h2 className={css.title}>Квіз завершено, {userName}!</h2>

      <p className={css.score}>
        Ти набрав(ла):{" "}
        <strong>
          {score} з {total}
        </strong>{" "}
        правильних відповідей
      </p>

      <div className={css.percentage}>{percentage}%</div>

      <div className={css.message}>
        {percentage >= 80
          ? "Чудово! Ти добре знаєшся на фронтенді! 🚀"
          : percentage >= 60
          ? "Добре! Є куди рости 😊"
          : "Не засмучуйся! Практика — ключ до успіху 💪"}
      </div>
    </div>
  );
}
