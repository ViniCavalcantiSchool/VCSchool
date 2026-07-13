import React, { useState, useEffect } from 'react';
import { Course } from '../types';

interface CourseListProps {
  courses: Course[];
  lang: 'en' | 'pt';
  t: {
    title: string;
    filters: {
      all: string;
      beginner: string;
      intermediate: string;
      advanced: string;
    };
    filterValues: {
      all: string;
      beginner: string;
      intermediate: string;
      advanced: string;
    };
    duration: string;
    software: string;
    details: string;
    close: string;
    buy: string;
    loadMore: string;
    priceLabel: string;
    lessonsTitle: string;
    comingSoon: string;
    isNew: string;
  };
}

export default function CourseList({ courses, lang, t }: CourseListProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const filteredCourses = activeFilter === t.filterValues.all 
    ? courses 
    : courses.filter(c => c.level.includes(activeFilter) || c.lang.includes(activeFilter));

  const visibleCourses = isDesktop || isMobileExpanded 
    ? filteredCourses 
    : filteredCourses.slice(0, 3);

  const filterOptions = [
    { label: t.filters.all, value: t.filterValues.all },
    { label: t.filters.beginner, value: t.filterValues.beginner },
    { label: t.filters.intermediate, value: t.filterValues.intermediate },
    { label: t.filters.advanced, value: t.filterValues.advanced },
    { label: 'PT', value: 'PT' },
    { label: 'EN', value: 'EN' }
  ];

  return (
    <section id="courses" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{t.title}</h2>
        </div>
        <div className="flex justify-center -mx-4 sm:mx-0">
          <div className="flex flex-wrap justify-center gap-2 px-4 pb-4 text-sm text-black/65">
            {filterOptions.map((opt) => (
              <button 
                key={opt.value}
                id={`filter-${opt.value}`}
                onClick={() => {
                  setActiveFilter(opt.value);
                  setIsMobileExpanded(false); // Reset expansion when filtering
                }}
                className={`whitespace-nowrap rounded-full border px-6 py-2.5 shadow-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#EF7722] ${activeFilter === opt.value ? 'bg-black text-white border-black' : 'bg-white border-black/10 hover:bg-black/5'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 items-start sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {visibleCourses.map((course, i) => (
          <div 
            key={course.title} 
            className={`group flex flex-col overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm transition-all duration-300 ${expandedId === course.title ? 'shadow-md ring-1 ring-black/5' : ''}`}
          >
            <div 
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('a')) return;
                const isZBrush = course.title === "ZBrush for Stylized Characters" || course.title === "ZBrush para Personagens Estilizados";
                const isBabyAllosaurus = course.title === "Character Design: Baby Allosaurus";
                if (isZBrush || isBabyAllosaurus) {
                  e.preventDefault();
                  const targetPath = isZBrush ? '/courses/zbrush-for-stylized-characters' : '/courses/character-design-baby-allosaurus';
                  window.history.pushState({}, '', targetPath);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo(0, 0);
                  return;
                }
                setExpandedId(expandedId === course.title ? null : course.title);
              }}
              className="flex flex-col cursor-pointer h-full"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="h-full w-full object-cover object-right transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {course.comingSoon && (
                  <div className="absolute right-0 top-0 z-10 h-24 w-24 overflow-hidden pointer-events-none">
                    <div className="absolute left-[-10px] top-[26px] w-[140px] rotate-45 bg-[#EF7722] py-1 text-center text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                      {t.comingSoon}
                    </div>
                  </div>
                )}
                {course.isNew && (
                  <div className="absolute right-0 top-0 z-10 h-24 w-24 overflow-hidden pointer-events-none">
                    <div className="absolute left-[-10px] top-[26px] w-[140px] rotate-45 bg-[#0CA6DF] py-1 text-center text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                      {t.isNew}
                    </div>
                  </div>
                )}
                <div className={`hidden h-full w-full ${i % 3 === 0 ? "bg-gradient-to-br from-[#EF7722] to-[#F9A335]" : i % 3 === 1 ? "bg-gradient-to-br from-[#0CA6DF] to-[#7ACEEE]" : "bg-gradient-to-br from-[#111111] to-[#7C877E]"}`} />
              </div>
              <div className="flex flex-col flex-grow p-5">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-[#F5F5F2] px-2.5 py-1 text-black/60 font-medium">{course.level}</span>
                  <span className="rounded-full bg-[#F5F5F2] px-2.5 py-1 text-black/60 font-medium">{course.lang}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight leading-tight">{course.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/60 line-clamp-3 min-h-[4.5rem]">{course.desc}</p>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-black/5 pt-5">
                  <div className="flex items-center">
                    {course.title === "ZBrush for Stylized Characters" || course.title === "ZBrush para Personagens Estilizados" || course.title === "Character Design: Baby Allosaurus" ? null : (
                      <>
                        <div className={`rounded-full border border-black/10 px-4 py-2 text-xs font-medium shadow-sm transition hover:bg-black hover:text-white whitespace-nowrap ${expandedId === course.title ? 'hidden' : 'bg-white'}`}>
                          {t.details}
                        </div>
                        <div className={`rounded-full border border-black/10 bg-[#F5F5F2] px-4 py-2 text-xs font-medium shadow-sm whitespace-nowrap ${expandedId === course.title ? 'block' : 'hidden'}`}>
                          {t.close}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {course.title === "ZBrush for Stylized Characters" || course.title === "ZBrush para Personagens Estilizados" || course.title === "Character Design: Baby Allosaurus" ? (
                      <a 
                        href={course.title === "Character Design: Baby Allosaurus" ? "/courses/character-design-baby-allosaurus" : "/courses/zbrush-for-stylized-characters"}
                        id={`course-buy-top-${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const targetPath = course.title === "Character Design: Baby Allosaurus" ? "/courses/character-design-baby-allosaurus" : "/courses/zbrush-for-stylized-characters";
                          window.history.pushState({}, '', targetPath);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                          window.scrollTo(0, 0);
                        }}
                        className="btn-compra rounded-full bg-[#EF7722] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#d9661b] transition-all whitespace-nowrap hover:scale-105 active:scale-95"
                      >
                        {lang === 'pt' ? "Começar agora!" : "Start now!"}
                      </a>
                    ) : (
                      <a 
                        href={course.checkout}
                        id={`course-buy-top-${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn-compra rounded-full bg-[#EF7722] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#d9661b] transition-all whitespace-nowrap hover:scale-105 active:scale-95 ${expandedId === course.title ? 'hidden' : ''}`}
                      >
                        {t.buy}
                      </a>
                    )}
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] uppercase tracking-wider text-black/30 font-bold leading-none mb-1">{t.priceLabel}</span>
                      <div className="text-xl font-bold text-[#EF7722]">{course.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {expandedId === course.title && (
              <div className="px-5 pb-5">
                <div className="rounded-[22px] bg-[#FAFAF8] p-4 ring-1 ring-black/5">
                  <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                      <div className="text-black/45 text-xs uppercase tracking-wider mb-1">{t.software}</div>
                      <div className="font-semibold text-black/80">{course.software}</div>
                    </div>
                    <div>
                      <div className="text-black/45 text-xs uppercase tracking-wider mb-1">{t.duration}</div>
                      <div className="font-semibold text-black/80">{course.duration}</div>
                    </div>
                  </div>
                  
                  {course.expandedDesc && (
                    <div className="mb-6">
                       <p className="text-sm text-black/70 leading-relaxed italic border-l-2 border-[#EF7722]/30 pl-3">
                        {course.expandedDesc}
                      </p>
                    </div>
                  )}

                  <div className="mt-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-[#EF7722]">{t.lessonsTitle}</div>
                    <ul className="mt-4 space-y-3 text-sm text-black/75">
                      {course.learn.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EF7722]/50" />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a 
                      href={course.checkout} 
                      id={`course-buy-bottom-${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-compra block w-full rounded-xl bg-black px-4 py-4 text-center text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
                    >
                      {t.buy}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {!isDesktop && filteredCourses.length > 3 && (
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="rounded-full border border-black/10 bg-white px-8 py-3 text-sm font-semibold text-black/70 shadow-sm transition-all hover:bg-black hover:text-white"
          >
            {isMobileExpanded ? t.close : t.loadMore}
          </button>
        </div>
      )}
    </section>
  );
}
