import { Course, Bundle, Testimonial, SocialLink } from './types';

export const TRANSLATIONS = {
  en: {
    nav: {
      courses: "Courses",
      mentorship: "Mentorship",
      portfolio: "Portfolio",
      contact: "Contact",
      members: "https://members.vinicavalcanti.com"
    },
    hero: {
      badge: "Vini Cavalcanti School",
      headline: "Learn to create memorable 3D characters for games.",
      subheadline: "A school dedicated to 3D character art for games, taught by someone who lives this process every day inside real studios.",
      button: "Explore Courses"
    },
    about: {
      badge: "The School",
      title: "Learn from someone who's inside the industry, not just talking about it.",
      body: "Hi, I'm Vini Cavalcanti. I'm a Senior 3D Character Artist with 10+ years of experience in the games and entertainment industry, focused on visual development and stylized characters. I'm currently part of the team at E-Line Media, working on the game Endstar, and throughout my career I've contributed to productions like the animated series The Wingfeather Saga (Angel Studios) and games like Wonderbox and Dice Dreams at PUGA Studios.\n\nI'm a Master's M.A. Cand. in Creative Industries and a Game Art Specialist (PG Dip). More than creating, I've always loved teaching. I've mentored students who now work in the industry, and I know exactly which challenges come up along the way because I've been through them too.\n\nVini Cavalcanti School exists to be the shortcut I wish I'd had: a place where you learn the real process, guided by someone who lives it every single day.",
      tags: ["Senior Artist", "10+ years exp", "Industry active"]
    },
    courses: {
      title: "Choose where you want to grow",
      filters: {
        all: "All",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced"
      },
      filterValues: {
        all: "All",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced"
      },
      duration: "Duration",
      software: "Software",
      details: "See +",
      close: "See -",
      buy: "Get this course",
      loadMore: "Load more courses",
      priceLabel: "Price",
      lessonsTitle: "Lessons included",
      comingSoon: "Coming Soon",
      isNew: "NEW"
    },
    mentorship: {
      sectionTitle: "Mentorship Program",
      badge: "Mentorship",
      label: "For those who want to go further",
      title: "Vini Cavalcanti Mentorship Program",
      body: "One-on-one mentorship for artists who want to grow with real industry guidance.\n\nOver 10 weeks, you’ll receive direct, one-on-one guidance from a Senior Character Artist who works in the industry every day. You’ll build a complete character from the very first blockout to a portfolio-ready final piece, with feedback and support at every stage of the process.\n\nThis is not a course. It’s a mentorship.\n\nSee the full schedule below and everything you’ll develop throughout the journey.",
      button: "Start Now!",
      buttonInstallments: "Sign up now! 3 payments",
      checkoutInstallments: "https://pay.hotmart.com/D105581670W?off=1l4bjdm8",
      price: "$600",
      investmentLabel: "Investment",
      details: "See +",
      close: "See -",
      limitedSpots: "Limited Spots",
      oneOnOne: "One-on-One Mentorship",
      aboutTitle: "About the mentorship",
      scheduleTitle: "Mentorship Schedule",
      checkout: "https://pay.hotmart.com/D105581670W",
      modules: [
        {
          title: "Module 1: Sculpture & Character Foundation (ZBrush & Blender)",
          weeks: [
            { label: "Week 1", text: "Primary Forms & Blocking. Focus on silhouette and proportions. Use Zbrush for initial blocking for a more organic start." },
            { label: "Week 2", text: "Head & Facial Features. Deep dive into facial anatomy, planes of the face, and character personality in ZBrush." },
            { label: "Week 3", text: "Hands & Anatomical Detailing. Refining the secondary forms of the body and hands in ZBrush." },
            { label: "Week 4", text: "Hair Block-out. Sculpting the primary volumes of the hair to define flow and silhouette." },
            { label: "Week 5", text: "Clothing & Accessories. Hard-surface modeling in Blender or organic cloth sculpting in ZBrush." },
            { label: "Week 6", text: "Posing & Composition. Bringing the character to life. Final silhouette check and refinement of the pose." }
          ]
        },
        {
          title: "Module 2: Advanced Grooming & LookDev (Houdini & Substance)",
          weeks: [
            { label: "Week 7", text: "Texturing & PBR Workflow. Creating high-quality textures in Substance Painter." },
            { label: "Week 8", text: "Intro to Houdini Grooming. Setting up the Houdini environment, creating guides, and initializing." },
            { label: "Week 9", text: "Advanced Grooming & LookDev. Refinement of clumping, frizz, and technical noise." }
          ]
        },
        {
          title: "Module 3: Final Presentation (Houdini)",
          weeks: [
            { label: "Week 10", text: "Final Rendering & Portfolio. Rendering high-resolution passes and portfolio presentation." }
          ]
        }
      ]
    },
    testimonials: {
      title: "Artists already on their way.",
      subtitle: "From different skill levels and different parts of the world, using these courses to build real portfolios and take real steps into the industry.",
      items: [
        { name: "Bruno Martins", country: "", course: "3D Artist / Motion", text: "Vini's courses were essential in helping me switch to Blender, and I highly recommend them. I've always worked with Cinema 4D and Autodesk Maya and found it difficult to switch because Blender is quite different. However, thanks to the courses, I’m already using it in my pipeline for some projects, and soon I’ll be using it 100% of the time." },
        { name: "João Emeroso", country: "", course: "3D Character Artist", text: "What I like most about Vini teaching method is that, beyond using the pipelines of the biggest animation studios, he presents them in an uncomplicated way — he teaches in such a manner that even the most professional processes become logical and make sense within the workflow." },
        { name: "João Gilberto", country: "", course: "3D Artist", text: "Taking classes with Vini has been amazing. I was very afraid of not being good enough to keep up with his classes, but his teaching and explanations are very precise and make everything clear. He always answers us when we have questions. Today, I believe I can become a good Character Artist soon." },
        { name: "Rodrigo Kehado", country: "", course: "3D Character Artist", text: "Vini’s classes really elevated the level of my work, especially in how I see the entire process. The retopology part with TopoGun became much clearer. Today, I have a much better understanding of edge loop flow and how to prepare meshes with animation and game performance in mind." }
      ]
    },
    faq: {
      badge: "FAQ",
      title: "Frequently asked questions",
      subtitle: "If you still have questions, they're probably answered right here."
    },
    bundles: {
      badge: "Bundles",
      title: "Combos designed to speed up your choice",
      subtitle: "A more organized path for those who want to buy with more clarity and make better use of content progression.",
      buy: "Get this bundle",
      details: "See +",
      close: "See -",
      priceLabel: "Price",
      includedTitle: "Courses included",
      comboLabel: "Combo"
    },
    cta: {
      headline: "Ready to get started?",
      subtitle: "Choose the course that makes sense for you right now and start building the portfolio and skills that will take you where you want to go.",
      button: "Browse Courses",
      support: ["Lifetime access", "At your own pace", "Taught by someone inside the industry"]
    },
    footer: {
      rights: "© 2026 Vini Cavalcanti School",
      tagline: "Building Digital Legacies through 3D Art",
      links: ["Courses", "Mentorship", "FAQ", "Contact"]
    },
    contact: {
      badge: "Contact",
      title: "Get in touch",
      subtitle: "Have a question or want to discuss something? Send a message and I'll get back to you as soon as possible.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent! I'll get back to you soon.",
      error: "Something went wrong. Please try again later.",
      placeholders: {
        name: "Your name",
        email: "your@email.com",
        message: "How can I help you?"
      }
    },
    sticky: {
      courses: "Browse Courses",
      members: "Members Area"
    }
  },
  pt: {
    nav: {
      courses: "Cursos",
      mentorship: "Mentoria",
      portfolio: "Portfólio",
      contact: "Contato",
      members: "https://members.vinicavalcanti.com"
    },
    hero: {
      badge: "Vini Cavalcanti School",
      headline: "Aprenda a criar personagens 3D memoráveis para jogos.",
      subheadline: "Uma escola dedicada ao universo de personagens 3D para games, com um professor que vive esse processo todo dia dentro de estúdios reais.",
      button: "Explorar Cursos"
    },
    about: {
      badge: "A Escola",
      title: "Aprenda com quem está dentro da indústria, não só falando sobre ela.",
      body: "Olá, eu sou Vini Cavalcanti. Sou Senior 3D Character Artist com 10+ anos de experiência na indústria de games e entretenimento, focado em desenvolvimento visual e personagens estilizados. Atualmente, faço parte da equipe na E-Line Media, trabalhando no jogo Endstar, e ao longo da minha carreira contribuí para produções como a série animada The Wingfeather Saga (Angel Studios) e jogos como Wonderbox e Dice Dreams na PUGA Studios.\n\nSou Mestrando (M.A. Cand.) em Indústrias Criativas e Especialista em Game Art (PG Dip). Mais do que criar, sempre amei ensinar. Já mentorei alunos que hoje trabalham na indústria, e sei exatamente quais desafios aparecem no caminho porque também passei por eles.\n\nA Vini Cavalcanti School existe para ser o atalho que eu gostaria de ter tido: um lugar onde você aprende o processo real, guiado por quem vive isso todos os dias.",
      tags: ["Senior Artist", "10+ anos exp", "Ativo na indústria"]
    },
    courses: {
      title: "Escolha onde você quer evoluir",
      filters: {
        all: "Todos",
        beginner: "Iniciante",
        intermediate: "Intermediário",
        advanced: "Avançado"
      },
      filterValues: {
        all: "All",
        beginner: "Iniciante",
        intermediate: "Intermediário",
        advanced: "Avançado"
      },
      duration: "Duração",
      software: "Software",
      details: "Ver +",
      close: "Ver -",
      buy: "Comprar curso",
      loadMore: "Ver mais cursos",
      priceLabel: "Preço",
      lessonsTitle: "Aulas inclusas",
      comingSoon: "Em Breve",
      isNew: "NOVO"
    },
    mentorship: {
      sectionTitle: "Programa de Mentoria",
      badge: "Mentoria",
      label: "Para quem quer ir mais fundo",
      title: "Vini Cavalcanti Mentorship Program",
      body: "Mentoria individual para artistas que querem evoluir com direção real de mercado.\n\nDurante 10 semanas, você terá acompanhamento direto, um a um, com um Senior Character Artist que atua diariamente na indústria. Você vai construir um personagem completo, desde a primeira blocagem até uma peça final pronta para portfólio, com feedback e suporte em cada etapa do processo.\n\nIsso não é um curso. É uma mentoria.\n\nVeja abaixo a grade completa e tudo o que você vai desenvolver ao longo da jornada.",
      button: "Comece Agora!",
      buttonInstallments: "Inscreva-se agora! 3x",
      checkoutInstallments: "https://pay.hotmart.com/D105581670W?off=1l4bjdm8",
      price: "$600",
      investmentLabel: "Investimento",
      details: "Ver +",
      close: "Ver -",
      limitedSpots: "Vagas Limitadas",
      oneOnOne: "Mentoria Individual",
      aboutTitle: "Sobre a mentoria",
      scheduleTitle: "Grade da Mentoria",
      checkout: "https://pay.hotmart.com/D105581670W",
      modules: [
        {
          title: "Módulo 1: Fundação de Escultura e Personagem (ZBrush & Blender)",
          weeks: [
            { label: "Semana 1", text: "Formas Primárias & Blocagem. Foco em silhueta e proporções. Uso de ZBrush para um início mais orgânico." },
            { label: "Semana 2", text: "Cabeça & Traços Faciais. Mergulho profundo em anatomia facial e personalidade no ZBrush." },
            { label: "Semana 3", text: "Mãos & Detalhamento Anatômico. Refino de formas secundárias no ZBrush." },
            { label: "Semana 4", text: "Blocagem de Cabelo. Esculturas dos volumes primários para definir fluxo e silhueta." },
            { label: "Semana 5", text: "Roupas & Acessórios. Modelagem Hard-surface no Blender ou escultura orgânica no ZBrush." },
            { label: "Semana 6", text: "Pose & Composição. Dando vida ao personagem. Checagem final de silhueta e pose." }
          ]
        },
        {
          title: "Módulo 2: Grooming Avançado & LookDev (Houdini & Substance)",
          weeks: [
            { label: "Semana 7", text: "Texturização & Fluxo PBR. Criando texturas de alta qualidade no Substance Painter." },
            { label: "Semana 8", text: "Intro ao Grooming no Houdini. Configuração de ambiente, criação de guias e inicialização." },
            { label: "Semana 9", text: "Grooming Avançado & LookDev. Refino de clumping, frizz e ruído técnico." }
          ]
        },
        {
          title: "Módulo 3: Apresentação Final (Houdini)",
          weeks: [
            { label: "Semana 10", text: "Render Final & Portfólio. Passes em alta resolução e organização para apresentação profissional." }
          ]
        }
      ]
    },
    testimonials: {
      title: "Artistas que já estão no caminho.",
      subtitle: "De diferentes níveis e de diferentes partes do mundo, usando esses cursos para construir portfólios reais e dar os próximos passos na indústria.",
      items: [
        { name: "Bruno Martins", country: "", course: "3D Artist / Motion", text: "Os cursos do Vini foram essenciais para me ajudar a migrar para o Blender, e eu recomendo muito. Sempre trabalhei com Cinema 4D e Autodesk Maya e achei difícil a transição, porque o Blender é bem diferente. No entanto, graças aos cursos, já estou usando ele no meu pipeline em alguns projetos e, em breve, estarei utilizando 100% do tempo." },
        { name: "João Emeroso", country: "", course: "3D Character Artist", text: "O que eu mais gosto na metodologia de ensino do Vini é que, além de utilizar os pipelines dos maiores estúdios de animação, ele apresenta isso de forma descomplicada — ele ensina de um jeito em que até os processos mais profissionais se tornam lógicos e fazem sentido dentro do workflow." },
        { name: "João Gilberto", country: "", course: "3D Artist", text: "Fazer aulas com o Vini tem sido incrível. Eu tinha muito medo de não ser bom o suficiente para acompanhar as aulas, mas a didática e as explicações dele são muito precisas e tornam tudo claro. Ele sempre responde quando temos dúvidas. Hoje, eu acredito que posso me tornar um bom Character Artist em breve." },
        { name: "Rodrigo Kehado", country: "", course: "3D Character Artist", text: "As aulas do Vini realmente elevaram o nível do meu trabalho, especialmente na forma como eu enxergo todo o processo. A parte de retopologia com o TopoGun ficou muito mais clara. Hoje, tenho um entendimento muito melhor sobre o fluxo de edge loops e como preparar malhas pensando em animação e performance em jogos." }
      ]
    },
    faq: {
      badge: "Dúvidas",
      title: "Perguntas frequentes",
      subtitle: "Se ainda ficou alguma dúvida, é bem provável que ela esteja aqui."
    },
    bundles: {
      badge: "Combos",
      title: "Combos pensados para acelerar a escolha",
      subtitle: "Trilha mais organizada para quem quer comprar com mais clareza e aproveitar melhor a progressão dos conteúdos.",
      buy: "Comprar combo",
      details: "Ver +",
      close: "Ver -",
      priceLabel: "Preço",
      includedTitle: "Cursos inclusos",
      comboLabel: "Combo"
    },
    cta: {
      headline: "Pronto para começar?",
      subtitle: "Escolha o curso que faz sentido pra você agora e comece a construir o portfólio e as habilidades que vão te levar onde você quer chegar.",
      button: "Ver Cursos",
      support: ["Acesso vitalício", "No seu ritmo", "Com quem vive a indústria"]
    },
    footer: {
      rights: "© 2026 Vini Cavalcanti School",
      tagline: "Construindo Legados Digitais através da Arte 3D",
      links: ["Cursos", "Mentoria", "FAQ", "Contato"]
    },
    contact: {
      badge: "Contato",
      title: "Fale comigo",
      subtitle: "Tem alguma dúvida ou quer conversar sobre algo? Envie uma mensagem e eu responderei o mais breve possível.",
      name: "Nome",
      email: "E-mail",
      message: "Mensagem",
      send: "Enviar Mensagem",
      sending: "Enviando...",
      success: "Mensagem enviada! Retornarei em breve.",
      error: "Algo deu errado. Por favor, tente novamente mais tarde.",
      placeholders: {
        name: "Seu nome",
        email: "seu@email.com",
        message: "Como posso te ajudar?"
      }
    },
    sticky: {
      courses: "Ver Cursos",
      members: "Área de Membros"
    }
  }
};

