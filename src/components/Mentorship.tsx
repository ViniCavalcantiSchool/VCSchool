import React, { useState, useEffect } from 'react';

interface MentorshipProps {
  t: {
    sectionTitle: string;
    badge: string;
    label: string;
    title: string;
    body: string;
    button: string;
    buttonInstallments: string;
    checkoutInstallments: string;
    price: string;
    investmentLabel: string;
    details: string;
    close: string;
    limitedSpots: string;
    oneOnOne: string;
    aboutTitle: string;
    scheduleTitle: string;
    checkout: string;
    modules: Array<{
      title: string;
      weeks: Array<{ label: string; text: string }>;
    }>;
  };
}

export default function Mentorship({ t }: MentorshipProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderBody = (text: string) => {
    const boldParts = [
      "One-on-one mentorship",
      "Mentoria individual"
    ];
    
    for (const part of boldParts) {
      if (text.startsWith(part)) {
        return (
          <>
            <strong className="font-bold text-black/90">{part}</strong>
            {text.slice(part.length)}
          </>
        );
      }
    }
    return text;
  };

  return (
    <section id="mentorship" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex rounded-full bg-[#0CA6DF]/5 px-3 py-1 text-xs font-medium text-[#0CA6DF] ring-1 ring-[#0CA6DF]/10 sm:text-sm">
          {t.badge}
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t.sectionTitle}
        </h2>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className={`group flex flex-col overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-sm transition-all duration-300 ${isExpanded ? 'shadow-xl ring-1 ring-black/5' : ''}`}>
          <div 
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('a')) return;
              setIsExpanded(!isExpanded);
            }}
            className="flex flex-col cursor-pointer h-full"
          >
            <div className="relative aspect-[21/9] overflow-hidden">
              <img 
                src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/mentorship_image.webp" 
                alt={t.title} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                width="800"
                height="342"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            
            <div className="flex flex-col flex-grow p-6 sm:p-10 lg:p-12">
              <div className="flex flex-wrap gap-2 text-[10px] sm:text-xs">
                <span className="rounded-full bg-[#0CA6DF]/10 px-3 py-1.5 text-[#0CA6DF] font-bold uppercase tracking-wider">
                  {t.limitedSpots}
                </span>
                <span className="rounded-full bg-[#EF7722]/10 px-3 py-1.5 text-[#EF7722] font-bold tracking-wider">
                  {t.oneOnOne}
                </span>
              </div>
              
              <h3 className="mt-6 text-2xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl leading-tight">
                {t.title}
              </h3>
              
              <p className="mt-5 text-base leading-relaxed text-black/60 sm:text-lg whitespace-pre-wrap">
                {renderBody(t.body)}
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-black/5 pt-8">
                <div className="flex items-center order-2 sm:order-1">
                  <div className={`w-full sm:w-auto rounded-full border border-black/10 px-8 py-3 text-center text-base font-semibold shadow-sm transition hover:bg-black hover:text-white whitespace-nowrap ${isExpanded ? 'hidden' : 'bg-white'}`}>
                    {t.details}
                  </div>
                  <div className={`w-full sm:w-auto rounded-full border border-black/10 bg-black px-8 py-3 text-center text-base font-semibold text-white shadow-sm whitespace-nowrap ${isExpanded ? 'block' : 'hidden'}`}>
                    {t.close}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 order-1 sm:order-2">
                  <div className="flex-1 sm:flex-none">
                    <a 
                      href={t.checkout}
                      id="mentorship-buy-preview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-compra inline-block w-full sm:w-auto rounded-full bg-[#EF7722] px-8 py-3 text-center text-base font-bold text-white shadow-lg hover:bg-[#d9661b] transition-all whitespace-nowrap hover:scale-105 active:scale-95 ${isExpanded ? 'hidden' : ''}`}
                    >
                      {t.button}
                    </a>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-black/30 leading-none mb-1">{t.investmentLabel}</span>
                    <div className="text-2xl sm:text-3xl font-bold text-[#EF7722]">
                      {t.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isExpanded && (
            <div className="px-8 pb-8 sm:px-10 sm:pb-10">
              <div className="rounded-[24px] bg-[#FAFAF8] p-8 ring-1 ring-black/5">
                <div className="mb-10">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#0CA6DF] mb-4">{t.aboutTitle}</div>
                  <p className="text-lg text-black/70 leading-relaxed whitespace-pre-wrap italic">
                    {renderBody(t.body)}
                  </p>
                </div>

                <div className="space-y-12 mb-10">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#0CA6DF]">{t.scheduleTitle}</div>
                  
                  {t.modules.map((module) => (
                    <div key={module.title} className="space-y-6">
                      <h4 className="text-lg sm:text-xl font-bold text-black border-l-4 border-[#0CA6DF] pl-4">
                        {module.title}
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                        {module.weeks.map((week) => (
                          <div key={week.label} className="rounded-2xl bg-white p-5 border border-black/5 shadow-sm">
                            <div className="text-xs font-bold text-[#EF7722] uppercase tracking-wider mb-2">
                              {week.label}
                            </div>
                            <p className="text-sm text-black/70 leading-relaxed">
                              {week.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 pt-8 border-t border-black/5 flex flex-col sm:flex-row gap-4">
                  <a 
                    href={t.checkout}
                    id="mentorship-buy-full"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-compra flex-1 rounded-2xl bg-[#EF7722] px-6 py-5 text-center text-lg font-bold text-white shadow-xl shadow-[#EF7722]/20 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    {t.button}
                  </a>
                  <a 
                    href={t.checkoutInstallments}
                    id="mentorship-buy-installments"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-compra flex-1 rounded-2xl border-2 border-[#EF7722] px-1 py-5 text-center text-lg font-bold text-[#EF7722] transition-all hover:bg-[#EF7722] hover:text-white hover:scale-[1.02] active:scale-95"
                  >
                    {t.buttonInstallments}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
