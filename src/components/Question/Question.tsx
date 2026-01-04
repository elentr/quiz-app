import css from "./Question.module.css";

interface QuestionProps {
  text: string;
}

export default function Question({ text }: QuestionProps) {
  return <h2 className={css.question}>{text}</h2>;
}