export const COURSES_EN: Course[] = [
  {
    title: "ZBrush for Stylized Characters",
    desc: "From concept to finished sculpt, learn the complete process for creating original stylized characters in ZBrush.",
    expandedDesc: "This course covers Vini's complete workflow for designing and sculpting original stylized characters. As a Visual Development artist, the focus is on the creative decisions and technical execution required to build a character's identity directly in 3D.\n\nExclusive student bonus 🎁: Purchasing this course gives you free access to an exclusive topology basemesh, brush pack, and custom ZBrush UI. You also receive a 30% discount on the TopoGun 3 Perpetual License.",
    image: "https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/course-Zbrush_For_Stylized_Characters.webp",
    level: "Beginner / Intermediate",
    lang: "EN (PT Subtitles)",
    software: "ZBrush",
    duration: "6h30min",
    price: "$49",
    learn: [
      "Design and volume",
      "Form language",
      "Stylized sculpting",
      "Final refinement"
    ],
    checkout: "https://pay.hotmart.com/J105527673H"
  },
  {
    title: "Retopology in TopoGun 3",
    desc: "Clean, efficient topology is what separates an amateur model from a production-ready one.",
    expandedDesc: "Retopology is the step many artists dread, but it makes all the difference in the final result. This hands-on course will help you build efficient, clean topology without the common beginner mistakes. We'll cover how to tackle tricky areas like hands, create perfect edge loops for animation, and keep your poly count low without sacrificing quality.\n\nExclusive student bonus 🎁: Purchasing this course makes you eligible for a 30% discount on the TopoGun 3 Perpetual License.",
    image: "https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/course_retopologia_in_topoGun3.webp",
    level: "Intermediate",
    lang: "EN (PT Subtitles)",
    software: "TopoGun 3",
    duration: "3h",
    price: "$39",
    learn: [
      "Clean topology foundations",
      "Tricky areas resolution",
      "Edge loops for animation",
      "Poly count optimization"
    ],
    checkout: "https://pay.hotmart.com/S105526894H"
  },
  {
    title: "Character Design: Baby Allosaurus",
    desc: "From storytelling to final render, a complete stylized character pipeline across 4 modules.",
    expandedDesc: "Creating a memorable character starts long before you open ZBrush. In this course you'll learn to build a stylized character from scratch, going through every stage of the process: from storytelling and intentional design all the way to final scene composition and portfolio render.",
    image: "https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/Character_Design_Baby_Allosaurus.webp",
    level: "Beginner / Intermediate",
    lang: "EN (PT Subtitles)",
    software: "ZBrush, Blender",
    duration: "7h30min",
    price: "$49",
    learn: [
      "Foundations — Storytelling and Character Design",
      "ZBrush — Blockout and Chibi Proportions",
      "ZBrush — Sculpting, Detailing, and Expression",
      "Final Render — Lighting, Scene, and Visual Storytelling"
    ],
    checkout: "https://pay.hotmart.com/M105761103N",
    isNew: true
  }
];

