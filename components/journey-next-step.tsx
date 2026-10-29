import Link from "next/link";
import { AppIcon } from "@/components/app-icons";

export function JourneyNextStep({
  href,
  stage,
  description,
  messages = {
    nextJourney: "Continue the decision journey",
    continue: "Continue",
  },
}: {
  href: string;
  stage: string;
  description: string;
  messages?: { nextJourney: string; continue: string };
}) {
  return (
    <section
      className="journey-next-step"
      aria-label={`${messages.nextJourney}: ${stage}`}
    >
      <div>
        <p>{messages.nextJourney}</p>
        <h2>{stage}</h2>
        <span>{description}</span>
      </div>
      <Link href={href}>
        {messages.continue}
        <AppIcon name="arrow" />
      </Link>
    </section>
  );
}
