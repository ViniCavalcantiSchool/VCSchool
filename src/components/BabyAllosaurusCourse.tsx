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
    cleanName === 'Cover.webp' ||
    cleanName === 'Ad_Video_Timelapse.mp4' ||
    cleanName === 'AD_BabyAllosaurus_Square.webp'
  ) {
    return `https://wp.vinicavalcanti.com/wp-content/uploads/2026/07/${cleanName}`;
  }
  if (cleanName === 'Banner-scaled.webp') {
    return `https://wp.vinicavalcanti.com/wp-content/uploads/2026/06/${cleanName}`;
  }
  return `https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/${cleanName}`;
};

interface BabyAllosaurusCourseProps {
  lang: 'en' | 'pt';
  setLang: (lang: 'en' | 'pt') => void;
}

export default function BabyAllosaurusCourse({ lang, setLang }: BabyAllosaurusCourseProps) {
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    // 1. Scroll-triggered reveal animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll('.allosaurus-page .reveal');

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
    const heroVideo = document.querySelector('.allosaurus-page .video-frame video') as HTMLVideoElement;
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
    const stickyCta = document.getElementById('allosaurus-sticky-cta');
    const hero = document.querySelector('.allosaurus-page .hero');
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
    <div className="allosaurus-page min-h-screen bg-[#FCFBF8] text-[#060606] selection:bg-[#EF7722]/10 selection:text-[#EF7722]">
      {/* Replicated site-header */}
      <Navbar lang={lang} setLang={setLang} t={t.nav} />

      <main>
        {/* SECTION: hero (sunset course color, autoplay timelapse) */}
        <section className="hero section--pattern-light">
          <div className="container hero__grid">
            <div className="hero__content reveal">
              <div className="hero__badges">
                <span className="eyebrow eyebrow--course">
                  {lang === 'en' ? 'Course' : 'Curso'}
                </span>
                <span className="badge badge--hero">
                  {lang === 'en' ? 'Beginner / Intermediate' : 'Iniciante / Intermediário'}
                </span>
                <span className="badge badge--hero">
                  {lang === 'en' ? 'EN (PT Subtitles)' : 'EN (Legendas PT)'}
                </span>
                <span className="badge badge--hero">7h30min</span>
                <span className="badge badge--hero">ZBrush + Blender</span>
              </div>
              <h1 className="h-display">
                Character Design: <span className="accent-orange">Baby Allosaurus</span>.
              </h1>
              <p className="hero__sub">
                {lang === 'en'
                  ? 'From storytelling to final render — a complete stylized character pipeline across 4 modules, built around one memorable character.'
                  : 'Do storytelling ao render final — um pipeline completo de personagem estilizado em 4 módulos, construído ao redor de um personagem memorável.'}
              </p>
              <div className="hero__cta-row">
                <a 
                  href="https://pay.hotmart.com/M105761103N" 
                  id="allosaurus-hero-buy" 
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
                  <span className="hero__price-value">$49</span>
                  <span className="hero__price-note">
                    {lang === 'en' ? 'One-time · Lifetime access' : 'Pagamento único · Acesso vitalício'}
                  </span>
                </div>
              </div>
            </div>
            <div className="hero__media reveal">
              <div className="video-frame">
                <video autoPlay muted loop playsInline preload="metadata" poster={getImageUrl('Cover.webp')} aria-label="Sculpting timelapse of the Baby Allosaurus character created in the course">
                  <source src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/07/Ad_Video_Timelapse-1.webm" type="video/webm" />
                </video>
              </div>
              <p className="hero__media-caption">
                {lang === 'en'
                  ? 'Sculpt timelapse — the Baby Allosaurus you\'ll build in this course.'
                  : 'Timelapse de escultura — o Baby Allosaurus que você construirá neste curso.'}
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
                <>Ministrado por um <strong>Artista de Personagens Sênior</strong> que vive este processo diariamente em estúdios reais.</>
              )}
            </p>
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
              <span className="eyebrow eyebrow--orange">
                {lang === 'en' ? 'Lessons included' : 'Aulas incluídas'}
              </span>
              <h2 className="h-display">
                {lang === 'en' ? 'Everything you\'ll learn' : 'Tudo o que você vai aprender'}
              </h2>
              <p className="section__lead">
                {lang === 'en'
                  ? 'Four modules, one character — creative decisions and technical execution, side by side.'
                  : 'Quatro módulos, um personagem — decisões criativas e execução técnica, lado a lado.'}
              </p>
            </div>
            <div className="grid-4">
              <article className="card module-card reveal">
                <span className="module-card__num">01</span>
                <h3>
                  {lang === 'en' ? 'Foundations — Storytelling and Character Design' : 'Fundamentos — Storytelling e Design de Personagem'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Build the character before you ever open ZBrush: story, intention and the design decisions that make it memorable.'
                    : 'Construa o personagem antes de abrir o ZBrush: história, intenção e as decisões de design que o tornam memorável.'}
                </p>
              </article>
              <article className="card module-card module-card--blue reveal">
                <span className="module-card__num">02</span>
                <h3>
                  {lang === 'en' ? 'ZBrush — Blockout and Chibi Proportions' : 'ZBrush — Blockout e Proporções Chibi'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Lock the silhouette and find charming, readable chibi proportions straight from the blockout.'
                    : 'Fixe a silhueta e encontre proporções chibi charmosas e legíveis diretamente do blockout.'}
                </p>
              </article>
              <article className="card module-card reveal">
                <span className="module-card__num">03</span>
                <h3>
                  {lang === 'en' ? 'ZBrush — Sculpting, Detailing, and Expression' : 'ZBrush — Escultura, Detalhamento e Expressão'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Sculpt personality, not just polygons — form, surface detail and the expression that sells the story.'
                    : 'Esculpa personalidade, não apenas polígonos — forma, detalhe de superfície e a expressão que vende a história.'}
                </p>
              </article>
              <article className="card module-card module-card--blue reveal">
                <span className="module-card__num">04</span>
                <h3>
                  {lang === 'en' ? 'Final Render — Lighting, Scene, and Visual Storytelling' : 'Render Final — Iluminação, Cena e Storytelling Visual'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Compose, light and render the final shot in Blender — a portfolio-ready image that tells the story.'
                    : 'Componha, ilumine e renderize o frame final no Blender — uma imagem pronta para portfólio que conta a história.'}
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION: identity (statement + render) */}
        <section className="section section--navy section--pattern-light identity">
          <div className="container identity__grid">
            <div className="identity__media reveal">
              <img src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/07/AD_BabyAllosaurus_Square.webp" alt="Final render of the Baby Allosaurus character created in the course" width="600" height="600" loading="lazy" decoding="async" />
            </div>
            <div className="identity__body reveal">
              <h2 className="h-display">
                {lang === 'en' ? (
                  <>Stop modeling shapes.<br />Start telling <span className="accent-orange">stories</span>.</>
                ) : (
                  <>Pare de modelar formas.<br />Comece a contar <span className="accent-orange">histórias</span>.</>
                )}
              </h2>
              <p>
                {lang === 'en'
                  ? 'Your sculpts are technical. They should be memorable. This course is about the decisions that make a character feel alive — from the first idea to the final composed render.'
                  : 'Suas esculturas são técnicas. Elas devem ser memoráveis. Este curso é sobre as decisões que fazem um personagem parecer vivo — desde a primeira ideia até o render final composto.'}
              </p>
              <a 
                href="https://pay.hotmart.com/M105761103N" 
                className="btn btn--inverse btn-compra" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {lang === 'en' ? 'Start now!' : 'Começar agora!'}
              </a>
            </div>
          </div>
        </section>

        {/* SECTION: bonuses */}
        <section className="section section--orange" id="bonuses">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow eyebrow--orange">
                {lang === 'en' ? 'Exclusive student bonus' : 'Bônus exclusivo para alunos'}
              </span>
              <h2 className="h-display">
                {lang === 'en' ? 'Four bonuses included' : 'Quatro bônus inclusos'}
              </h2>
            </div>
            <div className="grid-4">
              <article className="card bonus-card reveal">
                <h3>
                  {lang === 'en' ? 'Reference sheet pack' : 'Pack de reference sheets'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Turnaround sheets and study references for the Baby Allosaurus, ready to use.'
                    : 'Folhas de turnaround e referências de estudo para o Baby Allosaurus, prontas para usar.'}
                </p>
              </article>
              <article className="card bonus-card reveal">
                <h3>
                  {lang === 'en' ? 'Custom brush pack' : 'Pack de pincéis customizados'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'The brushes Vini actually uses in production, ready to install.'
                    : 'Os pincéis que o Vini realmente usa em produção, prontos para instalar.'}
                </p>
              </article>
              <article className="card bonus-card reveal">
                <h3>
                  {lang === 'en' ? 'HDRI lighting pack' : 'Pack de iluminação HDRI'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Sunset HDRIs used in the course, for the final render and beyond.'
                    : 'HDRIs de pôr do sol usados no curso, para o render final e além.'}
                </p>
              </article>
              <article className="card bonus-card reveal">
                <h3>30% off TopoGun 3</h3>
                <p>
                  {lang === 'en'
                    ? 'Discount on the TopoGun 3 Perpetual License for your retopology stage.'
                    : 'Desconto na Licença Perpétua do TopoGun 3 para sua etapa de retopologia.'}
                </p>
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
              <span className="eyebrow eyebrow--blue">
                {lang === 'en' ? 'Your instructor' : 'Seu instrutor'}
              </span>
              <h2 className="h-display">
                {lang === 'en'
                  ? 'Learn from someone who\'s inside the industry, not just talking about it.'
                  : 'Aprenda com quem está inserido no mercado, não apenas falando sobre ele.'}
              </h2>
              <p className="instructor__bio">
                {lang === 'en' ? (
                  <>Hi, I'm <span className="accent-orange"><strong>Vini Cavalcanti</strong></span> — <strong>Senior 3D Character Artist</strong> with <strong><em>10+ years of experience</em></strong> in games and entertainment, focused on <em>visual development</em> and <em>stylized characters</em>. Currently at <strong>E-Line Media</strong> on <strong>Endstar</strong>, with credits on <em>The Wingfeather Saga</em> (<strong>Angel Studios</strong>) and games like <em>Wonderbox</em> at <strong>PUGA Studios</strong>.</>
                ) : (
                  <>Olá, eu sou <span className="accent-orange"><strong>Vini Cavalcanti</strong></span> — <strong>Artista de Personagens 3D Sênior</strong> com <strong><em>mais de 10 anos de experiência</em></strong> em jogos e entretenimento, focado em <em>desenvolvimento visual</em> e <em>personagens estilizados</em>. Atualmente na <strong>E-Line Media</strong> no projeto <strong>Endstar</strong>, com créditos em <em>The Wingfeather Saga</em> (<strong>Angel Studios</strong>) e jogos como <em>Wonderbox</em> na <strong>PUGA Studios</strong>.</>
                )}
              </p>
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
                <span className="badge badge--limited">
                  {lang === 'en' ? 'Lifetime access' : 'Acesso vitalício'}
                </span>
                <span className="badge badge--oneonone">
                  {lang === 'en' ? 'EN · PT Subtitles' : 'EN · Legendas PT'}
                </span>
              </div>
              <h3 className="h-display">Character Design: Baby Allosaurus</h3>
              <ul className="pricing__includes">
                <li>
                  {lang === 'en' ? '7h30min of video lessons' : '7h30min de videoaulas'}
                </li>
                <li>
                  {lang === 'en' ? '4 modules, from storytelling to final render' : '4 módulos, do storytelling ao render final'}
                </li>
                <li>
                  {lang === 'en' ? 'Reference sheet pack + custom brush pack' : 'Pack de reference sheets + pincéis customizados'}
                </li>
                <li>
                  {lang === 'en' ? 'Sunset HDRI lighting pack' : 'Pack de iluminação HDRI de pôr do sol'}
                </li>
                <li>
                  {lang === 'en' ? '30% off TopoGun 3 Perpetual License' : '30% de desconto na Licença Perpétua do TopoGun 3'}
                </li>
                <li>
                  {lang === 'en' ? '15-day money-back guarantee' : 'Garantia de reembolso de 15 dias'}
                </li>
              </ul>
              <div className="pricing__price-row">
                <span className="pricing__price">$49</span>
                <span className="pricing__price-note">
                  {lang === 'en' ? 'one-time payment' : 'pagamento único'}
                </span>
              </div>
              <div className="pricing__cta">
                <a 
                  href="https://pay.hotmart.com/M105761103N" 
                  id="allosaurus-buy-pricing" 
                  className="btn btn--primary btn-compra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
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
        <section className="section faq" id="faq">
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
                    ? 'The course is designed for beginner and intermediate artists. Basic familiarity with ZBrush navigation helps, but every creative and technical decision is explained step by step.'
                    : 'O curso foi projetado para artistas iniciantes e intermediários. Uma familiaridade básica com a navegação do ZBrush ajuda, mas cada decisão criativa e técnica é explicada passo a passo.'}
                </p>
              </details>
              <details className="faq__item reveal">
                <summary>
                  {lang === 'en' ? 'What software will I need?' : 'Quais softwares vou precisar?'}
                  <span className="faq__icon">+</span>
                </summary>
                <p className="faq__answer">
                  {lang === 'en'
                    ? 'ZBrush for sculpting and Blender (free) for the final scene and render. The TopoGun 3 discount is a bonus for when you move into retopology — it\'s not needed to follow the lessons.'
                    : 'ZBrush para escultura e Blender (gratuito) para a cena e renderização final. O desconto do TopoGun 3 é um bônus para quando você avançar para a retopologia — não é necessário para acompanhar as aulas.'}
                </p>
              </details>
              <details className="faq__item reveal">
                <summary>
                  {lang === 'en' ? 'Is there a deadline to finish?' : 'Existe um prazo para terminar?'}
                  <span className="faq__icon">+</span>
                </summary>
                <p className="faq__answer">
                  {lang === 'en'
                    ? 'No. After purchase, access is lifetime. Study at your own pace and come back to the content as many times as you want.'
                    : 'Não. Após a compra, o acesso é vitalício. Estude no seu próprio ritmo e volte ao conteúdo quantas vezes quiser.'}
                </p>
              </details>
              <details className="faq__item reveal">
                <summary>
                  {lang === 'en' ? 'Is the course in English or Portuguese?' : 'O curso está em inglês ou português?'}
                  <span className="faq__icon">+</span>
                </summary>
                <p className="faq__answer">
                  {lang === 'en'
                    ? 'The lessons are in English with Portuguese subtitles.'
                    : 'As aulas estão em inglês com legendas em português.'}
                </p>
              </details>
              <details className="faq__item reveal">
                <summary>
                  {lang === 'en' ? 'What if I\'m not happy with the course?' : 'E se eu não estiver satisfeito com o curso?'}
                  <span className="faq__icon">+</span>
                </summary>
                <p className="faq__answer">
                  {lang === 'en'
                    ? 'You have a 15-day money-back guarantee after purchase — plenty of time to explore the content and decide whether it\'s the right fit for you.'
                    : 'Você tem uma garantia de reembolso de 15 dias após a compra — tempo de sobra para explorar o conteúdo e decidir se é a escolha certa para você.'}
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
                <>One story. One pipeline.<br />Yours forever.</>
              ) : (
                <>Uma história. Um pipeline.<br />Seu para sempre.</>
              )}
            </h2>
            <p>
              {lang === 'en'
                ? 'From storytelling to final render, with every decision explained.'
                : 'Do storytelling ao render final, com cada decisão explicada.'}
            </p>
            <div className="final-cta__row">
              <a 
                href="https://pay.hotmart.com/M105761103N" 
                id="allosaurus-buy-final" 
                className="btn btn--inverse btn-compra" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {lang === 'en' ? 'Start now! — $49' : 'Começar agora! — $49'}
              </a>
            </div>
          </div>
        </section>

        {/* SECTION: sticky-cta (mobile only) */}
        <div className="sticky-cta" id="allosaurus-sticky-cta" hidden>
          <div className="sticky-cta__price">
            <span className="sticky-cta__label">
              {lang === 'en' ? 'Baby Allosaurus course' : 'Curso Baby Allosaurus'}
            </span>
            <span className="sticky-cta__value">$49</span>
          </div>
          <a 
            href="https://pay.hotmart.com/M105761103N" 
            id="allosaurus-buy-sticky" 
            className="btn btn--primary btn--sm btn-compra" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {lang === 'en' ? 'Start now!' : 'Começar agora!'}
          </a>
        </div>
      </main>

      {/* Replicated site-footer */}
      <Footer t={t.footer} socialLinks={SOCIAL_LINKS} />
    </div>
  );
}
