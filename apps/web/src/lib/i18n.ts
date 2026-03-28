export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Espa\u00f1ol" },
  { code: "fr", label: "Fran\u00e7ais" },
  { code: "de", label: "Deutsch" },
  { code: "ja", label: "\u65e5\u672c\u8a9e" },
] as const;

export type Locale = (typeof LANGUAGES)[number]["code"];

type UIStrings = {
  helpCenter: string;
  searchPlaceholder: string;
  searchPlaceholderHero: string;
  searchButton: string;
  popular: string;
  browseByCategory: string;
  featuredArticles: string;
  videoTutorials: string;
  allSystemsOperational: string;
  someSystemsDegraded: string;
  systemOutage: string;
  checkingStatus: string;
  viewStatusPage: string;
  articles: string;
  minRead: string;
  viewMore: string;
  heroTitle: string;
  heroSubtitle: string;
  chatTitle: string;
  chatSubtitle: string;
  chatPlaceholder: string;
  chatWelcome: string;
  chipBilling: string;
  chipPasswordReset: string;
  chipIntegrations: string;
  chipApiKeys: string;
  footerTagline: string;
  footerSupport: string;
  footerHelpCenter: string;
  footerContactUs: string;
  footerSystemStatus: string;
  footerCompany: string;
  footerAbout: string;
  footerBlog: string;
  footerCareers: string;
  footerLegal: string;
  footerPrivacy: string;
  footerTerms: string;
  footerCookies: string;
  footerCopyright: string;
};

