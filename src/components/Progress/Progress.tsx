import css from "./Progress.module.css";

interface ProgressProps {
  current: number;
  total: number;
}

export default function Progress({ current, total }: ProgressProps) {
  return (
    <p className={css.progress}>
      Step {current} / {total}
    </p>
  );
}
