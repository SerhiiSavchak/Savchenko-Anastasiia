interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const sizes = {
    sm: { mark: 24, text: "text-xs" },
    md: { mark: 28, text: "text-sm" },
    lg: { mark: 40, text: "text-base" },
  };

  const s = sizes[size];

  return (
    <a href="#" className={`flex items-center gap-3 group ${className}`}>
      {/* Minimal camera-like circle mark with imperfect stroke */}
      <svg
        width={s.mark}
        height={s.mark}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer imperfect circle */}
        <path
          d="M20 2 C 30 1.5, 38.5 10, 38 20 S 30 38.5, 20 38 C 10 38.5, 1.5 30, 2 20 S 10 1.5, 20 2"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Inner lens circle */}
        <circle
          cx="20"
          cy="20"
          r="8"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        {/* Small dot (aperture) */}
        <circle cx="20" cy="20" r="2.5" fill="currentColor" opacity="0.3" />
      </svg>

      {/* SAVCHENKO wordmark */}
      <span
        className={`font-serif ${s.text} tracking-[0.35em] uppercase font-light`}
      >
        SAVCHENKO
      </span>
    </a>
  );
}

export function Signature({ className = "" }: { className?: string }) {
  return (
    <span className={`signature text-sm ${className}`}>
      {"Anastasiia Savchenko"}
    </span>
  );
}