export const COURSES_PT: Course[] = [
  {
    title: "ZBrush para Personagens Estilizados",
    desc: "Do conceito à escultura finalizada, aprenda o processo completo de criação de personagens estilizados originais no ZBrush.",
    expandedDesc: "Nesse curso você vai aprender o processo completo que o Vini usa para projetar e esculpir personagens estilizados originais. Como artista de desenvolvimento visual, o foco está nas decisões criativas e na execução técnica necessárias para construir a identidade de um personagem diretamente no 3D.\n\nBônus exclusivo para alunos 🎁: Ao comprar este curso, você recebe acesso gratuito ao basemesh de topologia exclusivo, pack de brushes e UI personalizada do ZBrush. Você também tem direito a 30% de desconto na Licença Perpétua do TopoGun 3.",
    image: "https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/course-Zbrush_For_Stylized_Characters.webp",
    level: "Iniciante / Intermediário",
    lang: "EN (Legendas PT)",
    software: "ZBrush",
    duration: "6h30min",
    price: "$49",
    learn: [
      "Design e volume",
      "Linguagem de formas",
      "Escultura estilizada",
      "Refinamento final"
    ],
    checkout: "https://pay.hotmart.com/J105527673H"
  },
  {
    title: "Retopologia no TopoGun 3",
    desc: "Topologia limpa e eficiente é o que separa um modelo amador de um modelo pronto para produção.",
    expandedDesc: "Retopologia é aquela etapa que muitos artistas temem, mas que faz toda a diferença no resultado final. Nesse curso prático você vai aprender a construir topologia eficiente e limpa sem cometer os erros mais comuns de quem está começando. Vamos abordar como resolver áreas desafiadoras como as mãos, criar edge loops perfeitos para animação e manter a contagem de polígonos baixa sem abrir mão da qualidade.\n\nBônus exclusivo para alunos 🎁: Ao comprar este curso, você tem direito a 30% de desconto na Licença Perpétua do TopoGun 3.",
    image: "https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/course_retopologia_in_topoGun3.webp",
    level: "Intermediário",
    lang: "EN (Legendas PT)",
    software: "TopoGun 3",
    duration: "3h",
    price: "$39",
    learn: [
      "Fundamentos de topologia limpa",
      "Resolução de áreas complexas",
      "Edge loops para animação",
      "Otimização de polígonos"
    ],
    checkout: "https://pay.hotmart.com/S105526894H"
  },
  {
    title: "Character Design: Baby Allosaurus",
    desc: "Do storytelling ao render final, um pipeline completo de personagem estilizado em 4 módulos.",
    expandedDesc: "Criar um personagem memorável começa muito antes de abrir o ZBrush. Nesse curso você vai aprender a construir um personagem estilizado do zero, passando por cada etapa do processo: do storytelling e design intencional até a composição final de cena e render de portfólio.",
    image: "https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/Character_Design_Baby_Allosaurus.webp",
    level: "Iniciante / Intermediário",
    lang: "EN (Legendas PT)",
    software: "ZBrush, Blender",
    duration: "7h30min",
    price: "$49",
    learn: [
      "Fundamentos — Storytelling e Character Design",
      "ZBrush — Blockout e Proporções Chibi",
      "ZBrush — Escultura, Detalhamento e Expressão",
      "Render Final — Iluminação, Cena e Storytelling Visual"
    ],
    checkout: "https://pay.hotmart.com/M105761103N",
    isNew: true
  }
];