const translations: Record<Locale, UIStrings> = {
  en: {
    helpCenter: "Help Center",
    searchPlaceholder: "Search for answers...",
    searchPlaceholderHero: "Search for articles, tutorials, and more...",
    searchButton: "Search",
    popular: "Popular:",
    browseByCategory: "Browse by Category",
    featuredArticles: "Featured Articles",
    videoTutorials: "Video Tutorials",
    allSystemsOperational: "All Systems Operational",
    someSystemsDegraded: "Some Systems Degraded",
    systemOutage: "System Outage",
    checkingStatus: "Checking system status...",
    viewStatusPage: "View full status page",
    articles: "articles",
    minRead: "min read",
    viewMore: "View more articles",
    heroTitle: "How can we help you?",
    heroSubtitle: "Search our knowledge base or browse the categories below",
    chatTitle: "CloudDesk Support",
    chatSubtitle: "We typically reply instantly",
    chatPlaceholder: "Type a message...",
    chatWelcome: "Hi! How can I help you today? Ask me about billing, passwords, integrations, or anything else.",
    chipBilling: "Billing",
    chipPasswordReset: "Password reset",
    chipIntegrations: "Integrations",
    chipApiKeys: "API keys",
    footerTagline: "Helping teams work smarter.",
    footerSupport: "Support",
    footerHelpCenter: "Help Center",
    footerContactUs: "Contact Us",
    footerSystemStatus: "System Status",
    footerCompany: "Company",
    footerAbout: "About",
    footerBlog: "Blog",
    footerCareers: "Careers",
    footerLegal: "Legal",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerCookies: "Cookie Policy",
    footerCopyright: "CloudDesk, Inc. All rights reserved.",
  },
  es: {
    helpCenter: "Centro de Ayuda",
    searchPlaceholder: "Buscar respuestas...",
    searchPlaceholderHero: "Buscar art\u00edculos, tutoriales y m\u00e1s...",
    searchButton: "Buscar",
    popular: "Popular:",
    browseByCategory: "Explorar por Categor\u00eda",
    featuredArticles: "Art\u00edculos Destacados",
    videoTutorials: "Tutoriales en Video",
    allSystemsOperational: "Todos los Sistemas Operativos",
    someSystemsDegraded: "Algunos Sistemas Degradados",
    systemOutage: "Interrupci\u00f3n del Sistema",
    checkingStatus: "Verificando estado del sistema...",
    viewStatusPage: "Ver p\u00e1gina de estado",
    articles: "art\u00edculos",
    minRead: "min de lectura",
    viewMore: "Ver m\u00e1s art\u00edculos",
    heroTitle: "\u00bfC\u00f3mo podemos ayudarte?",
    heroSubtitle: "Busca en nuestra base de conocimiento o explora las categor\u00edas",
    chatTitle: "Soporte CloudDesk",
    chatSubtitle: "Respondemos al instante",
    chatPlaceholder: "Escribe un mensaje...",
    chatWelcome: "\u00a1Hola! \u00bfEn qu\u00e9 puedo ayudarte? Pregunta sobre facturaci\u00f3n, contrase\u00f1as, integraciones o cualquier otra cosa.",
    chipBilling: "Facturaci\u00f3n",
    chipPasswordReset: "Restablecer contrase\u00f1a",
    chipIntegrations: "Integraciones",
    chipApiKeys: "Claves API",
    footerTagline: "Ayudando a los equipos a trabajar mejor.",
    footerSupport: "Soporte",
    footerHelpCenter: "Centro de Ayuda",
    footerContactUs: "Cont\u00e1ctenos",
    footerSystemStatus: "Estado del Sistema",
    footerCompany: "Empresa",
    footerAbout: "Acerca de",
    footerBlog: "Blog",
    footerCareers: "Carreras",
    footerLegal: "Legal",
    footerPrivacy: "Pol\u00edtica de Privacidad",
    footerTerms: "T\u00e9rminos de Servicio",
    footerCookies: "Pol\u00edtica de Cookies",
    footerCopyright: "CloudDesk, Inc. Todos los derechos reservados.",
  },
  fr: {
    helpCenter: "Centre d\u2019Aide",
    searchPlaceholder: "Rechercher des r\u00e9ponses...",
    searchPlaceholderHero: "Rechercher des articles, tutoriels et plus...",
    searchButton: "Rechercher",
    popular: "Populaire :",
    browseByCategory: "Parcourir par Cat\u00e9gorie",
    featuredArticles: "Articles en Vedette",
    videoTutorials: "Tutoriels Vid\u00e9o",
    allSystemsOperational: "Tous les Syst\u00e8mes Op\u00e9rationnels",
    someSystemsDegraded: "Certains Syst\u00e8mes D\u00e9grad\u00e9s",
    systemOutage: "Panne du Syst\u00e8me",
    checkingStatus: "V\u00e9rification de l\u2019\u00e9tat du syst\u00e8me...",
    viewStatusPage: "Voir la page d\u2019\u00e9tat",
    articles: "articles",
    minRead: "min de lecture",
    viewMore: "Voir plus d\u2019articles",
    heroTitle: "Comment pouvons-nous vous aider ?",
    heroSubtitle: "Recherchez dans notre base de connaissances ou parcourez les cat\u00e9gories",
    chatTitle: "Support CloudDesk",
    chatSubtitle: "Nous r\u00e9pondons instantan\u00e9ment",
    chatPlaceholder: "Tapez un message...",
    chatWelcome: "Bonjour ! Comment puis-je vous aider ? Posez vos questions sur la facturation, les mots de passe, les int\u00e9grations ou autre.",
    chipBilling: "Facturation",
    chipPasswordReset: "Mot de passe",
    chipIntegrations: "Int\u00e9grations",
    chipApiKeys: "Cl\u00e9s API",
    footerTagline: "Aider les \u00e9quipes \u00e0 travailler plus intelligemment.",
    footerSupport: "Assistance",
    footerHelpCenter: "Centre d\u2019Aide",
    footerContactUs: "Contactez-nous",
    footerSystemStatus: "\u00c9tat du Syst\u00e8me",
    footerCompany: "Entreprise",
    footerAbout: "\u00c0 propos",
    footerBlog: "Blog",
    footerCareers: "Carri\u00e8res",
    footerLegal: "Mentions L\u00e9gales",
    footerPrivacy: "Politique de Confidentialit\u00e9",
    footerTerms: "Conditions d\u2019Utilisation",
    footerCookies: "Politique de Cookies",
    footerCopyright: "CloudDesk, Inc. Tous droits r\u00e9serv\u00e9s.",
  },
  de: {
    helpCenter: "Hilfezentrum",
    searchPlaceholder: "Antworten suchen...",
    searchPlaceholderHero: "Artikel, Tutorials und mehr suchen...",
    searchButton: "Suchen",
    popular: "Beliebt:",
    browseByCategory: "Nach Kategorie durchsuchen",
    featuredArticles: "Empfohlene Artikel",
    videoTutorials: "Video-Tutorials",
    allSystemsOperational: "Alle Systeme betriebsbereit",
    someSystemsDegraded: "Einige Systeme beeintr\u00e4chtigt",
    systemOutage: "Systemausfall",
    checkingStatus: "Systemstatus wird \u00fcberpr\u00fcft...",
    viewStatusPage: "Statusseite anzeigen",
    articles: "Artikel",
    minRead: "Min. Lesezeit",
    viewMore: "Mehr Artikel anzeigen",
    heroTitle: "Wie k\u00f6nnen wir Ihnen helfen?",
    heroSubtitle: "Durchsuchen Sie unsere Wissensdatenbank oder st\u00f6bern Sie in den Kategorien",
    chatTitle: "CloudDesk Support",
    chatSubtitle: "Wir antworten sofort",
    chatPlaceholder: "Nachricht eingeben...",
    chatWelcome: "Hallo! Wie kann ich Ihnen helfen? Fragen Sie zu Abrechnung, Passw\u00f6rtern, Integrationen oder anderem.",
    chipBilling: "Abrechnung",
    chipPasswordReset: "Passwort zur\u00fccksetzen",
    chipIntegrations: "Integrationen",
    chipApiKeys: "API-Schl\u00fcssel",
    footerTagline: "Teams helfen, intelligenter zu arbeiten.",
    footerSupport: "Support",
    footerHelpCenter: "Hilfezentrum",
    footerContactUs: "Kontakt",
    footerSystemStatus: "Systemstatus",
    footerCompany: "Unternehmen",
    footerAbout: "\u00dcber uns",
    footerBlog: "Blog",
    footerCareers: "Karriere",
    footerLegal: "Rechtliches",
    footerPrivacy: "Datenschutzrichtlinie",
    footerTerms: "Nutzungsbedingungen",
    footerCookies: "Cookie-Richtlinie",
    footerCopyright: "CloudDesk, Inc. Alle Rechte vorbehalten.",
  },
  ja: {
    helpCenter: "\u30d8\u30eb\u30d7\u30bb\u30f3\u30bf\u30fc",
    searchPlaceholder: "\u56de\u7b54\u3092\u691c\u7d22...",
    searchPlaceholderHero: "\u8a18\u4e8b\u3001\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb\u306a\u3069\u3092\u691c\u7d22...",
    searchButton: "\u691c\u7d22",
    popular: "\u4eba\u6c17\uff1a",
    browseByCategory: "\u30ab\u30c6\u30b4\u30ea\u30fc\u3067\u63a2\u3059",
    featuredArticles: "\u6ce8\u76ee\u306e\u8a18\u4e8b",
    videoTutorials: "\u52d5\u753b\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb",
    allSystemsOperational: "\u5168\u30b7\u30b9\u30c6\u30e0\u6b63\u5e38\u7a3c\u50cd\u4e2d",
    someSystemsDegraded: "\u4e00\u90e8\u30b7\u30b9\u30c6\u30e0\u306b\u969c\u5bb3",
    systemOutage: "\u30b7\u30b9\u30c6\u30e0\u969c\u5bb3\u767a\u751f",
    checkingStatus: "\u30b7\u30b9\u30c6\u30e0\u72b6\u614b\u3092\u78ba\u8a8d\u4e2d...",
    viewStatusPage: "\u30b9\u30c6\u30fc\u30bf\u30b9\u30da\u30fc\u30b8\u3092\u898b\u308b",
    articles: "\u4ef6\u306e\u8a18\u4e8b",
    minRead: "\u5206\u3067\u8aad\u3081\u308b",
    viewMore: "\u3055\u3089\u306b\u8a18\u4e8b\u3092\u898b\u308b",
    heroTitle: "\u3069\u306e\u3088\u3046\u306b\u304a\u624b\u4f1d\u3044\u3067\u304d\u307e\u3059\u304b\uff1f",
    heroSubtitle: "\u30ca\u30ec\u30c3\u30b8\u30d9\u30fc\u30b9\u3092\u691c\u7d22\u3059\u308b\u304b\u3001\u30ab\u30c6\u30b4\u30ea\u30fc\u3092\u95b2\u89a7\u3057\u3066\u304f\u3060\u3055\u3044",
    chatTitle: "CloudDesk\u30b5\u30dd\u30fc\u30c8",
    chatSubtitle: "\u5373\u5ea7\u306b\u5bfe\u5fdc\u3057\u307e\u3059",
    chatPlaceholder: "\u30e1\u30c3\u30bb\u30fc\u30b8\u3092\u5165\u529b...",
    chatWelcome: "\u3053\u3093\u306b\u3061\u306f\uff01\u4f55\u304b\u304a\u624b\u4f1d\u3044\u3067\u304d\u307e\u3059\u304b\uff1f\u8acb\u6c42\u3001\u30d1\u30b9\u30ef\u30fc\u30c9\u3001\u30a4\u30f3\u30c6\u30b0\u30ec\u30fc\u30b7\u30e7\u30f3\u306a\u3069\u306b\u3064\u3044\u3066\u304a\u6c17\u8efd\u306b\u3069\u3046\u305e\u3002",
    chipBilling: "\u8acb\u6c42",
    chipPasswordReset: "\u30d1\u30b9\u30ef\u30fc\u30c9\u30ea\u30bb\u30c3\u30c8",
    chipIntegrations: "\u30a4\u30f3\u30c6\u30b0\u30ec\u30fc\u30b7\u30e7\u30f3",
    chipApiKeys: "API\u30ad\u30fc",
    footerTagline: "\u30c1\u30fc\u30e0\u304c\u3088\u308a\u8ce2\u304f\u50cd\u3051\u308b\u3088\u3046\u306b\u3002",
    footerSupport: "\u30b5\u30dd\u30fc\u30c8",
    footerHelpCenter: "\u30d8\u30eb\u30d7\u30bb\u30f3\u30bf\u30fc",
    footerContactUs: "\u304a\u554f\u3044\u5408\u308f\u305b",
    footerSystemStatus: "\u30b7\u30b9\u30c6\u30e0\u30b9\u30c6\u30fc\u30bf\u30b9",
    footerCompany: "\u4f1a\u793e\u60c5\u5831",
    footerAbout: "\u6982\u8981",
    footerBlog: "\u30d6\u30ed\u30b0",
    footerCareers: "\u63a1\u7528\u60c5\u5831",
    footerLegal: "\u6cd5\u7684\u60c5\u5831",
    footerPrivacy: "\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u30dd\u30ea\u30b7\u30fc",
    footerTerms: "\u5229\u7528\u898f\u7d04",
    footerCookies: "Cookie\u30dd\u30ea\u30b7\u30fc",
    footerCopyright: "CloudDesk, Inc. All rights reserved.",
  },
};

export function t(locale: Locale): UIStrings {
  return translations[locale] || translations.en;
}
