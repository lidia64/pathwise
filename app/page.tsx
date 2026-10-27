import { FeatureCard } from "@/components/feature-card";
import { BrandMark } from "@/components/brand-mark";

const features = [
  {
    number: "01",
    icon: "geography" as const,
    title: "Explore geography",
    description:
      "See how verified evidence varies across Rwanda, with clear context for every place and indicator.",
  },
  {
    number: "02",
    icon: "pathways" as const,
    title: "Find pathways",
    description:
      "Explore transparent, evidence-led signals that can help frame questions about resilience.",
  },
  {
    number: "03",
    icon: "impact" as const,
    title: "Monitor impact",
    description:
      "Keep an eye on indicators over time and understand what the evidence can—and cannot—tell you.",
  },
  {
    number: "04",
    icon: "methodology" as const,
    title: "View methodology",
    description:
      "Understand sources, definitions and limitations before drawing conclusions from the data.",
  },
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label="Pathwise home">
            <BrandMark />
            <span className="brand-name">pathwise</span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#explore">Explore</a>
            <a href="#methodology">Methodology</a>
          </nav>

          <a className="button button-small" href="#explore">
            Explore Rwanda
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </header>

      <main id="home">
        <section className="hero" id="about" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="eyebrow-mark" aria-hidden="true" />
                Evidence for a more resilient Rwanda
              </p>
              <h1 id="hero-title">
                From vulnerability
                <br />
                to <span>resilience.</span>
              </h1>
              <p className="hero-description">
                A clearer way to explore financial inclusion, vulnerability and
                social protection evidence—and turn what we learn into better
                questions for decision-making.
              </p>
              <div className="hero-actions">
                <a className="button" href="#explore">
                  Explore Rwanda
                  <span className="button-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <a className="text-link" href="#methodology">
                  How we work
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="hero-footnote">
                <span className="footnote-line" aria-hidden="true" />
                Built for people shaping policy, programmes and research.
              </div>
            </div>

            <div
              className="concept-panel"
              role="img"
              aria-label="Conceptual illustration showing how evidence can connect financial inclusion and vulnerability to potential resilience pathways. This is not a statistical output."
            >
              <div className="concept-panel-top">
                <div>
                  <span className="concept-kicker">A connected view</span>
                  <h2>Make evidence<br />easier to navigate.</h2>
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
                  <span className="pathway-label">Financial inclusion</span>
                  <span className="pathway-caption">Explore access</span>
                </div>
                <div className="pathway-step step-two">
                  <span className="pathway-node">
                    <span />
                  </span>
                  <span className="pathway-label">Vulnerability</span>
                  <span className="pathway-caption">Understand context</span>
                </div>
                <div className="pathway-step step-three">
                  <span className="pathway-node">
                    <span />
                  </span>
                  <span className="pathway-label">Potential pathways</span>
                  <span className="pathway-caption">Consider what’s next</span>
                </div>
              </div>
              <div className="concept-panel-bottom">
                <span className="concept-dot" aria-hidden="true" />
                Conceptual framework — not a statistical output
              </div>
              <div className="concept-decoration decoration-one" aria-hidden="true" />
              <div className="concept-decoration decoration-two" aria-hidden="true" />
            </div>
          </div>
          <div className="hero-rule" aria-hidden="true" />
        </section>

        <section className="problem-section" aria-labelledby="problem-title">
          <div className="section-inner problem-inner">
            <p className="section-label">The challenge</p>
            <div className="problem-copy">
              <h2 id="problem-title">
                Good decisions start with evidence you can trust.
              </h2>
              <p>
                Evidence on financial access, vulnerability and social
                protection can come from different surveys, populations and
                periods. Pathwise is designed to help decision-makers explore
                each source on its own terms, understand its limitations and
                investigate potential pathways—without overstating what the
                data says.
              </p>
            </div>
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
                <p className="section-label">A practical starting point</p>
                <h2 id="features-title">Evidence into perspective.</h2>
              </div>
              <p className="features-intro">
                Explore the questions Pathwise is built to help answer.
              </p>
            </div>
            <div className="feature-grid">
              {features.map((feature) => (
                <FeatureCard key={feature.number} {...feature} />
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
              <p className="section-label">Data &amp; methodology</p>
              <h2 id="methodology-title">
                Transparent by design.
                <br />
                Careful with every claim.
              </h2>
            </div>
            <div className="methodology-note">
              <p>
                Pathwise is being developed around NISR FinScope 2024, EICV7
                2023/24 and relevant EICV7 VUP material. Indicators will only
                be shown when their source, definition, population and reference
                period have been verified. No survey respondents are combined
                across sources.
              </p>
              <p className="note-status">
                <span aria-hidden="true" />
                Statistics pending source verification
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <a className="brand footer-brand" href="#home" aria-label="Pathwise home">
            <BrandMark />
            <span className="brand-name">pathwise</span>
          </a>
          <p className="footer-tagline">From Vulnerability to Resilience.</p>
          <p className="footer-note">
            Decision support grounded in evidence, designed for Rwanda.
          </p>
          <span className="footer-copyright">
            2026 Pathwise <span aria-hidden="true">·</span> NISR Big Data
            Hackathon
          </span>
        </div>
      </footer>
    </>
  );
}
