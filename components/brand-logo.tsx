interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const sizes = {
    sm: "text-xs tracking-[0.35em]",
    md: "text-sm tracking-[0.35em]",
    lg: "text-base tracking-[0.4em]",
  };

  return (
    <a href="#" className={`inline-flex flex-col ${className}`}>
      <span className={`font-serif font-light uppercase ${sizes[size]}`}>
        Anastasiia
      </span>
      <span className={`font-serif font-light uppercase ${sizes[size]} -mt-1`}>
        Savchenko
      </span>
    </a>
  );
}
