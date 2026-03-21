interface ServiceChipProps {
  label: string;
}

export function ServiceChip({ label }: ServiceChipProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-label bg-surface-variant text-on-surface-variant">
      {label}
    </span>
  );
}
