import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OneOnOneMentorship from './components/OneOnOneMentorship';
import ZBrushCourse from './components/ZBrushCourse';
import BabyAllosaurusCourse from './components/BabyAllosaurusCourse';
import RetopologyCourse from './components/RetopologyCourse';
import { TRANSLATIONS, COURSES_EN, COURSES_PT, BUNDLES, FAQ_ITEMS, SOCIAL_LINKS } from './constants';

const About = lazy(() => import('./components/About'));
const CourseList = lazy(() => import('./components/CourseList'));
const Mentorship = lazy(() => import('./components/Mentorship'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const LoadingFallback = () => (
  <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
    ... 
  </div>
);

export default function App() {
  const [lang, setLang] = useState<'en' | 'pt'>('en');
  const [currentPath, setCurrentPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const t = TRANSLATIONS[lang];

  const isOneOnOnePage = currentPath === '/mentorship/one-on-one-mentorship' || currentPath === '/mentorship/one-on-one-mentorship/';
  const isZBrushPage = 
    currentPath === '/zbrush-for-stylized-characters' || 
    currentPath === '/zbrush-for-stylized-characters/' || 
    currentPath === '/courses/zbrush-for-stylized-characters' || 
    currentPath === '/courses/zbrush-for-stylized-characters/';

  const isBabyAllosaurusPage = 
    currentPath === '/character-design-baby-allosaurus' || 
    currentPath === '/character-design-baby-allosaurus/' || 
    currentPath === '/courses/character-design-baby-allosaurus' || 
    currentPath === '/courses/character-design-baby-allosaurus/';

  const isRetopologyPage = 
    currentPath === '/retopology-in-topogun-3' || 
    currentPath === '/retopology-in-topogun-3/' || 
    currentPath === '/courses/retopology-in-topogun-3' || 
    currentPath === '/courses/retopology-in-topogun-3/';

  if (isOneOnOnePage) {
    return <OneOnOneMentorship lang={lang} setLang={setLang} t={t} />;
  }

  if (isZBrushPage) {
    return <ZBrushCourse lang={lang} setLang={setLang} />;
  }

  if (isBabyAllosaurusPage) {
    return <BabyAllosaurusCourse lang={lang} setLang={setLang} />;
  }

  if (isRetopologyPage) {
    return <RetopologyCourse lang={lang} setLang={setLang} />;
  }

  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#060606] selection:bg-[#EF7722]/10 selection:text-[#EF7722]">
      <Navbar lang={lang} setLang={setLang} t={t.nav} />
      
      <main>
        <Hero t={t.hero} />
        <Suspense fallback={<LoadingFallback />}>
          <About t={t.about} />
          <CourseList 
            t={t.courses} 
            lang={lang}
            courses={lang === 'en' ? COURSES_EN : COURSES_PT} 
          />
          {/* <BundleList t={t.bundles} bundles={BUNDLES} /> */}
          <Mentorship t={t.mentorship} />
          <Testimonials t={t.testimonials} />
          <FAQ t={t.faq} items={FAQ_ITEMS[lang]} />
          <Contact t={t.contact} />
        </Suspense>
      </main>

      <Suspense fallback={<LoadingFallback />}>
        <Footer t={t.footer} socialLinks={SOCIAL_LINKS} />
      </Suspense>
    </div>
  );
}
