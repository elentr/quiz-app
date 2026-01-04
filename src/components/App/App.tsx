import css from "./App.module.css";
import { useState, useEffect } from "react";
import QuestionBox from "../QuestionBox/QuestionBox";
import Results from "../Results/Results";
import { getQuizSteps } from "../../services/contentful";
import type { QuizStep, AnswersRecord, AnswerValue } from "../../types";

export default function App() {
  const [steps, setSteps] = useState<QuizStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswersRecord>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getQuizSteps()
      .then((data) => {
        setSteps(data);
        setLoading(false);
        // console.log("Дані з Contentful:", data);
      })
      .catch((err) => {
        console.error("Помилка завантаження:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Завантаження квізу...</div>;
  if (steps.length === 0) return <div>Немає даних</div>;

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleAnswer = (questionId: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (isLastStep) {
      // підрахунок балів
      let correctCount = 0;

      steps.forEach((step) => {
        step.questions.forEach((q) => {
          if (q.type === "open_ended") return;

          const userAnswer = answers[q.id];
          const correctAnswer = q.correctAnswer;

          if (userAnswer === undefined || correctAnswer === undefined) return;

          if (q.type === "multiple_choice") {
            const userArr = Array.isArray(userAnswer) ? userAnswer : [];
            const correctArr = Array.isArray(correctAnswer)
              ? correctAnswer
              : [correctAnswer];

            const isExactMatch =
              userArr.length === correctArr.length &&
              userArr.every((a) => correctArr.includes(a)) &&
              correctArr.every((c) => userArr.includes(c));

            if (isExactMatch) correctCount++;
          } else if (q.type === "one_choice") {
            const correct = Array.isArray(correctAnswer)
              ? correctAnswer[0]
              : correctAnswer;
            if (userAnswer === correct) correctCount++;
          }
        });
      });

      setScore(correctCount);
      setShowResults(true);
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // валідація поточного кроку
  const allAnswered = currentStep.questions.every((q) => {
    const ans = answers[q.id];
    if (ans === undefined) return false;
    if (typeof ans === "string") return ans.trim() !== "";
    if (Array.isArray(ans)) return ans.length > 0;
    return false;
  });

  // підрахунок загальної кількості, які оцінюються (без open_ended)
  const totalScorableQuestions = steps.reduce((sum, step) => {
    return sum + step.questions.filter((q) => q.type !== "open_ended").length;
  }, 0);

  // результат
  if (showResults) {
    return (
      <div className={css.container}>
        <h1 className={css.title}>Результати</h1>
        <Results
          score={score}
          total={totalScorableQuestions}
          answers={answers}
        />
      </div>
    );
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Quiz</h1>

      <QuestionBox
        step={currentStep}
        currentStepIndex={currentStepIndex}
        totalSteps={steps.length}
        answers={answers}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrev={handlePrev}
        isLastStep={isLastStep}
        canNext={allAnswered}
      />
    </div>
  );
}
