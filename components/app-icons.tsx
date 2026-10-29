import type { ReactNode, SVGProps } from "react";
import type { AppIconName } from "@/lib/app-types";

export type { AppIconName } from "@/lib/app-types";

const iconPaths: Record<AppIconName, ReactNode> = {
  overview: (
    <>
      <rect x="4" y="4" width="10" height="10" rx="2" />
      <rect x="18" y="4" width="10" height="6" rx="2" />
      <rect x="18" y="14" width="10" height="14" rx="2" />
      <rect x="4" y="18" width="10" height="10" rx="2" />
    </>
  ),
  geography: (
    <>
      <path d="M16 28s9-8.1 9-16a9 9 0 1 0-18 0c0 7.9 9 16 9 16Z" />
      <circle cx="16" cy="12" r="3" />
    </>
  ),
  vulnerability: (
    <>
      <path d="M16 4 28 26H4L16 4Z" />
      <path d="M16 12v6m0 4h.01" />
    </>
  ),
  pathways: (
    <>
      <path d="M6 24h6V8h8v8h6" />
      <circle cx="6" cy="24" r="2.5" />
      <circle cx="12" cy="8" r="2.5" />
      <circle cx="20" cy="16" r="2.5" />
      <path d="m23 13 3 3-3 3" />
    </>
  ),
  impact: (
    <>
      <path d="M5 26V7m0 19h23" />
      <path d="m9 21 5-6 4 3 7-9" />
      <path d="M21 9h4v4" />
    </>
  ),
  methodology: (
    <>
      <path d="M9 5h10l5 5v17H9z" />
      <path d="M19 5v6h6M13 16h7m-7 4h7" />
    </>
  ),
  source: (
    <>
      <path d="M8 4h11l5 5v17H8z" />
      <path d="M19 4v6h5M12 16h8m-8 4h8" />
    </>
  ),
  arrow: (
    <>
      <path d="M6 16h19" />
      <path d="m18 9 7 7-7 7" />
    </>
  ),
};

export function AppIcon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: AppIconName }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {iconPaths[name]}
    </svg>
  );
}
