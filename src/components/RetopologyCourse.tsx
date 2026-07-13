import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { TRANSLATIONS, SOCIAL_LINKS } from '../constants';

const getImageUrl = (name: string) => {
  if (name.startsWith('http://') || name.startsWith('https://')) return name;
  const cleanName = name.replace(/^\.\/?(?:images\/)?/, '');
  
  if (
    cleanName === '600x600.webp' || 
    cleanName === '1280x720.webp' || 
    cleanName === 'topogun-poster-1280x720.webp' || 
    cleanName === 'Turnable_Topogun.mp4' || 
    cleanName === 'Topogun600x600.webp'
  ) {
    return `https://wp.vinicavalcanti.com/wp-content/uploads/2026/07/${cleanName}`;
  }
  if (cleanName === 'Banner-scaled.webp') {
    return `https://wp.vinicavalcanti.com/wp-content/uploads/2026/06/${cleanName}`;
  }
  return `https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/${cleanName}`;
};

interface RetopologyCourseProps {
  lang: 'en' | 'pt';
  setLang: (lang: 'en' | 'pt') => void;
}

export default function RetopologyCourse({ lang, setLang }: RetopologyCourseProps) {
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    // 1. Scroll-triggered reveal animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll('.retopology-page .reveal');

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

    // 2. Turntable autoplay guard
    const heroVideo = document.querySelector('.retopology-page .video-frame video') as HTMLVideoElement;
    let resumeInteractionHandler: (() => void) | null = null;

    if (heroVideo) {
      if (prefersReducedMotion) {
        heroVideo.removeAttribute('autoplay');
        heroVideo.pause();
        heroVideo.setAttribute('controls', '');
      } else {
        const tryPlay = () => {
          const p = heroVideo.play();
          if (p && typeof p.catch === 'function') {
            p.catch(() => {});
          }
        };
        tryPlay();
        
        resumeInteractionHandler = () => {
          if (heroVideo.paused) {
            tryPlay();
          }
          document.removeEventListener('touchstart', resumeInteractionHandler!);
          document.removeEventListener('click', resumeInteractionHandler!);
        };
        document.addEventListener('touchstart', resumeInteractionHandler, { passive: true });
        document.addEventListener('click', resumeInteractionHandler);
      }
    }

    // 3. Sticky Mobile CTA Observer
    const stickyCta = document.getElementById('topogun-sticky-cta');
    const hero = document.querySelector('.retopology-page .hero');
    const pricing = document.getElementById('topogun-pricing');
    let heroObserver: IntersectionObserver | null = null;
    let pricingObserver: IntersectionObserver | null = null;

    if (stickyCta && hero && pricing && 'IntersectionObserver' in window) {
      stickyCta.hidden = false;
      let heroVisible = true;
      let pricingVisible = false;

      const updateSticky = () => {
        if (!heroVisible && !pricingVisible) {
          stickyCta.classList.add('is-visible');
        } else {
          stickyCta.classList.remove('is-visible');
        }
      };

      heroObserver = new IntersectionObserver((entries) => {
        heroVisible = entries[0].isIntersecting;
        updateSticky();
      }, { threshold: 0.15 });
      heroObserver.observe(hero);

      pricingObserver = new IntersectionObserver((entries) => {
        pricingVisible = entries[0].isIntersecting;
        updateSticky();
      }, { threshold: 0.2 });
      pricingObserver.observe(pricing);
    }

    return () => {
      if (revealObserver) {
        revealEls.forEach((el) => revealObserver?.unobserve(el));
      }
      if (resumeInteractionHandler) {
        document.removeEventListener('touchstart', resumeInteractionHandler);
        document.removeEventListener('click', resumeInteractionHandler);
      }
      if (heroObserver) {
        heroObserver.disconnect();
      }
      if (pricingObserver) {
        pricingObserver.disconnect();
      }
    };
  }, []);

  return (
    <div className="retopology-page min-h-screen bg-[#FCFBF8] text-[#060606] selection:bg-[#EF7722]/10 selection:text-[#EF7722]">
      {/* Replicated site-header */}
      <Navbar lang={lang} setLang={setLang} t={t.nav} />

      <main>
        {/* SECTION: hero (navy course color, autoplay turntable) */}
        <section className="hero section--pattern-light">
          <div className="container hero__grid">
            <div className="hero__content reveal">
              <div className="hero__badges">
                <span className="eyebrow eyebrow--course">
                  {lang === 'en' ? 'Course' : 'Curso'}
                </span>
                <span className="badge badge--hero">
                  {lang === 'en' ? 'Intermediate' : 'Intermediário'}
                </span>
                <span className="badge badge--hero">
                  {lang === 'en' ? 'EN (PT Subtitles)' : 'EN (Legendas PT)'}
                </span>
                <span className="badge badge--hero">3h</span>
                <span className="badge badge--hero">TopoGun 3</span>
              </div>
              <h1 className="h-display">
                {lang === 'en' ? (
                  <>Retopology in <span className="accent-orange">TopoGun 3</span>.</>
                ) : (
                  <>Retopologia no <span className="accent-orange">TopoGun 3</span>.</>
                )}
              </h1>
              <p className="hero__sub">
                {lang === 'en'
                  ? 'Clean, efficient topology is what separates an amateur model from a production-ready one.'
                  : 'Topologia limpa e eficiente é o que separa um modelo amador de um modelo pronto para produção.'}
              </p>
              <div className="hero__cta-row">
                <a 
                  href="https://pay.hotmart.com/S105526894H" 
                  id="topogun-hero-buy" 
                  className="btn btn--primary btn-compra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {lang === 'en' ? 'Start now!' : 'Começar agora!'}
                </a>
                <div className="hero__price">
                  <span className="hero__price-label">
                    {lang === 'en' ? 'Price' : 'Preço'}
                  </span>
                  <span className="hero__price-value">$39</span>
                  <span className="hero__price-note">
                    {lang === 'en' ? 'One-time · Lifetime access' : 'Pagamento único · Acesso vitalício'}
                  </span>
                </div>
              </div>
            </div>
            <div className="hero__media reveal">
              <div className="video-frame video-frame--hero">
                <video autoPlay muted loop playsInline preload="metadata" poster={getImageUrl('topogun-poster-1280x720.webp')} aria-label="Turntable of the character model retopologized in the course">
                  <source src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/07/Turnable_Topogun-1.webm" type="video/webm" />
                </video>
              </div>
              <p className="hero__media-caption">
                {lang === 'en'
                  ? 'Real-time turntable — clean production topology from this course.'
                  : 'Turntable em tempo real — topologia de produção limpa deste curso.'}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: studios (authority strip) */}
        <section className="section section--compact studios">
          <div className="container reveal">
            <p className="studios__line">
              {lang === 'en' ? (
                <>Taught by a <strong>Senior Character Artist</strong> who lives this process every day inside real studios.</>
              ) : (
                <>Ministrado por um <strong>Senior Character Artist</strong> que vivencia esse processo todos os dias em estúdios reais.</>
              )}
            </p>
            <div className="studios__row">
              <span className="hover:text-[#EF7722]">E-Line Media</span>
              <span className="hover:text-[#EF7722]">Angel Studios</span>
              <span className="hover:text-[#EF7722]">PUGA Studios</span>
            </div>
          </div>
        </section>

        {/* SECTION: modules (lessons included) */}
        <section className="section" id="topogun-modules">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--orange">
                {lang === 'en' ? 'Lessons included' : 'Aulas inclusas'}
              </span>
              <h2 className="h-display">
                {lang === 'en' ? 'Everything you\'ll learn' : 'Tudo o que você aprenderá'}
              </h2>
              <p className="section__lead">
                {lang === 'en'
                  ? 'Four modules that take retopology from the step you dread to the step you own — the same workflow Vini uses in production.'
                  : 'Quatro módulos que transformam a retopologia da etapa que você teme na etapa que você domina — o mesmo workflow que o Vini usa em produção.'}
              </p>
            </div>
            <div className="grid-4">
              <article className="card module-card reveal">
                <span className="module-card__num">01</span>
                <h3>
                  {lang === 'en' ? 'Clean Topology Foundations' : 'Fundamentos de Topologia Limpa'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'The rules of production-ready topology — quads, poles and edge flow, and why they matter downstream.'
                    : 'As regras de topologia pronta para produção — quads, poles e edge flow, e por que eles importam nas etapas seguintes.'}
                </p>
              </article>
              <article className="card module-card module-card--blue reveal">
                <span className="module-card__num">02</span>
                <h3>
                  {lang === 'en' ? 'Tricky Areas Resolution' : 'Resolução de Áreas Complexas'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Hands, faces and complex junctions — solve the areas where most retopos fall apart.'
                    : 'Mãos, rostos e junções complexas — resolva as áreas onde a maioria das retopologias falha.'}
                </p>
              </article>
              <article className="card module-card reveal">
                <span className="module-card__num">03</span>
                <h3>
                  {lang === 'en' ? 'Edge Loops for Animation' : 'Edge Loops para Animação'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Place loops that deform cleanly, so your models hold up in rigging and animation.'
                    : 'Posicione loops que deformam de forma limpa, para que seus modelos aguentem rig e animação.'}
                </p>
              </article>
              <article className="card module-card module-card--blue reveal">
                <span className="module-card__num">04</span>
                <h3>
                  {lang === 'en' ? 'Poly Count Optimization' : 'Otimização de Polígonos'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Hit your budget without losing the silhouette — density where it counts, economy everywhere else.'
                    : 'Atinja seu limite de polígonos sem perder a silhueta — densidade onde importa, economia em todo o resto.'}
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION: identity (statement + render) */}
        <section className="section section--navy section--pattern-light identity">
          <div className="container identity__grid">
            <div className="identity__media reveal">
              <img src={getImageUrl('Topogun600x600.webp')} alt="Character model with clean production topology, retopologized in the course" width="600" height="600" loading="lazy" decoding="async" />
            </div>
            <div className="identity__body reveal">
              <h2 className="h-display">
                {lang === 'en' ? (
                  <>Retopology is the step everyone dreads.<br />Make it the one you <span className="accent-orange">master</span>.</>
                ) : (
                  <>Retopologia é a etapa que todos temem.<br />Torne-a a etapa que você <span className="accent-orange">domina</span>.</>
                )}
              </h2>
              <p className="mt-4 text-white/80">
                {lang === 'en'
                  ? 'It\'s the step many artists avoid — and the one that makes all the difference in the final result. This course is hands-on: efficient, clean topology in TopoGun 3, without the mistakes that hold beginners back.'
                  : 'É a etapa que muitos artistas evitam — e a que faz toda a diferença no resultado final. Este curso é totalmente prático: topologia eficiente e limpa no TopoGun 3, sem os erros que atrasam os iniciantes.'}
              </p>
              <a href="https://pay.hotmart.com/S105526894H" className="btn btn--inverse" target="_blank" rel="noopener noreferrer">
                {lang === 'en' ? 'Master retopology today' : 'Domine a retopologia hoje'}
              </a>
            </div>
          </div>
        </section>

        {/* SECTION: bonuses */}
        <section className="section section--orange" id="topogun-bonuses">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--orange">
                {lang === 'en' ? 'Exclusive student bonus' : 'Bônus exclusivo para alunos'}
              </span>
              <h2 className="h-display">
                {lang === 'en' ? 'One bonus that pays off immediately' : 'Um bônus que se paga imediatamente'}
              </h2>
            </div>
            <div className="bonus-single">
              <article className="card bonus-card reveal">
                <h3>
                  {lang === 'en' ? '30% off the TopoGun 3 Perpetual License' : '30% de desconto na Licença Perpétua do TopoGun 3'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Every student receives an exclusive 30% discount on the TopoGun 3 Perpetual License — the same software used throughout the course, yours to keep.'
                    : 'Todos os alunos recebem um desconto exclusivo de 30% na Licença Perpétua do TopoGun 3 — o mesmo software utilizado no curso, seu para sempre.'}
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION: instructor */}
        <section className="section instructor" id="topogun-instructor">
          <div className="container instructor__grid">
            <div className="instructor__photo reveal">
              <img src={getImageUrl('about_vini_photo.webp')} alt="Vini Cavalcanti, Senior 3D Character Artist" width="490" height="760" loading="lazy" decoding="async" />
            </div>
            <div className="instructor__body reveal">
              <span className="eyebrow eyebrow--blue">
                {lang === 'en' ? 'Your instructor' : 'Seu instrutor'}
              </span>
              <h2 className="h-display">
                {lang === 'en'
                  ? 'Learn from someone who\'s inside the industry, not just talking about it.'
                  : 'Aprenda com quem está de fato no mercado, e não apenas teorizando.'}
              </h2>
              <p className="instructor__bio">
                {lang === 'en' ? (
                  <>Hi, I'm <span className="accent-orange"><strong>Vini Cavalcanti</strong></span> — <strong>Senior 3D Character Artist</strong> with <strong><em>10+ years of experience</em></strong> in games and entertainment, focused on <em>visual development</em> and <em>stylized characters</em>. Currently at <strong>E-Line Media</strong> on <strong>Endstar</strong>, with credits on <em>The Wingfeather Saga</em> (<strong>Angel Studios</strong>) and games like <em>Wonderbox</em> at <strong>PUGA Studios</strong>.</>
                ) : (
                  <>Olá, eu sou o <span className="accent-orange"><strong>Vini Cavalcanti</strong></span> — <strong>Senior 3D Character Artist</strong> com <strong><em>mais de 10 anos de experiência</em></strong> na indústria de jogos e entretenimento, focado em <em>desenvolvimento visual</em> e <em>personagens estilizados</em>. Atualmente na <strong>E-Line Media</strong> trabalhando no <strong>Endstar</strong>, com créditos em <em>The Wingfeather Saga</em> (<strong>Angel Studios</strong>) e jogos como <em>Wonderbox</em> na <strong>PUGA Studios</strong>.</>
                )}
              </p>
              <div className="instructor__pills">
                <span>{lang === 'en' ? 'Senior Artist' : 'Artista Sênior'}</span>
                <span>{lang === 'en' ? '10+ years exp' : '10+ anos exp'}</span>
                <span>{lang === 'en' ? 'Industry active' : 'Ativo na Indústria'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: pricing */}
        <section className="section" id="topogun-pricing">
          <div className="container pricing">
            <div className="card card--lg pricing__card reveal">
              <div className="pricing__badges">
                <span className="badge badge--limited">
                  {lang === 'en' ? 'Lifetime access' : 'Acesso vitalício'}
                </span>
                <span className="badge badge--oneonone">EN · PT Subtitles</span>
              </div>
              <h3>
                {lang === 'en' ? 'Retopology in TopoGun 3' : 'Retopologia no TopoGun 3'}
              </h3>
              <ul className="pricing__includes">
                <li>{lang === 'en' ? '3h of video lessons' : '3h de videoaulas'}</li>
                <li>{lang === 'en' ? '4 modules, from foundations to optimization' : '4 módulos, dos fundamentos à otimização'}</li>
                <li>{lang === 'en' ? '30% off TopoGun 3 Perpetual License' : '30% de desconto na Licença Perpétua do TopoGun 3'}</li>
                <li>{lang === 'en' ? 'Lifetime access, study at your own pace' : 'Acesso vitalício, estude no seu ritmo'}</li>
                <li>{lang === 'en' ? 'English with Portuguese subtitles' : 'Em inglês com legendas em português'}</li>
                <li>{lang === 'en' ? '15-day money-back guarantee' : 'Garantia de reembolso de 15 dias'}</li>
              </ul>
              <div className="pricing__price-row">
                <span className="pricing__price">$39</span>
                <span className="pricing__price-note">
                  {lang === 'en' ? 'one-time payment' : 'pagamento único'}
                </span>
              </div>
              <div className="pricing__cta">
                <a href="https://pay.hotmart.com/S105526894H" id="topogun-pricing-buy" className="btn btn--primary btn-compra" target="_blank" rel="noopener noreferrer">
                  {lang === 'en' ? 'Start now!' : 'Começar agora!'}
                </a>
              </div>
              <p className="pricing__scarcity">
                {lang === 'en'
                  ? 'Secure checkout via Hotmart. Study at your own pace, come back to the lessons whenever you want.'
                  : 'Checkout seguro via Hotmart. Estude no seu próprio ritmo, volte às aulas sempre que quiser.'}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: faq */}
        <section className="section faq" id="topogun-faq">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--orange">FAQ</span>
              <h2 className="h-display">
                {lang === 'en' ? 'Frequently asked questions' : 'Perguntas frequentes'}
              </h2>
            </div>
            <div className="faq__list">
              <details className="faq__item reveal">
                <summary>
                  {lang === 'en' ? 'Do I need prior experience in 3D?' : 'Preciso de experiência anterior em 3D?'}
                  <span className="faq__icon">+</span>
                </summary>
                <p className="faq__answer">
                  {lang === 'en'
                    ? 'The course is aimed at intermediate artists. You should be comfortable navigating a 3D package and have models that need retopology — inside TopoGun 3, every decision is explained step by step.'
                    : 'O curso é voltado para artistas intermediários. Você deve se sentir confortável navegando em softwares 3D e ter modelos que precisam de retopologia — dentro do TopoGun 3, cada decisão é explicada passo a passo.'}
                </p>
              </details>
              <details className="faq__item reveal">
                <summary>
                  {lang === 'en' ? 'What software will I need?' : 'Quais softwares irei precisar?'}
                  <span className="faq__icon">+</span>
                </summary>
                <p className="faq__answer">
                  {lang === 'en'
                    ? 'TopoGun 3 is the only software required. As a student you get an exclusive 30% discount on the TopoGun 3 Perpetual License, so you can set it up right as you start the course.'
                    : 'O TopoGun 3 é o único software necessário. Como aluno, você ganha 30% de desconto exclusivo na Licença Perpétua do TopoGun 3, para que possa configurá-lo ao iniciar o curso.'}
                </p>
              </details>
              <details className="faq__item reveal">
                <summary>
                  {lang === 'en' ? 'Is there a deadline to finish?' : 'Existe um prazo limite para concluir o curso?'}
                  <span className="faq__icon">+</span>
                </summary>
                <p className="faq__answer">
                  {lang === 'en'
                    ? 'No. After purchase, access is lifetime. Study at your own pace and come back to the content as many times as you want.'
                    : 'Não. Após a compra, seu acesso é vitalício. Estude no seu próprio ritmo e assista ao conteúdo quantas vezes quiser.'}
                </p>
              </details>
              <details className="faq__item reveal">
                <summary>
                  {lang === 'en' ? 'Is the course in English or Portuguese?' : 'O curso está em inglês ou em português?'}
                  <span className="faq__icon">+</span>
                </summary>
                <p className="faq__answer">
                  {lang === 'en'
                    ? 'The lessons are in English with Portuguese subtitles.'
                    : 'As aulas são ministradas em inglês com legendas em português.'}
                </p>
              </details>
              <details className="faq__item reveal">
                <summary>
                  {lang === 'en' ? 'What if I\'m not happy with the course?' : 'E se eu não ficar satisfeito com o curso?'}
                  <span className="faq__icon">+</span>
                </summary>
                <p className="faq__answer">
                  {lang === 'en'
                    ? 'You have a 15-day money-back guarantee after purchase — plenty of time to explore the content and decide whether it\'s the right fit for you.'
                    : 'Você tem uma garantia de devolução do dinheiro de 15 dias após a compra — tempo de sobra para explorar o conteúdo e decidir se é o ideal para você.'}
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* SECTION: final-cta */}
        <section className="section final-cta final-cta--band section--pattern-light">
          <div className="container reveal">
            <h2 className="h-display">
              {lang === 'en' ? (
                <>Stop dreading retopology.<br />Start owning it.</>
              ) : (
                <>Pare de temer a retopologia.<br />Passe a dominá-la.</>
              )}
            </h2>
            <p>
              {lang === 'en'
                ? '3 hours, 4 modules, and a workflow you\'ll use in every model from now on.'
                : '3 horas, 4 módulos e um workflow que você usará em todos os seus modelos de agora em diante.'}
            </p>
            <div className="final-cta__row">
              <a href="https://pay.hotmart.com/S105526894H" id="topogun-final-buy" className="btn btn--inverse btn-compra" target="_blank" rel="noopener noreferrer">
                {lang === 'en' ? 'Start now! — $39' : 'Começar agora! — $39'}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Replicated site-footer */}
      <Footer t={t.footer} socialLinks={SOCIAL_LINKS} />

      {/* SECTION: sticky-cta (mobile) */}
      <div className="sticky-cta" id="topogun-sticky-cta" hidden>
        <div className="sticky-cta__price">
          <span className="sticky-cta__label">
            {lang === 'en' ? 'TopoGun 3 course' : 'Curso TopoGun 3'}
          </span>
          <span className="sticky-cta__value">$39</span>
        </div>
        <a href="https://pay.hotmart.com/S105526894H" className="btn btn--primary btn--sm btn-compra" target="_blank" rel="noopener noreferrer">
          {lang === 'en' ? 'Start now!' : 'Começar agora!'}
        </a>
      </div>
    </div>
  );
}
