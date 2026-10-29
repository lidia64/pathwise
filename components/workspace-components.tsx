import type { ReactNode } from "react";

export function SectionPanel({
  title,
  description,
  action,
  children,
  className = "",
  id,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={`workspace-panel ${className}`.trim()} id={id}>
      <div className="panel-heading">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function EmptyState({
  title = "Awaiting verified data",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state-mark" aria-hidden="true">
        i
      </span>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

export function DataStatus({
  children = "Awaiting verified data",
}: {
  children?: ReactNode;
}) {
  return (
    <span className="data-status">
      <span aria-hidden="true" />
      {children}
    </span>
  );
}
