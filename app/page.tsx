import Link from "next/link";
import { FeatureCard } from "@/components/feature-card";
import { BrandMark } from "@/components/brand-mark";
import { DecisionFlow } from "@/components/decision-flow";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getMessages } from "@/lib/i18n/server";

const features = [
  {
    number: "01",
    icon: "geography" as const,
    href: "/geography",
    titleKey: "landing.featureGeography",
    descriptionKey: "landing.featureGeographyCopy",
    title: "Explore geography",
    description:
      "See how verified evidence varies across Rwanda, with clear context for every place and indicator.",
  },
  {
    number: "02",
    icon: "pathways" as const,
    href: "/pathways",
    titleKey: "landing.featurePathways",
    descriptionKey: "landing.featurePathwaysCopy",
    title: "Find pathways",
    description:
      "Explore transparent, evidence-led signals that can help frame questions about resilience.",
  },
  {
    number: "03",
    icon: "impact" as const,
    href: "/impact",
    titleKey: "landing.featureImpact",
    descriptionKey: "landing.featureImpactCopy",
    title: "Monitor impact",
    description:
      "Keep an eye on indicators over time and understand what the evidence can—and cannot—tell you.",
  },
  {
    number: "04",
    icon: "methodology" as const,
    href: "/methodology",
    titleKey: "landing.featureMethodology",
    descriptionKey: "landing.featureMethodologyCopy",
    title: "View methodology",
    description:
      "Understand sources, definitions and limitations before drawing conclusions from the data.",
  },
];

