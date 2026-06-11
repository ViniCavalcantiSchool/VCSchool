import React, { useEffect } from 'react';
import Navbar from './Navbar';

const getImageUrl = (name: string) => {
  if (name.startsWith('http://') || name.startsWith('https://')) return name;
  const cleanName = name.replace(/^(\.\/)?images\//, '');
  return `https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/${cleanName}`;
};

interface OneOnOneMentorshipProps {
  lang: 'en' | 'pt';
  setLang: (lang: 'en' | 'pt') => void;
  t: any;
}

export default function OneOnOneMentorship({ lang, setLang, t }: OneOnOneMentorshipProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll('.reveal');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => { el.classList.add('is-visible'); });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    revealEls.forEach((el) => { observer.observe(el); });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#060606] selection:bg-[#EF7722]/10 selection:text-[#EF7722]">
      {/* SECTION: header */}
      <Navbar lang={lang} setLang={setLang} t={t.nav} />

      <main>
        {/* SECTION: hero */}
        <section className="hero">
          <div className="container hero__grid">
            <div>
              <div className="hero__badges">
                <span className="badge badge--limited">Limited Spots</span>
                <span className="badge badge--oneonone">One-on-One Mentorship</span>
                <span className="badge badge--neutral">Season 2 · 10 Weeks</span>
              </div>
              <h1 className="h-display">Finish a portfolio-ready character with a Senior Artist reviewing every step.</h1>
              <p className="hero__sub">Ten weeks of direct, one-on-one guidance from a Senior 3D Character Artist who works inside real studios every day. Not a recorded course. Not a cohort. Your work, on screen, every single week.</p>
              <div className="hero__cta-row">
                <a 
                  href="https://pay.hotmart.com/D105581670W?bid=1781143563417" 
                  className="btn btn--primary" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Start Now!
                </a>
                <div className="hero__price">
                  <span className="hero__price-label">Investment</span>
                  <span className="hero__price-value">$600</span>
                  <span className="hero__price-note">or 3 payments</span>
                </div>
              </div>
              <div className="hero__studios">
                <span>E-Line Media · Endstar</span>
                <span>Angel Studios · The Wingfeather Saga</span>
                <span>PUGA Studios · Wonderbox, Dice Dreams</span>
              </div>
            </div>
            <div className="hero__media">
              <img 
                src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/06/Banner-scaled.webp" 
                alt="Stylized 3D character with a stack of books, created by Vini Cavalcanti" 
                width="400" 
                height="400" 
                loading="eager" 
                fetchpriority="high" 
              />
            </div>
          </div>
        </section>

        {/* SECTION: problem */}
        <section className="section">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--orange">The real bottleneck</span>
              <h2 className="h-display">Tutorials taught you the tools.<br />Nobody is looking at <em>your</em> work.</h2>
              <p className="section__lead">The industry got harder. Junior roles are scarce, and your portfolio competes with laid-off artists with years of studio experience. What separates the artists who break in is not more content. It's targeted feedback from someone who knows what studios actually look for.</p>
            </div>
            <div className="grid-3">
              <article className="card pain-card reveal">
                <div className="pain-card__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" x2="12.01" y1="17" y2="17" />
                  </svg>
                </div>
                <h3>You don't know why it's not working</h3>
                <p>Your sculpt looks "almost right" and you can't see what's off. Forum feedback is shallow and slow. Without trained eyes on your work, you repeat the same mistakes for months.</p>
              </article>
              <article class="card pain-card reveal">
                <div className="pain-card__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                </div>
                <h3>You never finish the full pipeline</h3>
                <p>You can sculpt, but blockout to grooming to final render is a different game. Studios hire artists who can close a character, and unfinished projects don't make a portfolio.</p>
              </article>
              <article className="card pain-card reveal">
                <div className="pain-card__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3>You're learning alone</h3>
                <p>Self-taught means self-doubting. No one tells you if you're on the right path, what to study next, or whether your work is getting closer to industry level.</p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION: not-a-course */}
        <section className="section section--blue">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--blue">This is not a course</span>
              <h2 className="h-display">It's a mentorship. The difference is who's looking at your work.</h2>
            </div>
            <div className="compare">
              <article className="card compare__card reveal">
                <h3>Recorded course</h3>
                <ul>
                  <li>You watch someone else's character get built.</li>
                  <li>Zero feedback on your own work.</li>
                  <li>When you get stuck, you're on your own.</li>
                </ul>
              </article>
              <article className="card compare__card reveal">
                <h3>Cohort / bootcamp</h3>
                <ul>
                  <li>One instructor split across 15–30 students.</li>
                  <li>Minutes of attention on your piece, if any.</li>
                  <li>The pace is the group's, not yours.</li>
                </ul>
              </article>
              <article className="card compare__card compare__card--highlight reveal">
                <span className="badge badge--oneonone compare__tag">This program</span>
                <h3>One-on-one mentorship</h3>
                <ul>
                  <li>Every session is about your character, your file, your decisions.</li>
                  <li>A Senior Artist correcting your course every week.</li>
                  <li>Structured 10-week path with a finished piece at the end.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION: how-it-works */}
        <section className="section">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--orange">How it works</span>
              <h2 className="h-display">A simple weekly rhythm, built around you.</h2>
            </div>
            <div className="grid-4">
              <article className="card how-card reveal">
                <div className="how-card__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                    <path d="m9 16 2 2 4-4" />
                  </svg>
                </div>
                <span className="how-card__step">Every week</span>
                <h3>Live 1-on-1 session</h3>
                <p>A weekly live feedback session on Google Meet, just you and Vini. You pick the time slot that works in your time zone.</p>
              </article>
              <article className="card how-card reveal">
                <div className="how-card__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  </svg>
                </div>
                <span className="how-card__step">Between sessions</span>
                <h3>Private Discord</h3>
                <p>Direct access in a private mentorship channel. Post your progress, ask questions, get unstuck without waiting for the next call.</p>
              </article>
              <article className="card how-card reveal">
                <div className="how-card__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 7v14" />
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                  </svg>
                </div>
                <span className="how-card__step">On your schedule</span>
                <h3>Structured lessons</h3>
                <p>Each week's topic comes with lessons available on the learning platform, so session time goes to your work, not to basics.</p>
              </article>
              <article className="card how-card reveal">
                <div className="how-card__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
                <span className="how-card__step">After 10 weeks</span>
                <h3>One complete character</h3>
                <p>From the very first blockout to a portfolio-ready final render, with feedback and support at every stage of the process.</p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION: software */}
        <section className="section section--compact">
          <div className="container">
            <div className="section__head section__head--tight reveal">
              <span className="eyebrow eyebrow--blue">Industry tools</span>
              <h2 className="h-display">The software you'll master.</h2>
            </div>
            <div className="software__row reveal">
              <div className="software__pill">
                <img 
                  src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/06/Zbrush_Logo-scaled.webp" 
                  alt="ZBrush" 
                  className="software__logo" 
                  loading="lazy" 
                />
                <span className="software__role">sculpting</span>
              </div>
              <div className="software__pill">
                <img 
                  src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/06/blender_logo.webp" 
                  alt="Blender" 
                  className="software__logo" 
                  loading="lazy" 
                />
                <span className="software__role">modeling</span>
              </div>
              <div className="software__pill">
                <img 
                  src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/06/SubstancePainter.webp" 
                  alt="Substance Painter" 
                  className="software__logo software__logo--icon" 
                  loading="lazy" 
                />
                <span>Substance Painter <span className="software__role">texturing</span></span>
              </div>
              <div className="software__pill">
                <img 
                  src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/06/Houdini_black_color.webp" 
                  alt="Houdini" 
                  className="software__logo" 
                  loading="lazy" 
                />
                <span className="software__role">grooming &amp; render, optional</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: journey */}
        <section className="section" id="schedule">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--blue">Mentorship schedule</span>
              <h2 className="h-display">The 10-week journey</h2>
              <p className="section__lead">A complete character pipeline: sculpture in ZBrush and Blender, texturing in Substance Painter, grooming and rendering in Houdini.</p>
            </div>

            <div className="pipeline reveal" aria-label="The stages your character goes through">
              <div className="pipeline__item">
                <img 
                  src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/06/Blockout.webp" 
                  alt="Gray blockout of a 3D character" 
                  width="200" 
                  height="200" 
                  loading="lazy" 
                />
                <span>Blockout</span>
              </div>
              <div className="pipeline__item">
                <img 
                  src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/06/Retopology.webp" 
                  alt="Character face with retopology wireframe" 
                  width="200" 
                  height="200" 
                  loading="lazy" 
                />
                <span>Retopology</span>
              </div>
              <div className="pipeline__item">
                <img 
                  src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/06/UVs.webp" 
                  alt="Unwrapped UV layout of a character" 
                  width="200" 
                  height="200" 
                  loading="lazy" 
                />
                <span>UVs &amp; Baking</span>
              </div>
              <div className="pipeline__item">
                <img 
                  src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/06/Texture.webp" 
                  alt="Textured 3D character bust" 
                  width="200" 
                  height="200" 
                  loading="lazy" 
                />
                <span>Texturing</span>
              </div>
              <div className="pipeline__item">
                <img 
                  src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/06/Rendering.webp" 
                  alt="Final rendered 3D character" 
                  width="200" 
                  height="200" 
                  loading="lazy" 
                />
                <span>Final Render</span>
              </div>
            </div>

            <div className="card card--lg journey-wrap reveal">
              <div className="module">
                <h3 className="module__title">Module 1: Sculpture &amp; Character Foundation (ZBrush &amp; Blender)</h3>
                <div className="module__grid">
                  <div className="card week-card">
                    <span className="week-card__label">Week 1</span>
                    <p><strong>Primary Forms &amp; Blocking.</strong> Focus on silhouette and proportions. Use ZBrush for initial blocking for a more organic start.</p>
                  </div>
                  <div className="card week-card">
                    <span className="week-card__label">Week 2</span>
                    <p><strong>Head &amp; Facial Features.</strong> Deep dive into facial anatomy, planes of the face, and character personality in ZBrush.</p>
                  </div>
                  <div className="card week-card">
                    <span className="week-card__label">Week 3</span>
                    <p><strong>Hands &amp; Anatomical Detailing.</strong> Refining the secondary forms of the body and hands in ZBrush.</p>
                  </div>
                  <div className="card week-card">
                    <span className="week-card__label">Week 4</span>
                    <p><strong>Hair Block-out.</strong> Sculpting the primary volumes of the hair to define flow and silhouette.</p>
                  </div>
                  <div className="card week-card">
                    <span className="week-card__label">Week 5</span>
                    <p><strong>Clothing &amp; Accessories.</strong> Hard-surface modeling in Blender or organic cloth sculpting in ZBrush.</p>
                  </div>
                  <div className="card week-card">
                    <span className="week-card__label">Week 6</span>
                    <p><strong>Posing &amp; Composition.</strong> Bringing the character to life. Final silhouette check and refinement of the pose.</p>
                  </div>
                </div>
              </div>

              <div className="module">
                <h3 className="module__title">Module 2: Advanced Grooming &amp; LookDev (Houdini &amp; Substance)</h3>
                <div className="module__grid">
                  <div className="card week-card">
                    <span className="week-card__label">Week 7</span>
                    <p><strong>Texturing &amp; PBR Workflow.</strong> Creating high-quality textures in Substance Painter.</p>
                  </div>
                  <div className="card week-card">
                    <span className="week-card__label">Week 8</span>
                    <p><strong>Intro to Houdini Grooming.</strong> Setting up the Houdini environment, creating guides, and initializing.</p>
                  </div>
                  <div className="card week-card">
                    <span className="week-card__label">Week 9</span>
                    <p><strong>Advanced Grooming &amp; LookDev.</strong> Refinement of clumping, frizz, and technical noise.</p>
                  </div>
                </div>
              </div>

              <div className="module">
                <h3 className="module__title">Module 3: Final Presentation (Houdini)</h3>
                <div className="module__grid">
                  <div className="card week-card">
                    <span className="week-card__label">Week 10</span>
                    <p><strong>Final Rendering &amp; Portfolio.</strong> Rendering high-resolution passes and portfolio presentation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: gallery */}
        <section className="section section--orange gallery-section">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--orange">The standard you'll be chasing</span>
              <h2 className="h-display">Characters built with this exact pipeline.</h2>
            </div>
            <div className="gallery reveal">
              <a 
                href="https://pay.hotmart.com/D105581670W?bid=1781143563417" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="gallery__item"
              >
                <img 
                  src={getImageUrl('vinicius-cavalcanti-boardinsta01-3.webp')} 
                  alt="Stylized warrior character with glowing weapon, by Vini Cavalcanti" 
                  width="400" 
                  height="400" 
                  loading="lazy" 
                />
              </a>
              <a 
                href="https://pay.hotmart.com/D105581670W?bid=1781143563417" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="gallery__item"
              >
                <img 
                  src={getImageUrl('vinicius-cavalcanti-vinicavalcantirender2-1_1x.webp')} 
                  alt="Stylized character with staff and feathered headpiece, by Vini Cavalcanti" 
                  width="400" 
                  height="400" 
                  loading="lazy" 
                />
              </a>
              <a 
                href="https://pay.hotmart.com/D105581670W?bid=1781143563417" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="gallery__item"
              >
                <img 
                  src={getImageUrl('vinicius-cavalcanti-wip12112-1_1x.webp')} 
                  alt="Stylized heroic character in green and gold suit, by Vini Cavalcanti" 
                  width="400" 
                  height="400" 
                  loading="lazy" 
                />
              </a>
            </div>
            <p className="gallery__caption reveal">Every one of these went through the pipeline you just read: sculpt, texture, groom, render. <strong>The next character to come out of it is yours.</strong></p>
          </div>
        </section>

        {/* SECTION: mentor */}
        <section className="section">
          <div className="container mentor">
            <div className="mentor__photo reveal">
              <img 
                src={getImageUrl('about_vini_photo.webp')} 
                alt="Vini Cavalcanti, Senior 3D Character Artist" 
                width="490" 
                height="760" 
                loading="lazy" 
              />
            </div>
            <div className="mentor__body reveal">
              <span className="eyebrow eyebrow--blue">Your mentor</span>
              <h2 className="h-display">Feedback from someone who's inside the industry, not just talking about it.</h2>
              <p className="mentor__bio">Hi, I'm <span className="accent">Vini Cavalcanti</span>. I'm a <strong>Senior 3D Character Artist</strong> with <strong>10+ years of experience</strong> in the games and entertainment industry, focused on <em>visual development</em> and <em>stylized characters</em>. I'm currently part of the team at <strong>E-Line Media</strong>, working on the game <strong>Endstar</strong>, and throughout my career I've contributed to productions like the animated series <em>The Wingfeather Saga</em> (<strong>Angel Studios</strong>) and games like <em>Wonderbox</em> and <em>Dice Dreams</em> at <strong>PUGA Studios</strong>.</p>
              <p className="mentor__bio">I've mentored students who now work in the industry, and I know exactly which challenges come up along the way because I've been through them too. In this program, the feedback you get every week is the same kind of review that happens inside a studio.</p>
              <div className="mentor__pills">
                <span>Senior Artist</span>
                <span>10+ years exp</span>
                <span>Industry active</span>
                <span>EN sessions · PT-BR friendly</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: fit */}
        <section className="section">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--orange">Honest fit check</span>
              <h2 className="h-display">Who this is for. And who it isn't.</h2>
            </div>
            <div className="fit">
              <article className="card fit__card fit__card--yes reveal">
                <h3>
                  <span className="fit__icon fit__icon--yes" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </span>
                  This is for you if
                </h3>
                <ul>
                  <li>You want to build a complete, portfolio-ready stylized character with professional review at every stage.</li>
                  <li>You're an aspiring or junior character artist who's tired of guessing whether your work is good enough.</li>
                  <li>You can commit a few hours per week for 10 weeks to your project.</li>
                  <li>You have ZBrush and Blender installed (Houdini is optional). No prior experience level required: the program starts at the blockout.</li>
                </ul>
                <p className="fit__result"><strong>Your result:</strong> one complete stylized character, blockout to final render, reviewed every week by a Senior Artist.</p>
              </article>
              <article className="card fit__card fit__card--no reveal">
                <h3>
                  <span className="fit__icon fit__icon--no" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                  </span>
                  This is not for you if
                </h3>
                <ul>
                  <li>You're looking for a job guarantee. No serious mentorship can promise that, and this one won't either.</li>
                  <li>You want a self-paced video library to binge. That's what the courses are for; this is live, scheduled work.</li>
                  <li>You won't have time to work on your character between sessions. The weekly feedback only works if there's progress to review.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION: testimonials */}
        <section className="section section--blue">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--blue">Mentees</span>
              <h2 className="h-display">Artists already on their way.</h2>
            </div>
            <div className="grid-3">
              <article className="card testimonial reveal">
                <div className="testimonial__quote-mark" aria-hidden="true">“</div>
                <p>I had three years of half-finished sculpts before this. In week two Vini pointed out a proportion habit I never noticed, and suddenly my characters stopped looking "off". I finished my first complete piece and it's now the opener of my portfolio.</p>
                <footer>
                  <div className="testimonial__name">Emma Kowalski</div>
                  <div className="testimonial__role">Aspiring Character Artist · Poland</div>
                </footer>
              </article>
              <article className="card testimonial reveal">
                <div className="testimonial__quote-mark" aria-hidden="true">“</div>
                <p>The 30 minutes are dense. He opens my file, marks exactly what to fix and why a studio would care, and I leave with a clear plan for the week. The Discord channel between sessions saved me at least twice when I got stuck in Houdini.</p>
                <footer>
                  <div className="testimonial__name">Daniel Reyes</div>
                  <div className="testimonial__role">Junior 3D Artist · United States</div>
                </footer>
              </article>
              <article className="card testimonial reveal">
                <div className="testimonial__quote-mark" aria-hidden="true">“</div>
                <p>What surprised me was the honesty. No hype, no promises, just direct feedback from someone doing this job every day. Ten weeks later I have a character I'm genuinely proud to show in applications.</p>
                <footer>
                  <div className="testimonial__name">Chloé Martin</div>
                  <div className="testimonial__role">3D Generalist · France</div>
                </footer>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION: career */}
        <section className="section">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--orange">Career prospects</span>
              <h2 className="h-display">A craft the industry pays well for.</h2>
            </div>
            <div className="card card--lg career reveal">
              <div className="career__stats">
                <div className="career__stat">
                  <div className="career__stat-head">
                    <span className="career__stat-icon career__stat-icon--orange" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" x2="12" y1="2" y2="22" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </span>
                    <span className="career__stat-label">Avg. salary</span>
                  </div>
                  <div className="career__stat-value">$90k</div>
                  <div className="career__stat-note">per year, US market</div>
                </div>
                <div className="career__stat">
                  <div className="career__stat-head">
                    <span className="career__stat-icon career__stat-icon--blue" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    <span className="career__stat-label">Freelance</span>
                  </div>
                  <div className="career__stat-value">$35–60</div>
                  <div className="career__stat-note">per hour</div>
                </div>
                <div className="career__stat">
                  <div className="career__stat-head">
                    <span className="career__stat-icon career__stat-icon--orange" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                    </span>
                    <span className="career__stat-label">Demand</span>
                  </div>
                  <div className="career__stat-value">Growing</div>
                  <div className="career__stat-note">games &amp; animation</div>
                </div>
              </div>
              <div className="career__levels">
                <span className="career__levels-title">Salary by level</span>
                <div className="career__level career__level--blue">
                  <span>Junior</span>
                  <span>$50k–70k</span>
                </div>
                <div className="career__level career__level--blue">
                  <span>Mid-level</span>
                  <span>$70k–95k</span>
                </div>
                <div className="career__level career__level--orange">
                  <span>Senior</span>
                  <span>$100k–140k</span>
                </div>
                <div className="career__level career__level--orange">
                  <span>Lead</span>
                  <span>$120k–170k</span>
                </div>
              </div>
            </div>
            <p className="career__note reveal">* Based on public US market data (Glassdoor, LinkedIn Salary). Salaries vary widely by country, studio and portfolio. This program teaches the craft; no income is guaranteed.</p>
          </div>
        </section>

        {/* SECTION: pricing */}
        <section className="section" id="pricing">
          <div className="container pricing">
            <div className="card card--lg pricing__card reveal">
              <div className="pricing__badges">
                <span className="badge badge--limited">Limited Spots</span>
                <span className="badge badge--oneonone">One-on-One Mentorship</span>
              </div>
              <h3 className="h-display">Vini Cavalcanti Mentorship Program · Season 2</h3>
              <ul className="pricing__includes">
                <li>10 weeks of one-on-one mentorship</li>
                <li>Weekly live feedback session, booked in your time zone</li>
                <li>Private mentorship channel on Discord</li>
                <li>Structured weekly lessons on the learning platform</li>
                <li>One complete character: blockout to final render</li>
                <li>Portfolio-focused review in the final week</li>
              </ul>
              <div className="pricing__price-row">
                <span className="pricing__price">$600</span>
                <span className="pricing__price-note">one payment, or split in 3</span>
              </div>
              <div className="pricing__cta">
                <a 
                  href="https://pay.hotmart.com/D105581670W?bid=1781143563417" 
                  className="btn btn--primary" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Start Now!
                </a>
                <a 
                  href="https://pay.hotmart.com/D105581670W?off=1l4bjdm8&amp;bid=1781143564021" 
                  className="btn btn--secondary" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Start Now! 3 payments
                </a>
              </div>
              <p className="pricing__scarcity">Because every session is one-on-one, each season has a hard cap on students. When the spots are taken, enrollment closes until the next season.</p>
            </div>
          </div>
        </section>

        {/* SECTION: faq */}
        <section className="section">
          <div className="container faq">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--orange">FAQ</span>
              <h2 className="h-display">Frequently asked questions</h2>
            </div>
            <div className="faq__list">
              <details className="faq__item reveal">
                <summary>Can't I just learn this for free on YouTube?<span className="faq__icon" aria-hidden="true">+</span></summary>
                <p className="faq__answer">You can learn the tools on YouTube, and you should. What free content can't do is look at <em>your</em> character and tell you why the silhouette reads wrong, where the anatomy breaks, or what a studio reviewer would flag first. That feedback loop is the entire product here. The lessons exist so the live sessions can be spent on your work, not on button-pressing.</p>
              </details>
              <details className="faq__item reveal">
                <summary>Am I good enough for a mentorship?<span className="faq__icon" aria-hidden="true">+</span></summary>
                <p className="faq__answer">There are no skill prerequisites. The program starts at primary forms and blocking, so it meets you where you are. All you need is ZBrush and Blender installed (Houdini is optional for the grooming module). If you can open the software, week 1 is built for you.</p>
              </details>
              <details className="faq__item reveal">
                <summary>Will this get me a job in the industry?<span className="faq__icon" aria-hidden="true">+</span></summary>
                <p className="faq__answer">No one can honestly promise you a job, and you should be suspicious of anyone who does. What this program gives you is the strongest asset for applications: a complete, portfolio-ready character reviewed at every stage by a Senior Artist who works inside studios, plus a clear understanding of what hiring reviewers look for.</p>
              </details>
              <details className="faq__item reveal">
                <summary>Is 30 minutes per week enough?<span class="faq__icon" aria-hidden="true">+</span></summary>
                <p className="faq__answer">Thirty minutes of focused review on your file goes a long way when it's every week and it's only about you. Between sessions you have the private Discord channel for questions and progress checks, and the weekly lessons cover the technique. The live session is for course correction, which is exactly what self-taught artists are missing.</p>
              </details>
              <details className="faq__item reveal">
                <summary>How do the sessions and time zones work?<span className="faq__icon" aria-hidden="true">+</span></summary>
                <p className="faq__answer">Sessions run on Google Meet. Each week you book your slot through a scheduling link, picking the time that works best in your time zone. Mentees in Europe and North America are fully supported.</p>
              </details>
              <details className="faq__item reveal">
                <summary>How much does it cost and how do I pay?<span className="faq__icon" aria-hidden="true">+</span></summary>
                <p className="faq__answer">The full 10-week program is $600, paid once or split into 3 payments. Checkout is processed securely and international cards are accepted. For comparison: a single mentored course at the big online schools runs $600–$1,200, with one instructor shared across a full class.</p>
              </details>
              <details className="faq__item reveal">
                <summary>What software do I need?<span className="faq__icon" aria-hidden="true">+</span></summary>
                <p className="faq__answer">ZBrush and Blender installed, plus Houdini (optional) for the grooming and rendering modules and Substance Painter for texturing. The schedule above shows exactly which tool each week uses.</p>
              </details>
            </div>
          </div>
        </section>

        {/* SECTION: final-cta */}
        <section className="section final-cta final-cta--band">
          <div className="container reveal">
            <h2 className="h-display">Ten weeks from now, you have a finished character. Or another folder of WIPs.</h2>
            <p>Spots are limited because every session is one-on-one. If you're ready to stop guessing and start finishing, this is the seat next to a Senior Artist.</p>
            <div className="final-cta__row">
              <a 
                href="https://pay.hotmart.com/D105581670W?bid=1781143563417" 
                className="btn btn--inverse" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Start Now!
              </a>
              <a 
                href="https://pay.hotmart.com/D105581670W?off=1l4bjdm8&amp;bid=1781143564021" 
                className="btn btn--outline-light" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Start Now! 3 payments
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* SECTION: footer */}
      <footer className="site-footer">
        <div className="container site-footer__inner">
          <img 
            src={getImageUrl('logo_vini_cavalcanti_3D.webp')} 
            alt="Vini Cavalcanti School" 
            className="site-footer__logo" 
            width="180" 
            height="56" 
            loading="lazy" 
          />
          <div className="site-footer__links">
            <a href="https://vinicavalcanti.com/#courses">Courses</a>
            <a href="https://vinicavalcanti.com/#mentorship">Mentorship</a>
            <a href="https://vinicavalcanti.com/#faq">FAQ</a>
            <a href="https://vinicavalcanti.com/#contact">Contact</a>
          </div>
          <div className="site-footer__tagline">Building Digital Legacies through 3D Art</div>
          <div className="site-footer__copy">© 2026 Vini Cavalcanti School</div>
        </div>
      </footer>
    </div>
  );
}
