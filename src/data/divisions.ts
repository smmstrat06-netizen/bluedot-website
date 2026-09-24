/**
 * BlueDot's three divisions, in French and English.
 * English copy is based on BlueDot's existing website; French is a faithful
 * translation. Lines marked [reconstructed] were partly hidden in the source
 * screenshots and should be confirmed by BlueDot.
 * `h1` and `seo` carry the search terms each page targets (Google Keyword
 * Planner, Morocco, Sep 2025–Aug 2026) — see README → "SEO".
 */
import { href, type Lang, type RouteKey } from "../i18n";

export type DivisionId = "consulting" | "agency" | "media";

export interface Service {
  title: string;
  short: string;
  problem: string;
  approach: string;
  result: string;
  /** Optional link to a dedicated page */
  link?: { label: string; to: RouteKey };
}

export interface Division {
  id: DivisionId;
  index: string;
  name: string;
  /** Brand verb, kept in English in both languages */
  verb: string;
  tagline: string;
  accent: string;
  href: string;
  scene: "think" | "create" | "amplify";
  /** Keyword heading (the page's h1) */
  h1: string;
  /** Brand line shown large in the hero */
  headline: string;
  summary: string;
  problem: string;
  outcome: string;
  capabilities: string[];
  cta: string;
  seo: { title: string; description: string };
  services: Service[];
}

type DivisionCopy = Omit<Division, "id" | "index" | "verb" | "accent" | "href" | "scene">;

const base = {
  consulting: { id: "consulting", index: "01", verb: "Think", accent: "var(--think)", scene: "think" },
  agency: { id: "agency", index: "02", verb: "Create", accent: "var(--create)", scene: "create" },
  media: { id: "media", index: "03", verb: "Amplify", accent: "var(--amplify)", scene: "amplify" },
} as const;