export default async function Home() {
  const { language, translate } = await getMessages();
  const t = translate;
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label={t(language, "common.home", "Pathwise home")}>
            <BrandMark />
            <span className="brand-name">pathwise</span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="#about">{t(language, "landing.about", "About")}</a>
            <Link href="/dashboard">{t(language, "landing.explore", "Explore")}</Link>
            <Link href="/methodology">{t(language, "nav.methodology", "Methodology")}</Link>
          </nav>

          <LanguageSwitcher language={language} />
          <Link className="button button-small" href="/dashboard">
            {t(language, "landing.exploreRwanda", "Explore Rwanda")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>

      <main id="home">
        <section className="hero" id="about" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="eyebrow-mark" aria-hidden="true" />
                {t(language, "landing.heroEyebrow", "Evidence for a more resilient Rwanda")}
              </p>
              <h1 id="hero-title">
                {t(language, "landing.heroTitle", "From vulnerability to resilience.")}
              </h1>
              <p className="hero-description">
                {t(language, "landing.heroDescription", "A clearer way to explore financial inclusion, vulnerability and social protection evidence—and turn what we learn into better questions for decision-making.")}
              </p>
              <div className="hero-actions">
                <Link className="button" href="/dashboard">
                  {t(language, "landing.exploreRwanda", "Explore Rwanda")}
                  <span className="button-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link className="text-link" href="/methodology">
                  {t(language, "landing.howWeWork", "How we work")}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className="hero-footnote">
                <span className="footnote-line" aria-hidden="true" />
                {t(language, "landing.heroFootnote", "Built for people shaping policy, programmes and research.")}
              </div>
            </div>

            <div
              className="concept-panel"
              role="img"
              aria-label="Conceptual illustration showing how evidence can connect financial inclusion and vulnerability to potential resilience pathways. This is not a statistical output."
            >
              <div className="concept-panel-top">
                <div>
                  <span className="concept-kicker">{t(language, "landing.conceptKicker", "A connected view")}</span>
                  <h2>{t(language, "landing.conceptTitle", "Make evidence easier to navigate.")}</h2>
                </div>
                <div className="concept-emblem" aria-hidden="true">
                  <BrandMark />
                </div>
              </div>
              <div className="pathway-visual" aria-hidden="true">
                <div className="pathway-rail" />
                <div className="pathway-step step-one">
                  <span className="pathway-node">
                    <span />
                  </span>
                  <span className="pathway-label">{t(language, "landing.financialInclusion", "Financial inclusion")}</span>
                  <span className="pathway-caption">{t(language, "landing.exploreAccess", "Explore access")}</span>
                </div>
                <div className="pathway-step step-two">
                  <span className="pathway-node">
                    <span />
                  </span>
                  <span className="pathway-label">{t(language, "landing.vulnerability", "Vulnerability")}</span>
                  <span className="pathway-caption">{t(language, "landing.understandContext", "Understand context")}</span>
                </div>
                <div className="pathway-step step-three">
                  <span className="pathway-node">
                    <span />
                  </span>
                  <span className="pathway-label">{t(language, "landing.potentialPathways", "Potential pathways")}</span>
                  <span className="pathway-caption">{t(language, "landing.considerNext", "Consider what’s next")}</span>
                </div>
              </div>
              <div className="concept-panel-bottom">
                <span className="concept-dot" aria-hidden="true" />
                {t(language, "landing.conceptDisclaimer", "Conceptual framework — not a statistical output")}
              </div>
              <div className="concept-decoration decoration-one" aria-hidden="true" />
              <div className="concept-decoration decoration-two" aria-hidden="true" />
            </div>
          </div>
          <div className="hero-rule" aria-hidden="true" />
        </section>

        <section className="problem-section" aria-labelledby="problem-title">
          <div className="section-inner problem-inner">
            <p className="section-label">{t(language, "landing.challenge", "The challenge")}</p>
            <div className="problem-copy">
              <h2 id="problem-title">
                {t(language, "landing.challengeTitle", "Good decisions start with evidence you can trust.")}
              </h2>
              <p>
                {t(language, "landing.challengeCopy", "Evidence on financial access, vulnerability and social protection can come from different surveys, populations and periods. Pathwise is designed to help decision-makers explore each source on its own terms, understand its limitations and investigate potential pathways—without overstating what the data says.")}
              </p>
            </div>
          </div>
        </section>

        <section
          className="framework-section"
          aria-labelledby="framework-title"
        >
          <div className="section-inner">
            <div className="framework-heading">
              <div>
                <p className="section-label">{t(language, "landing.frameworkEyebrow", "How Pathwise works")}</p>
                <h2 id="framework-title">{t(language, "landing.frameworkTitle", "From evidence to a decision trail.")}</h2>
              </div>
              <p>
                {t(language, "landing.frameworkDescription", "A transparent framework for investigation—not a causal model or an automated recommendation engine.")}
              </p>
            </div>
            <DecisionFlow language={language} />
          </div>
        </section>

        <section
          className="features-section"
          id="explore"
          aria-labelledby="features-title"
        >
          <div className="section-inner">
            <div className="features-heading">
              <div>
                <p className="section-label">{t(language, "landing.featuresEyebrow", "A practical starting point")}</p>
                <h2 id="features-title">{t(language, "landing.featuresTitle", "Evidence into perspective.")}</h2>
              </div>
              <p className="features-intro">
                {t(language, "landing.featuresIntro", "Explore the questions Pathwise is built to help answer.")}
              </p>
            </div>
            <div className="feature-grid">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.number}
                  {...feature}
                  title={t(language, feature.titleKey, feature.title)}
                  description={t(language, feature.descriptionKey, feature.description)}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          className="methodology-section"
          id="methodology"
          aria-labelledby="methodology-title"
        >
          <div className="section-inner methodology-inner">
            <div className="methodology-icon" aria-hidden="true">
              <BrandMark />
            </div>
            <div className="methodology-copy">
              <p className="section-label">{t(language, "landing.methodEyebrow", "Data & methodology")}</p>
              <h2 id="methodology-title">
                {t(language, "landing.methodTitle", "Transparent by design. Careful with every claim.")}
              </h2>
            </div>
            <div className="methodology-note">
              <p>
                {t(language, "landing.methodCopy", "Pathwise is being developed around NISR FinScope 2024, EICV7 2023/24 and relevant EICV7 VUP material. Indicators will only be shown when their source, definition, population and reference period have been verified. No survey respondents are combined across sources.")}
              </p>
              <p className="note-status">
                <span aria-hidden="true" />
                {t(language, "landing.statisticsPending", "Statistics pending source verification")}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <a className="brand footer-brand" href="#home" aria-label={t(language, "common.home", "Pathwise home")}>
            <BrandMark />
            <span className="brand-name">pathwise</span>
          </a>
          <p className="footer-tagline">{t(language, "common.tagline", "From Vulnerability to Resilience.")}</p>
          <p className="footer-note">
            {t(language, "landing.footerNote", "Decision support grounded in evidence, designed for Rwanda.")}
          </p>
          <span className="footer-copyright">
            {t(language, "landing.copyright", "2026 Pathwise · NISR Big Data Hackathon")}
          </span>
        </div>
      </footer>
    </>
  );
}
