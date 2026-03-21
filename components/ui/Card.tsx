interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export function Card({ children, className = "", glass = false }: CardProps) {
  const base = glass
    ? "glass rounded-2xl p-8"
    : "bg-surface-container-low hover:bg-surface-container transition-colors duration-200 rounded-2xl p-8 shadow-ambient hover:shadow-ambient-lg";

  return <div className={`${base} ${className}`}>{children}</div>;
}