const copy: Record<Lang, Record<DivisionId, DivisionCopy>> = {
  en: {
    consulting: {
      name: "Consulting",
      tagline: "Strategy & fractional CMO leadership",
      h1: "Marketing strategy consulting in Casablanca",
      headline: "This is where we think.",
      // [reconstructed] "from marketing strategy to" was hidden in the source
      summary:
        "Strategic marketing support from inside your business — from marketing strategy to fractional CMO leadership.",
      problem: "Strategy without execution stays on paper.",
      outcome: "A clear direction your teams can act on.",
      capabilities: ["Marketing strategy", "Fractional CMO", "Brand strategy", "Creative strategy"],
      cta: "Talk to BlueDot Consulting",
      seo: {
        title: "Marketing Strategy Consulting in Casablanca | BlueDot Consulting",
        description:
          "Marketing strategy consulting in Casablanca: marketing strategy, positioning, brand and creative strategy, and fractional CMO leadership from inside your business.",
      },
      services: [
        {
          title: "Marketing strategy",
          short: "Objectives, audiences, positioning and priorities.",
          problem: "Plenty of activity, but no shared plan — priorities shift with every new idea.",
          approach:
            "We define objectives, audiences, positioning and priorities, and turn them into a plan your teams can follow.",
          result: "A marketing direction everyone understands and can act on.",
        },
        {
          title: "Fractional CMO",
          short: "Senior marketing leadership, inside your business.",
          problem: "You need senior marketing leadership, but a full-time CMO isn't the right step yet.",
          approach:
            "We take the marketing lead from inside your business: setting direction, making decisions and guiding teams and partners.",
          result: "Senior leadership at the level of involvement your business needs.",
        },
        {
          title: "Brand strategy",
          short: "Positioning, value proposition and brand platform.",
          problem: "It isn't clear why customers should choose you — inside the company or out.",
          approach: "We define your positioning, value proposition and brand platform.",
          result: "A clear, shared answer to “why us?”",
        },
        {
          title: "Creative strategy",
          short: "Turning strategy into creative direction.",
          problem: "The strategy gets lost somewhere between the plan and the creative brief.",
          approach:
            "We translate strategy into creative direction — insights, platforms and briefs that give every idea a clear job.",
          result: "Creative work that's on-strategy before production starts.",
        },
      ],
    },
    agency: {
      name: "Agency",
      tagline: "Brand, content, digital & growth",
      h1: "Creative & branding agency in Casablanca",
      headline: "This is where we create.",
      summary: "Strategy brought to life through branding, content, digital and creative execution.",
      problem: "Creativity without direction creates noise.",
      outcome: "One consistent brand across every touchpoint.",
      capabilities: ["Branding", "Social media", "Content", "Websites & digital experiences", "Events", "Lead generation"],
      cta: "Talk to BlueDot Agency",
      seo: {
        title: "Branding, Visual Identity & Content in Casablanca | BlueDot Agency",
        description:
          "Creative agency in Casablanca: branding and visual identity, content and social media, website design, events and lead generation, built from strategy.",
      },
      services: [
        {
          title: "Brands",
          short: "Brand platforms, identities and campaigns.",
          problem: "Your brand doesn't reflect who you are today — or where you're going.",
          approach: "We build brand platforms, visual identities and campaigns rooted in strategy.",
          result: "A distinctive brand that stays consistent wherever people meet it.",
        },
        {
          title: "Content",
          short: "Social media, editorial content and production.",
          problem: "Content gets made, but it doesn't add up to a brand or move your audience.",
          approach: "We plan, create and produce social, editorial and campaign content.",
          result: "Content with a clear purpose, in a recognizable voice.",
        },
        {
          title: "Digital",
          short: "Websites, landing pages and digital experiences.",
          problem: "Your website looks fine, but doesn't help people understand, trust or act.",
          approach: "We design and build websites, landing pages and digital experiences.",
          result: "Digital touchpoints that make the next step obvious.",
          link: { label: "More about website design", to: "website" },
        },
        {
          title: "Experiences",
          // [reconstructed] partly hidden in the source
          short: "Virtual and physical brand touchpoints.",
          problem: "Your brand feels different depending on where people meet it.",
          approach: "We design brand experiences across virtual and physical touchpoints — launches, activations and events.",
          result: "One recognizable experience, online and off.",
          link: { label: "More about events", to: "events" },
        },
        {
          title: "Growth",
          short: "Lead generation, acquisition assets and conversion journeys.",
          problem: "People discover you, but too few become leads or customers.",
          approach: "We create lead generation assets, acquisition campaigns and conversion journeys.",
          result: "A clearer path from attention to action.",
        },
      ],
    },
    media: {
      name: "Media",
      tagline: "Planning, buying & performance",
      h1: "Digital advertising agency in Morocco",
      headline: "This is where we amplify.",
      summary: "Media strategy, buying and optimization designed around real business outcomes.",
      problem: "Media without the right thinking wastes budget.",
      outcome: "Investment that works harder.",
      capabilities: ["Media strategy", "Paid media", "Performance marketing"],
      cta: "Talk to BlueDot Media",
      seo: {
        title: "Digital Advertising Agency in Morocco | BlueDot Media",
        description:
          "BlueDot Media plans, buys, optimizes and measures media across Google Ads, Meta, TikTok and other channels — built around business impact, not vanity metrics.",
      },
      services: [
        {
          title: "Media strategy & planning",
          // [reconstructed] partly hidden in the source
          short: "Where, when and how much to invest.",
          problem: "Budget is spread by habit, not by where it will work hardest.",
          approach: "We define where, when and how much to invest, based on your objectives and audiences.",
          result: "A media plan in which every channel has a clear role.",
        },
        {
          title: "Media buying",
          short: "Paid Social, Search, Display and other relevant channels.",
          problem: "Buying is fragmented across platforms, each optimizing for its own numbers.",
          approach:
            "We buy across Paid Social (Meta, TikTok, LinkedIn), Search (Google Ads), Display and other relevant channels.",
          result: "Coordinated buying, managed as one plan.",
        },
        {
          title: "Optimization",
          short: "Continuous allocation based on performance.",
          problem: "Campaigns are set up, then left to run.",
          approach:
            "We continuously reallocate budget based on performance — scaling what works and stopping what doesn't.",
          result: "Investment that keeps moving toward results.",
        },
        {
          title: "Measurement",
          // [reconstructed] partly hidden in the source
          short: "Connecting metrics to real business outcomes.",
          problem: "Reports are full of numbers, yet none of them answer “is it working?”",
          approach: "We connect media metrics to real business outcomes.",
          result: "Decisions based on what media does for the business.",
        },
      ],
    },
  },
  fr: {
    consulting: {
      name: "Consulting",
      tagline: "Stratégie & CMO à temps partagé",
      h1: "Conseil en stratégie marketing à Casablanca",
      headline: "Ici, on réfléchit.",
      summary:
        "Un accompagnement marketing stratégique au cœur de votre entreprise — de la stratégie marketing jusqu’au CMO à temps partagé.",
      problem: "La stratégie sans exécution reste sur le papier.",
      outcome: "Une direction claire, sur laquelle vos équipes peuvent agir.",
      capabilities: ["Stratégie marketing", "CMO à temps partagé", "Stratégie de marque", "Stratégie créative"],
      cta: "Parler à BlueDot Consulting",
      seo: {
        title: "Conseil en stratégie marketing à Casablanca | BlueDot Consulting",
        description:
          "Conseil en stratégie marketing à Casablanca : stratégie marketing et digitale, positionnement, stratégie de marque et CMO à temps partagé.",
      },
      services: [
        {
          title: "Stratégie marketing",
          short: "Objectifs, cibles, positionnement et priorités.",
          problem: "Beaucoup d’actions, mais pas de plan commun — les priorités changent à chaque nouvelle idée.",
          approach:
            "Nous définissons vos objectifs, vos cibles, votre positionnement et vos priorités, puis nous les traduisons en un plan marketing que vos équipes peuvent suivre.",
          result: "Une direction marketing que tout le monde comprend et peut appliquer.",
        },
        {
          title: "CMO à temps partagé",
          short: "Une direction marketing senior, au sein de votre entreprise.",
          problem:
            "Vous avez besoin d’un leadership marketing senior, mais recruter un directeur marketing à temps plein n’est pas encore la bonne étape.",
          approach:
            "Nous prenons la direction marketing depuis l’intérieur de votre entreprise : fixer le cap, prendre les décisions et guider vos équipes et vos partenaires.",
          result: "Un leadership senior, au niveau d’implication dont votre entreprise a besoin.",
        },
        {
          title: "Stratégie de marque",
          short: "Positionnement, proposition de valeur et plateforme de marque.",
          problem: "On ne voit pas clairement pourquoi les clients devraient vous choisir — ni en interne, ni à l’extérieur.",
          approach: "Nous définissons votre positionnement, votre proposition de valeur et votre plateforme de marque.",
          result: "Une réponse claire et partagée à la question « pourquoi nous ? »",
        },
        {
          title: "Stratégie créative",
          short: "Traduire la stratégie en direction créative.",
          problem: "La stratégie se perd quelque part entre le plan et le brief créatif.",
          approach:
            "Nous traduisons la stratégie en direction créative — insights, plateformes et briefs qui donnent à chaque idée un rôle précis.",
          result: "Un travail créatif aligné sur la stratégie avant même le début de la production.",
        },
      ],
    },
    agency: {
      name: "Agency",
      tagline: "Marque, contenu, digital & croissance",
      h1: "Agence de création et de branding à Casablanca",
      headline: "Ici, on crée.",
      summary: "La stratégie prend vie à travers le branding, le contenu, le digital et l’exécution créative.",
      problem: "La créativité sans direction crée du bruit.",
      outcome: "Une marque cohérente sur tous les points de contact.",
      capabilities: ["Branding", "Réseaux sociaux", "Contenu", "Sites web & expériences digitales", "Événementiel", "Génération de leads"],
      cta: "Parler à BlueDot Agency",
      seo: {
        title: "Branding, identité visuelle et contenu à Casablanca | BlueDot Agency",
        description:
          "Agence de création à Casablanca : branding et identité visuelle, contenus et réseaux sociaux, création de site web, événementiel et génération de leads.",
      },
      services: [
        {
          title: "Marques",
          short: "Plateformes de marque, identités visuelles et campagnes.",
          problem: "Votre marque ne reflète plus ce que vous êtes aujourd’hui — ni où vous allez.",
          approach: "Nous construisons des plateformes de marque, des identités visuelles et des campagnes ancrées dans la stratégie.",
          result: "Une marque distinctive, cohérente partout où on la rencontre.",
        },
        {
          title: "Contenu",
          short: "Réseaux sociaux, contenus éditoriaux et production.",
          problem: "Des contenus sont produits, mais ils ne construisent ni la marque ni l’engagement de votre audience.",
          approach: "Nous planifions, créons et produisons des contenus pour les réseaux sociaux, l’éditorial et les campagnes.",
          result: "Des contenus utiles, dans une voix reconnaissable.",
        },
        {
          title: "Digital",
          short: "Sites web, landing pages et expériences digitales.",
          problem: "Votre site est correct, mais il n’aide pas les gens à comprendre, à faire confiance ni à passer à l’action.",
          approach: "Nous concevons et développons des sites web, des landing pages et des expériences digitales.",
          result: "Des points de contact digitaux qui rendent l’étape suivante évidente.",
          link: { label: "En savoir plus sur la création de site web", to: "website" },
        },
        {
          title: "Expériences",
          short: "Points de contact de marque, virtuels et physiques.",
          problem: "Votre marque semble différente selon l’endroit où on la rencontre.",
          approach:
            "Nous concevons des expériences de marque, en ligne comme sur le terrain — lancements, activations et événements.",
          result: "Une expérience reconnaissable, en ligne comme hors ligne.",
          link: { label: "En savoir plus sur l’événementiel", to: "events" },
        },
        {
          title: "Croissance",
          short: "Génération de leads, supports d’acquisition et parcours de conversion.",
          problem: "On vous découvre, mais trop peu de visiteurs deviennent des prospects ou des clients.",
          approach: "Nous créons des supports de génération de leads, des campagnes d’acquisition et des parcours de conversion.",
          result: "Un chemin plus clair entre l’attention et l’action.",
        },
      ],
    },
    media: {
      name: "Media",
      tagline: "Planification, achat & performance",
      h1: "Agence de publicité digitale au Maroc",
      headline: "Ici, on amplifie.",
      summary: "Stratégie, achat et optimisation média, pensés autour de résultats business réels.",
      problem: "Les médias sans la bonne réflexion gaspillent le budget.",
      outcome: "Un investissement qui travaille plus dur.",
      capabilities: ["Stratégie média", "Publicité digitale", "Marketing de performance"],
      cta: "Parler à BlueDot Media",
      seo: {
        title: "Agence de publicité digitale au Maroc | BlueDot Media",
        description:
          "Agence de publicité digitale au Maroc : stratégie et plan média, campagnes Google Ads, Meta et TikTok Ads, optimisation et mesure orientées résultats business.",
      },
      services: [
        {
          title: "Stratégie & plan média",
          short: "Où, quand et combien investir.",
          problem: "Le budget est réparti par habitude, pas là où il travaillera le mieux.",
          approach: "Nous définissons où, quand et combien investir, en fonction de vos objectifs et de vos cibles.",
          result: "Un plan média dans lequel chaque canal a un rôle clair.",
        },
        {
          title: "Achat média",
          short: "Social Ads, Search, Display et autres canaux pertinents.",
          problem: "L’achat est éclaté entre plateformes, chacune optimisant ses propres chiffres.",
          approach:
            "Nous achetons sur les réseaux sociaux (Meta, TikTok, LinkedIn), le Search (Google Ads), le Display et les autres canaux pertinents.",
          result: "Un achat coordonné, piloté comme un seul plan.",
        },
        {
          title: "Optimisation",
          short: "Réallocation continue selon la performance.",
          problem: "Les campagnes sont lancées, puis laissées sans pilotage.",
          approach:
            "Nous réallouons le budget en continu selon la performance — on renforce ce qui marche, on arrête ce qui ne marche pas.",
          result: "Un investissement qui avance toujours vers les résultats.",
        },
        {
          title: "Mesure",
          short: "Relier les indicateurs aux vrais résultats business.",
          problem: "Les rapports débordent de chiffres, mais aucun ne répond à la question « est-ce que ça marche ? »",
          approach: "Nous relions les indicateurs médias aux résultats réels de votre entreprise.",
          result: "Des décisions fondées sur ce que les médias apportent vraiment à l’entreprise.",
        },
      ],
    },
  },
};

const order: DivisionId[] = ["consulting", "agency", "media"];

export function getDivisions(lang: Lang): Division[] {
  return order.map((id) => ({ ...base[id], ...copy[lang][id], href: href(id, lang) }));
}

export function getDivision(id: DivisionId, lang: Lang): Division {
  return getDivisions(lang).find((d) => d.id === id)!;
}
