import type { SVGProps } from "react";
import Link from "next/link";

type FeatureIcon = "geography" | "pathways" | "impact" | "methodology";

type FeatureCardProps = {
  number: string;
  icon: FeatureIcon;
  title: string;
  description: string;
  href: string;
};

function FeatureIconGraphic({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: FeatureIcon }) {
  const shared = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
  };

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      {name === "geography" && (
        <>
          <path
            d="M16 28s9-8.1 9-16a9 9 0 1 0-18 0c0 7.9 9 16 9 16Z"
            {...shared}
          />
          <circle cx="16" cy="12" r="3" {...shared} />
        </>
      )}
      {name === "pathways" && (
        <>
          <path d="M6 24h6V8h8v8h6" {...shared} />
          <circle cx="6" cy="24" r="2.5" {...shared} />
          <circle cx="12" cy="8" r="2.5" {...shared} />
          <circle cx="20" cy="16" r="2.5" {...shared} />
          <path d="m23 13 3 3-3 3" {...shared} />
        </>
      )}
      {name === "impact" && (
        <>
          <path d="M5 26V7m0 19h23" {...shared} />
          <path d="m9 21 5-6 4 3 7-9" {...shared} />
          <path d="M21 9h4v4" {...shared} />
        </>
      )}
      {name === "methodology" && (
        <>
          <path d="M9 5h10l5 5v17H9z" {...shared} />
          <path d="M19 5v6h6M13 16h7m-7 4h7" {...shared} />
          <path d="m6 11-2 2 2 2" {...shared} />
        </>
      )}
    </svg>
  );
}

export function FeatureCard({
  number,
  icon,
  title,
  description,
  href,
}: FeatureCardProps) {
  return (
    <Link className="feature-card" href={href}>
      <div className="feature-card-top">
        <span className="feature-number">{number}</span>
        <span className="feature-icon-wrap">
          <FeatureIconGraphic className="feature-icon" name={icon} />
        </span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="feature-card-rule" aria-hidden="true" />
      <span className="feature-card-action">Explore module</span>
    </Link>
  );
}
