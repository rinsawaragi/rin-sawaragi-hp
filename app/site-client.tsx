"use client";

import { useEffect, useState } from "react";
import { siteData } from "./site-data";

const navItems = [
  ["Works", "works"],
  ["Services & Pricing", "services"],
  ["Flow", "flow"],
  ["FAQ", "faq"],
  ["Contact", "contact"],
] as const;

function Header() {
  const [revealed, setRevealed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reveal = () => {
      if (window.scrollY > window.innerHeight * 0.42) setRevealed(true);
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <header className={`site-header${revealed ? " is-visible" : ""}`}>
      <div className="header-inner">
        <a className="header-logo" href="#hero" aria-label="Heroへ戻る">
          <img
            src={siteData.assets.logo}
            alt="RS"
            width="1254"
            height="1254"
          />
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav
          id="mobile-menu"
          className={`mobile-nav${menuOpen ? " is-open" : ""}`}
          aria-label="モバイルナビゲーション"
        >
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const update = () => {
      const works = document.getElementById("works");
      if (works) setShowScroll(window.scrollY < works.offsetTop - 160);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="hero-brand">
          <div className="hero-logo-wrap" aria-hidden="true">
            <img
              src={siteData.assets.logo}
              alt=""
              width="1254"
              height="1254"
            />
          </div>
          <h1 id="hero-title">{siteData.brand.name}</h1>
          <p className="hero-role">{siteData.brand.title}</p>
          <div className="hero-actions">
            <a className="button" href="#works">
              View Works
            </a>
            <a className="button" href="#contact">
              Contact
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Rin Sawaragiの立ち絵">
          <img
            src={siteData.assets.character}
            alt="Rin Sawaragi 立ち絵"
            width="4200"
            height="8400"
            fetchPriority="high"
          />
        </div>
      </div>
      <a
        className={`scroll-indicator${showScroll ? "" : " is-hidden"}`}
        href="#works"
        aria-hidden={!showScroll}
        tabIndex={showScroll ? 0 : -1}
      >
        <span>Scroll</span>
        <span className="chevron" aria-hidden="true" />
      </a>
    </section>
  );
}

function WorkItem({ work }: { work: (typeof siteData.works)[number] }) {
  return (
    <article className="work-item">
      <p className="work-label">{work.label}</p>
      <div className="work-media">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${work.youtubeId}`}
          title={`${work.title} YouTube player`}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          loading="lazy"
          allowFullScreen
        />
      </div>
      <h3>{work.title}</h3>
      <p className="work-role">{work.role}</p>
    </article>
  );
}

function Works() {
  return (
    <section id="works" className="section works" aria-labelledby="works-title">
      <div className="section-inner">
        <div className="section-heading">
          <h2 id="works-title">Works</h2>
        </div>
        <div className="works-grid">
          {siteData.works.map((work) => (
            <WorkItem key={work.id} work={work} />
          ))}
        </div>
        <div className="section-cta">
          <a
            className="button"
            href={siteData.links.worksPlaylist}
            target="_blank"
            rel="noreferrer"
          >
            View All Works on YouTube
            <span className="external-mark" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section
      id="services"
      className="section services reveal"
      aria-labelledby="services-title"
    >
      <div className="section-inner">
        <div className="section-heading">
          <h2 id="services-title">Services &amp; Pricing</h2>
        </div>

        <div className="pricing-block">
          <h3 className="subsection-title">Packages</h3>
          <div className="packages-grid">
            {siteData.packages.map((service) => (
              <article
                key={service.name}
                className={`package-item${
                  "featured" in service && service.featured
                    ? " is-featured"
                    : ""
                }`}
              >
                <div className="package-copy">
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>
                </div>
                <p className="price">{service.price}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="pricing-block options-block">
          <h3 className="subsection-title">Options</h3>
          <div className="options-list">
            {siteData.options.map((option) => (
              <article className="option-item" key={option.name}>
                <div>
                  <h4>{option.name}</h4>
                  <p>{option.description}</p>
                </div>
                <p className="price">{option.price}</p>
              </article>
            ))}
          </div>
          <div className="pricing-notes">
            <p>※表示価格はすべて税抜です。</p>
            <p>
              ※掲載価格は最低料金の目安です。楽曲の内容・仕様・制作規模に応じてお見積りいたします。
            </p>
            <p>※掲載内容以外のご要望についても、お気軽にご相談ください。</p>
          </div>
        </div>

        <div className="service-policies">
          <article className="policy-item">
            <h3>Delivery Time</h3>
            <p className="policy-label">現在の納期目安</p>
            <p className="delivery-value">{siteData.deliveryTime}</p>
            <p className="policy-note">
              ※納期は受注状況・ご依頼内容により変動します。
            </p>
          </article>
          <article className="policy-item">
            <h3>Revision Policy</h3>
            <p className="policy-body">
              お打ち合わせ時に確定した内容の範囲内であれば、ご納得いただけるまで修正対応いたします。
            </p>
            <p className="policy-note">
              ※制作開始後の仕様変更や大幅な方向性の変更については、追加料金をご案内する場合があります。
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function ProductionFlow() {
  return (
    <section
      id="flow"
      className="section flow reveal"
      aria-labelledby="flow-title"
    >
      <div className="section-inner">
        <div className="section-heading">
          <h2 id="flow-title">Production Flow</h2>
        </div>
        <ol className="flow-list">
          {siteData.flow.map((step, index) => (
            <li key={step.title}>
              <p className="step-number">{String(index + 1).padStart(2, "0")}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="section faq reveal" aria-labelledby="faq-title">
      <div className="section-inner faq-inner">
        <div className="section-heading">
          <h2 id="faq-title">FAQ</h2>
        </div>
        <div className="faq-list">
          {siteData.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                <span>{faq.question}</span>
                <span className="faq-control" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                {faq.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="section contact reveal"
      aria-labelledby="contact-title"
    >
      <div className="contact-inner">
        <h2 id="contact-title">Contact</h2>
        <p className="contact-copy">
          ご依頼・ご相談は、下記フォームよりお気軽にお問い合わせください。
        </p>
        <a
          className="button contact-button"
          href={siteData.links.contactForm}
          target="_blank"
          rel="noreferrer"
        >
          Contact Form
          <span className="external-mark" aria-hidden="true">↗</span>
          <span className="sr-only">（新しいタブで開く）</span>
        </a>
        <p className="contact-secondary">
          Xでもご連絡いただけます。
          <a href={siteData.links.x} target="_blank" rel="noreferrer">
            X<span className="sr-only">（新しいタブで開く）</span>
          </a>
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            src={siteData.assets.logo}
            alt="RS"
            width="1254"
            height="1254"
          />
          <div>
            <p className="footer-name">{siteData.brand.name}</p>
            <p className="footer-role">{siteData.brand.title}</p>
          </div>
        </div>
        <nav className="footer-nav" aria-label="フッターナビゲーション">
          <a href={siteData.links.x} target="_blank" rel="noreferrer">
            X<span className="sr-only">（新しいタブで開く）</span>
          </a>
          <a href={siteData.links.youtube} target="_blank" rel="noreferrer">
            YouTube<span className="sr-only">（新しいタブで開く）</span>
          </a>
          <a href={siteData.links.twitch} target="_blank" rel="noreferrer">
            Twitch<span className="sr-only">（新しいタブで開く）</span>
          </a>
        </nav>
      </div>
      <div className="footer-bottom">© Rin Sawaragi</div>
    </footer>
  );
}

export function SiteClient() {
  useEffect(() => {
    document.body.classList.add("reveal-ready");
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.body.classList.remove("reveal-ready");
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Works />
        <Services />
        <ProductionFlow />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
