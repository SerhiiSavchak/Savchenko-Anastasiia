interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const textSize = {
    sm: "text-[11px] tracking-[0.4em]",
    md: "text-[13px] tracking-[0.4em]",
    lg: "text-[18px] tracking-[0.5em]",
  };

  return (
    <a href="#" className={`inline-block ${className}`}>
      <span className={`font-sans font-light uppercase ${textSize[size]}`}>
        SAVCHENKO
      </span>
    </a>
  );
}

export function EditorialMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block text-[10px] tracking-[0.3em] uppercase text-foreground/30 font-sans ${className}`}
      aria-hidden
    >
      {"--- "}
    </span>
  );
}
