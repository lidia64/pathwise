import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { getRequestLanguage } from "@/lib/i18n/server";
import "../workspace.css";

export default async function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  const language = await getRequestLanguage();
  return <AppShell language={language}>{children}</AppShell>;
}
