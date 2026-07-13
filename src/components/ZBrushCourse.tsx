import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { TRANSLATIONS, SOCIAL_LINKS } from '../constants';

const getImageUrl = (name: string) => {
  if (name.startsWith('http://') || name.startsWith('https://')) return name;
  const cleanName = name.replace(/^\.\/?(?:images\/)?/, '');
  
  if (cleanName === '600x600.webp' || cleanName === '1280x720.webp') {
    return `https://wp.vinicavalcanti.com/wp-content/uploads/2026/07/${cleanName}`;
  }
  if (cleanName === 'Banner-scaled.webp') {
    return `https://wp.vinicavalcanti.com/wp-content/uploads/2026/06/${cleanName}`;
  }
  return `https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/${cleanName}`;
};

interface ZBrushCourseProps {
  lang: 'en' | 'pt';
  setLang: (lang: 'en' | 'pt') => void;
}

export default function ZBrushCourse({ lang, setLang }: ZBrushCourseProps) {
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    // 1. Scroll-triggered reveal animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll('.zbrush-page .reveal');

    let revealObserver: IntersectionObserver | null = null;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => { el.classList.add('is-visible'); });
    } else {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
      );
      revealEls.forEach((el) => { revealObserver?.observe(el); });
    }

    // 2. Video playback guard
    const heroVideo = document.querySelector('.zbrush-page .video-frame--hero video') as HTMLVideoElement;
    if (heroVideo) {
      if (prefersReducedMotion) {
        heroVideo.removeAttribute('autoplay');
        heroVideo.pause();
        heroVideo.setAttribute('controls', '');
      } else {
        const tryPlay = () => {
          const p = heroVideo.play();
          if (p && typeof p.catch === 'function') { p.catch(() => {}); }
        };
        tryPlay();
        const resume = () => {
          if (heroVideo.paused) { tryPlay(); }
          document.removeEventListener('touchstart', resume);
          document.removeEventListener('click', resume);
        };
        document.addEventListener('touchstart', resume, { passive: true });
        document.addEventListener('click', resume);
      }
    }

    // 3. Sticky mobile CTA
    const stickyCta = document.getElementById('zbrush-sticky-cta');
    const hero = document.querySelector('.zbrush-page .hero');
    const pricing = document.getElementById('pricing');

    let heroObserver: IntersectionObserver | null = null;
    let pricingObserver: IntersectionObserver | null = null;

    if (stickyCta && hero && pricing && 'IntersectionObserver' in window) {
      stickyCta.removeAttribute('hidden');
      let heroVisible = true;
      let pricingVisible = false;

      const updateCtaVisibility = () => {
        if (!heroVisible && !pricingVisible) {
          stickyCta.classList.add('is-visible');
        } else {
          stickyCta.classList.remove('is-visible');
        }
      };

      heroObserver = new IntersectionObserver((entries) => {
        heroVisible = entries[0].isIntersecting;
        updateCtaVisibility();
      }, { threshold: 0.15 });

      pricingObserver = new IntersectionObserver((entries) => {
        pricingVisible = entries[0].isIntersecting;
        updateCtaVisibility();
      }, { threshold: 0.2 });

      heroObserver.observe(hero);
      pricingObserver.observe(pricing);
    }

    return () => {
      if (revealObserver) revealObserver.disconnect();
      if (heroObserver) heroObserver.disconnect();
      if (pricingObserver) pricingObserver.disconnect();
    };
  }, []);

  return (
    <div className="zbrush-page min-h-screen bg-[#FCFBF8] text-[#060606] selection:bg-[#EF7722]/10 selection:text-[#EF7722]">
      {/* Replicated site-header */}
      <Navbar lang={lang} setLang={setLang} t={t.nav} />

      <main>
        {/* SECTION: hero (navy course color, autoplay turntable) */}
        <section className="hero section--pattern-light">
          <div className="container hero__grid">
            <div className="hero__content reveal">
              <div className="hero__badges">
                <span className="eyebrow eyebrow--course">Course</span>
                <span className="badge badge--hero">Beginner / Intermediate</span>
                <span className="badge badge--hero">EN (PT Subtitles)</span>
                <span className="badge badge--hero">6h30min</span>
                <span className="badge badge--hero">ZBrush</span>
              </div>
              <h1 className="h-display">ZBrush for <span className="accent-orange">Stylized Characters</span>.</h1>
              <p className="hero__sub">From concept to finished sculpt — the complete process for designing and sculpting original stylized characters with an identity of their own.</p>
              <div className="hero__cta-row">
                <a 
                  href="https://pay.hotmart.com/J105527673H" 
                  id="zbrush-buy-hero" 
                  className="btn btn--primary btn-compra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Start now!
                </a>
                <div className="hero__price">
                  <span className="hero__price-label">Price</span>
                  <span className="hero__price-value">$49</span>
                  <span className="hero__price-note">One-time · Lifetime access</span>
                </div>
              </div>
            </div>
            <div className="hero__media reveal">
              <div className="video-frame video-frame--hero">
                <video autoPlay muted loop playsInline preload="metadata" poster={getImageUrl('1280x720.webp')} aria-label="Turntable of the stylized character sculpted in the course">
                  <source src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/07/Turnable_Zbrush-1.webm" type="video/webm" />
                </video>
              </div>
              <p className="hero__media-caption">Real-time turntable — the sculpt you'll build in this course.</p>
            </div>
          </div>
        </section>

        {/* SECTION: studios (authority strip) */}
        <section className="section section--compact studios">
          <div className="container reveal">
            <p className="studios__line">Taught by a <strong>Senior Character Artist</strong> who lives this process every day inside real studios.</p>
            <div className="studios__row">
              <span>E-Line Media</span>
              <span>Angel Studios</span>
              <span>PUGA Studios</span>
            </div>
          </div>
        </section>

        {/* SECTION: modules (lessons included) */}
        <section className="section" id="modules">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--orange">Lessons included</span>
              <h2 className="h-display">Everything you'll learn</h2>
              <p className="section__lead">The same four blocks Vini uses in production — creative decisions and technical execution, side by side.</p>
            </div>
            <div className="grid-4">
              <article className="card module-card reveal">
                <span className="module-card__num">01</span>
                <h3>Design and volume</h3>
                <p>Read a concept like a character artist and translate it into strong primary volumes.</p>
              </article>
              <article className="card module-card module-card--blue reveal">
                <span className="module-card__num">02</span>
                <h3>Form language</h3>
                <p>Shape vocabulary and silhouette control — what makes a character feel intentional.</p>
              </article>
              <article className="card module-card reveal">
                <span className="module-card__num">03</span>
                <h3>Stylized sculpting</h3>
                <p>Sculpt personality, not just polygons. Build the character's identity directly in 3D.</p>
              </article>
              <article className="card module-card module-card--blue reveal">
                <span className="module-card__num">04</span>
                <h3>Final refinement</h3>
                <p>Surface polish, detailing and presentation for a portfolio-ready final sculpt.</p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION: identity (statement + render) */}
        <section className="section section--navy section--pattern-light identity">
          <div className="container identity__grid">
            <div className="identity__media reveal">
              <img src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/07/600x600.webp" alt="Final render of the stylized character created in the course" width="600" height="600" loading="lazy" decoding="async" />
            </div>
            <div className="identity__body reveal">
              <h2 className="h-display">You can use ZBrush.<br />Now make it look like <span className="accent-orange">yours</span>.</h2>
              <p>This course is not about tools. It's about the creative decisions that give a sculpt an identity — taught by a Visual Development artist, from blockout to final.</p>
              <a 
                href="https://pay.hotmart.com/J105527673H" 
                id="zbrush-buy-identity" 
                className="btn btn--inverse btn-compra" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Start sculpting today
              </a>
            </div>
          </div>
        </section>

        {/* SECTION: bonuses */}
        <section className="section section--orange" id="bonuses">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--orange">Exclusive student bonus</span>
              <h2 className="h-display">Four bonuses included</h2>
            </div>
            <div className="grid-4">
              <article className="card bonus-card reveal">
                <h3>Topology basemesh</h3>
                <p>Exclusive basemesh to jump straight into sculpting with clean topology.</p>
              </article>
              <article className="card bonus-card reveal">
                <h3>Brush pack</h3>
                <p>The brushes Vini actually uses in production, ready to install.</p>
              </article>
              <article className="card bonus-card reveal">
                <h3>Custom ZBrush UI</h3>
                <p>Vini's own interface layout, built for a faster stylized workflow.</p>
              </article>
              <article className="card bonus-card reveal">
                <h3>30% off TopoGun 3</h3>
                <p>Discount on the TopoGun 3 Perpetual License for your retopology stage.</p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION: instructor */}
        <section className="section instructor" id="instructor">
          <div className="container instructor__grid">
            <div className="instructor__photo reveal">
              <img src={getImageUrl('about_vini_photo.webp')} alt="Vini Cavalcanti, Senior 3D Character Artist" width="490" height="760" loading="lazy" decoding="async" />
            </div>
            <div className="instructor__body reveal">
              <span className="eyebrow eyebrow--blue">Your instructor</span>
              <h2 className="h-display">Learn from someone who's inside the industry, not just talking about it.</h2>
              <p className="instructor__bio">Hi, I'm <span className="accent-orange"><strong>Vini Cavalcanti</strong></span> — <strong>Senior 3D Character Artist</strong> with <strong><em>10+ years of experience</em></strong> in games and entertainment, focused on <em>visual development</em> and <em>stylized characters</em>. Currently at <strong>E-Line Media</strong> on <strong>Endstar</strong>, with credits on <em>The Wingfeather Saga</em> (<strong>Angel Studios</strong>) and games like <em>Wonderbox</em> at <strong>PUGA Studios</strong>.</p>
              <div className="instructor__pills">
                <span>Senior Artist</span>
                <span>10+ years exp</span>
                <span>Industry active</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: pricing */}
        <section className="section" id="pricing">
          <div className="container pricing">
            <div className="card card--lg pricing__card reveal">
              <div className="pricing__badges">
                <span className="badge badge--limited">Lifetime access</span>
                <span className="badge badge--oneonone">EN · PT Subtitles</span>
              </div>
              <h3 className="h-display">ZBrush for Stylized Characters</h3>
              <ul className="pricing__includes">
                <li>6h30min of video lessons</li>
                <li>4 modules, from concept to final sculpt</li>
                <li>Exclusive topology basemesh + brush pack</li>
                <li>Custom ZBrush UI</li>
                <li>30% off TopoGun 3 Perpetual License</li>
                <li>15-day money-back guarantee</li>
              </ul>
              <div className="pricing__price-row">
                <span className="pricing__price">$49</span>
                <span className="pricing__price-note">one-time payment</span>
              </div>
              <div className="pricing__cta">
                <a 
                  href="https://pay.hotmart.com/J105527673H" 
                  id="zbrush-buy-pricing" 
                  className="btn btn--primary btn-compra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Start now!
                </a>
              </div>
              <p className="pricing__scarcity">Secure checkout via Hotmart. Study at your own pace, come back to the lessons whenever you want.</p>
            </div>
          </div>
        </section>

        {/* SECTION: faq */}
        <section className="section faq" id="faq">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--orange">FAQ</span>
              <h2 className="h-display">Frequently asked questions</h2>
            </div>
            <div className="faq__list">
              <details className="faq__item reveal">
                <summary>Do I need prior experience in 3D? <span className="faq__icon">+</span></summary>
                <p className="faq__answer">The course is designed for beginner and intermediate artists. Basic familiarity with ZBrush navigation helps, but every creative and technical decision is explained step by step.</p>
              </details>
              <details className="faq__item reveal">
                <summary>What software will I need? <span className="faq__icon">+</span></summary>
                <p className="faq__answer">ZBrush is the only software required for the course. The TopoGun 3 discount is a bonus for when you move into retopology — it's not needed to follow the lessons.</p>
              </details>
              <details className="faq__item reveal">
                <summary>Is there a deadline to finish? <span className="faq__icon">+</span></summary>
                <p className="faq__answer">No. After purchase, access is lifetime. Study at your own pace and come back to the content as many times as you want.</p>
              </details>
              <details className="faq__item reveal">
                <summary>Is the course in English or Portuguese? <span className="faq__icon">+</span></summary>
                <p className="faq__answer">The lessons are in English with Portuguese subtitles.</p>
              </details>
              <details className="faq__item reveal">
                <summary>What if I'm not happy with the course? <span className="faq__icon">+</span></summary>
                <p className="faq__answer">You have a 15-day money-back guarantee after purchase — plenty of time to explore the content and decide whether it's the right fit for you.</p>
              </details>
            </div>
          </div>
        </section>

        {/* SECTION: final-cta */}
        <section className="section final-cta final-cta--band section--pattern-light">
          <div className="container reveal">
            <h2 className="h-display">One sculpt. One workflow.<br />Yours forever.</h2>
            <p>From concept to finished sculpt, with every decision explained.</p>
            <div className="final-cta__row">
              <a 
                href="https://pay.hotmart.com/J105527673H" 
                id="zbrush-buy-final" 
                className="btn btn--inverse btn-compra" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Start now! — $49
              </a>
            </div>
          </div>
        </section>

        {/* SECTION: sticky-cta (mobile only) */}
        <div className="sticky-cta" id="zbrush-sticky-cta" hidden>
          <div className="sticky-cta__price">
            <span className="sticky-cta__label">
              {lang === 'en' ? 'ZBrush course' : 'Curso de ZBrush'}
            </span>
            <span className="sticky-cta__value">$49</span>
          </div>
          <a 
            href="https://pay.hotmart.com/J105527673H" 
            id="zbrush-buy-sticky" 
            className="btn btn--primary btn--sm btn-compra" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {lang === 'en' ? 'Get this course' : 'Garantir vaga'}
          </a>
        </div>
      </main>

      {/* Replicated site-footer */}
      <Footer t={t.footer} socialLinks={SOCIAL_LINKS} />
    </div>
  );
}
