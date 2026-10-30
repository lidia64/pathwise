import Link from "next/link";
import Image from "next/image";
import { FeatureCard } from "@/components/feature-card";
import { BrandMark } from "@/components/brand-mark";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteFooter } from "@/components/site-footer";
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

const evidenceDomains = [
  {
    titleKey: "landing.financialInclusion",
    title: "Financial inclusion",
    source: "NISR FinScope 2024",
    year: "2024",
  },
  {
    titleKey: "vulnerability.financialHealth",
    title: "Financial health",
    source: "NISR FinScope 2024",
    year: "2024",
  },
  {
    titleKey: "vulnerability.povertyContext",
    title: "Poverty",
    source: "NISR EICV7",
    year: "2023/24",
  },
  {
    titleKey: "landing.livingConditions",
    title: "Household & living conditions",
    source: "NISR EICV7",
    year: "2023/24",
  },
];

const navigatorStages = [
  {
    number: "01",
    title: "Evidence",
    detail: "Review available sources and their limitations.",
    href: "/dashboard",
  },
  {
    number: "02",
    title: "Challenge",
    detail: "Frame a question around the context.",
    href: "/vulnerability",
  },
  {
    number: "03",
    title: "Pathway",
    detail: "Explore options without implying a recommendation.",
    href: "/pathways",
  },
  {
    number: "04",
    title: "Action",
    detail: "Consider action with programme context.",
    href: "/pathways#potential-actions",
  },
  {
    number: "05",
    title: "Monitor",
    detail: "Define measures, timing and limitations.",
    href: "/impact#monitoring-framework",
  },
];

export default async function Home() {
  const { language, translate } = await getMessages();
  const t = translate;
  return (
    <>
      <a className="skip-link" href="#main-content">
        {t(language, "common.skip", "Skip to content")}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label={t(language, "common.home", "Pathwise home")}>
            <BrandMark />
            <span className="brand-name">pathwise</span>
          </a>

          <nav className="main-nav" aria-label={t(language, "nav.main", "Main navigation")}>
            <Link href="/dashboard">{t(language, "landing.explore", "Explore")}</Link>
            <Link href="/pathways">{t(language, "landing.navigator", "Resilience Navigator")}</Link>
            <Link href="/methodology">{t(language, "nav.methodology", "Methodology")}</Link>
            <a href="#about">{t(language, "landing.about", "About")}</a>
          </nav>

          <LanguageSwitcher language={language} />
          <Link className="button button-small" href="/dashboard">
            {t(language, "landing.exploreRwanda", "Explore Rwanda")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                {t(language, "landing.heroEyebrow", "Evidence for a more resilient Rwanda")}
              </p>
              <p className="hero-product-name">PATHWISE RWANDA</p>
              <h1 id="hero-title">
                {t(language, "landing.heroTitle", "From Vulnerability to Resilience")}
              </h1>
              <p className="hero-description">
                {t(language, "landing.heroDescription", "Pathwise transforms verified evidence about financial inclusion, financial health, poverty and vulnerability into clearer pathways for informed action.")}
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
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="hero-footnote">
                {t(language, "landing.heroFootnote", "Built for people shaping policy, programmes and research.")}
              </div>
            </div>

            <figure className="hero-figure">
              <div className="hero-image-frame">
                <Image
                  src="/farmers-gakenke-rwanda.jpg"
                  alt="Farmers travelling to the market in Gakenke, Rwanda."
                  width={1699}
                  height={1565}
                  priority
                  sizes="(max-width: 760px) 100vw, 50vw"
                  className="hero-image"
                />
              </div>
              <figcaption>
                Photo by Dewdrops123. Source:{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Farmers_to_the_market,Gakenke,_Rwanda.jpg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Wikimedia Commons
                </a>
                . License:{" "}
                <a
                  href="https://creativecommons.org/licenses/by-sa/4.0/"
                  target="_blank"
                  rel="noreferrer"
                >
                  CC BY-SA 4.0
                </a>
                . “Farmers to the market, Gakenke, Rwanda.”
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="evidence-section" aria-labelledby="evidence-title">
          <div className="section-inner">
            <div className="evidence-heading">
              <div>
                <p className="section-label">Hidden Vulnerability Lens</p>
                <h2 id="evidence-title">Evidence with its context in view.</h2>
              </div>
              <p>
                Financial inclusion, financial health, poverty and living conditions remain
                distinct evidence domains. Pathwise does not link respondents across surveys.
              </p>
            </div>
            <p className="evidence-status">
              <span aria-hidden="true" />
              No verified statistics are displayed until their source definitions are reviewed.
            </p>
            <div className="evidence-domain-grid">
              {evidenceDomains.map((domain) => (
                <article className="evidence-domain" key={domain.title}>
                  <h3>{t(language, domain.titleKey, domain.title)}</h3>
                  <dl>
                    <div>
                      <dt>Source</dt>
                      <dd>{domain.source}</dd>
                    </div>
                    <div>
                      <dt>Year</dt>
                      <dd>{domain.year}</dd>
                    </div>
                    <div>
                      <dt>Indicator</dt>
                      <dd>Under source review</dd>
                    </div>
                    <div>
                      <dt>Definition</dt>
                      <dd>Awaiting verification against source documentation</dd>
                    </div>
                    <div>
                      <dt>Limitation</dt>
                      <dd>Population and period apply to this source only.</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="problem-section" id="about" aria-labelledby="problem-title">
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
                <p className="section-label">A transparent decision-support workflow</p>
                <h2 id="framework-title">Resilience Navigator</h2>
              </div>
              <p>
                A guided progression for investigation—not a causal model or an automated
                recommendation engine.
              </p>
            </div>
            <ol className="navigator-flow" aria-label="Resilience Navigator stages">
              {navigatorStages.map((stage) => (
                <li key={stage.number}>
                  <Link href={stage.href}>
                    <span className="navigator-number">{stage.number}</span>
                    <span className="navigator-copy">
                      <strong>{stage.title}</strong>
                      <span>{stage.detail}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
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

      <SiteFooter language={language} />
    </>
  );
}