export const BUNDLES: Bundle[] = [
  {
    title: "Starter Bundle",
    desc: "Uma trilha mais organizada para começar com base técnica e direção visual.",
    image: "https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/bundle_1.webp",
    price: "R$ 597",
    includes: ["Environment Workflow", "Stylized Props", "Portfolio Presentation"],
    checkout: "#"
  },
  {
    title: "Artist Growth Bundle",
    desc: "Para quem quer evoluir processo, acabamento e leitura visual com mais consistência.",
    image: "https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/bundle_2.webp",
    price: "R$ 797",
    includes: ["Stylized Character", "LookDev", "Advanced Sculpt Details"],
    checkout: "#"
  }
];

export const FAQ_ITEMS = {
  en: [
    {
      q: "Do I need prior experience in 3D?",
      a: "It depends on the course you choose. Some are designed for complete beginners and we cover the concepts from the ground up, step by step. Others are aimed at artists who already have a foundation and want to go deeper into specific parts of the process. Each course clearly indicates the recommended level on its card."
    },
    {
      q: "What software will I need?",
      a: "The required software varies per course and is listed in each course's details before you purchase. In general, we work with ZBrush, Houdini, Blender, Substance Painter, TopoGun 3, and Marmoset Toolbag, which are widely used across the industry."
    },
    {
      q: "Is there a deadline to finish the courses?",
      a: "No. After purchase, access is lifetime. Study at your own pace, on your own schedule, without pressure and come back to the content as many times as you want."
    },
    {
      q: "Are the courses in Portuguese or English?",
      a: "Each course has the language indicated on its card: PT for Portuguese and EN for English. The ZBrush course, for example, is in English with Portuguese subtitles. Use the filters in the courses section to find the format that works best for you."
    },
    {
      q: "Will I be able to build a portfolio with these courses?",
      a: "That's exactly the point. The courses are project-driven and you finish with something real to publish, not just theory in your head. The goal is for you to leave with a piece you can post on ArtStation, use in job applications, or show to a studio."
    },
    {
      q: "How does support work?",
      a: "All students have access to an exclusive community on Discord. The invite link is available in the welcome lesson, right after you enroll. The community has a moderation team to keep the space focused and respectful."
    },
    {
      q: "What if I'm not happy with the course?",
      a: "You have a 15-day money-back guarantee after purchase. During that period, half of the course content is already available for you to explore and decide whether it's the right fit for you."
    }
  ],
  pt: [
    {
      q: "Preciso ter experiência prévia em 3D?",
      a: "Depende do curso que você escolher. Alguns são pensados para quem está começando agora e ensinamos os conceitos desde o início, com calma. Outros são voltados para artistas que já têm uma base e querem ir mais fundo em partes específicas do processo. Cada curso traz o nível recomendado indicado claramente no card."
    },
    {
      q: "Quais softwares vou precisar?",
      a: "Os softwares variam por curso e estão listados nos detalhes de cada um antes da sua compra. No geral, trabalhamos com ZBrush, Houdini, Blender, Substance Painter, TopoGun 3 e Marmoset Toolbag, ferramentas amplamente usadas na indústria."
    },
    {
      q: "Os cursos têm prazo para terminar?",
      a: "Não. Depois da compra, o acesso é vitalício. Você estuda no seu ritmo, no seu tempo, sem pressão e pode voltar ao conteúdo quantas vezes quiser."
    },
    {
      q: "Os cursos são em português ou inglês?",
      a: "Cada curso tem o idioma indicado no card: PT para português e EN para inglês. O curso de ZBrush, por exemplo, é em inglês com legendas em português. Use os filtros na seção de cursos para encontrar o formato que funciona melhor pra você."
    },
    {
      q: "Vou conseguir montar um portfólio com esses cursos?",
      a: "Essa é exatamente a proposta. Os cursos são orientados a projeto e você termina com algo real para publicar, não apenas com teoria na cabeça. O objetivo é que, ao final, você tenha uma peça que possa ir para o ArtStation, para candidaturas de emprego ou para mostrar a um estúdio."
    },
    {
      q: "Como funciona o suporte?",
      a: "Todos os alunos têm acesso a uma comunidade exclusiva no Discord. O link de acesso fica disponível na aula de boas-vindas, logo depois da sua inscrição. A comunidade conta com uma equipe de moderação para manter o ambiente focado e respeitoso."
    },
    {
      q: "E se eu não gostar do curso?",
      a: "Você tem 15 dias de garantia após a compra. Nesse período, metade do conteúdo já está disponível para você explorar e avaliar se o curso é o que você precisa agora. Se decidir que não é pra você, é só entrar em contato e a gente resolve sem complicação."
    }
  ]
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "Instagram", href: "https://www.instagram.com/vinicavalcntiart" },
  { name: "ArtStation", href: "https://www.artstation.com/viniciuscavalcanti" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/vinicavalcnti" }
];
