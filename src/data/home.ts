import { href, type Lang } from "../i18n";

export interface Situation {
  id: string;
  quote: string;
  start: string;
  accent: string;
  interest: string;
  answer: string;
  link: { label: string; href: string };
}

interface HomeData {
  situations: Situation[];
  steps: { title: string; text: string }[];
  principles: [string, string][];
  faqs: { q: string; a: string }[];
}

const en = (lang: Lang): HomeData => ({
  situations: [
    {
      id: "leadership",
      quote: "We need senior marketing leadership — but not a full-time CMO.",
      start: "Consulting",
      accent: "var(--think)",
      interest: "consulting",
      answer:
        "A fractional CMO takes the marketing lead from inside your business: setting direction, making decisions and guiding your teams and partners — at the level of involvement you need.",
      link: { label: "Explore Consulting", href: href("consulting", lang) },
    },
    {
      id: "underneath",
      quote: "We do a lot of marketing, but it isn’t moving the business.",
      start: "Consulting",
      accent: "var(--think)",
      interest: "consulting",
      answer:
        "Before adding more activity, we look at what sits underneath: positioning, offer, organization, sales and leadership. Your marketing problem might not be a marketing problem.",
      link: { label: "See what we look at", href: href("consulting", lang, "#below-the-surface") },
    },
    {
      id: "execution",
      quote: "Our strategy is clear. Now it needs to show up in our brand, content and digital.",
      start: "Agency",
      accent: "var(--create)",
      interest: "agency",
      answer:
        "We turn strategy into brand platforms, content, websites and campaigns that stay coherent, distinctive and consistent across every touchpoint.",
      link: { label: "Explore Agency", href: href("agency", lang) },
    },
    {
      id: "media",
      quote: "We spend on media, but can’t connect it to sales.",
      start: "Media",
      accent: "var(--amplify)",
      interest: "media",
      answer:
        "We plan, buy and optimize across channels, and measure against real business outcomes — not vanity metrics. Sometimes the smartest move is knowing where not to spend.",
      link: { label: "Explore Media", href: href("media", lang) },
    },
    {
      id: "connected",
      quote: "Strategy, creative and media sit with different partners who don’t talk to each other.",
      start: "All three",
      accent: "var(--blue)",
      interest: "all",
      answer:
        "BlueDot brings strategy, creative and media under one roof, so what you think, make and spend is connected from the first brief.",
      link: { label: "See how we work", href: "#how" },
    },
  ],
  steps: [
    {
      title: "We step in.",
      text: "We work close to your business, your teams and your reality — not from a distance.",
    },
    {
      title: "We connect the dots.",
      text: "Strategy, creative and media are never treated in isolation. Every decision is made with the others in mind.",
    },
    {
      title: "We make it happen.",
      text: "Clear thinking is only valuable when it turns into action. So we stay on through execution.",
    },
  ],
  principles: [
    ["Business impact", "over vanity metrics."],
    ["Strategy", "before output."],
    ["The right talent", "for the right challenge."],
    ["Knowing where", "not to spend."],
  ],
  faqs: [
    {
      q: "Do we need to work with all three divisions?",
      a: "No. You can start with Consulting, Agency or Media on its own. Because the three are connected, it’s easy to bring in the others when the work calls for it.",
    },
    {
      q: "What is a fractional CMO?",
      a: "A senior marketing leader who works inside your business on a part-time basis. You get strategic direction and marketing leadership without hiring a full-time Chief Marketing Officer.",
    },
    {
      q: "Can you work alongside our in-house team?",
      a: "Yes. We work close to your business, your teams and your reality — adding the thinking, creative or media expertise that’s missing, rather than replacing what already works.",
    },
    {
      q: "Which media channels do you work with?",
      a: "We plan and buy across Paid Social (Meta, TikTok, LinkedIn), Search (Google Ads), Display and other channels that are relevant to your audience and objectives.",
    },
    {
      q: "Where are you based?",
      a: "BlueDot is based in Casablanca, Morocco. Our office is on Rue de Larache, and we work with businesses in Casablanca and across Morocco.",
    },
    {
      q: "How do you measure success?",
      a: "Against business outcomes, not vanity metrics. Great media metrics can hide bad business, so we connect what marketing does to what the business needs.",
    },
    {
      q: "What happens after we get in touch?",
      a: "We get back to you to set up a first conversation. We use it to understand your business and your challenge before recommending anything.",
    },
  ],
});

const fr = (lang: Lang): HomeData => ({
  situations: [
    {
      id: "leadership",
      quote: "Nous avons besoin d’une direction marketing senior — mais pas d’un CMO à temps plein.",
      start: "Consulting",
      accent: "var(--think)",
      interest: "consulting",
      answer:
        "Un CMO à temps partagé prend la direction marketing depuis l’intérieur de votre entreprise : il fixe le cap, prend les décisions et guide vos équipes et vos partenaires — au niveau d’implication dont vous avez besoin.",
      link: { label: "Découvrir Consulting", href: href("consulting", lang) },
    },
    {
      id: "underneath",
      quote: "Nous faisons beaucoup de marketing, mais cela ne fait pas avancer l’entreprise.",
      start: "Consulting",
      accent: "var(--think)",
      interest: "consulting",
      answer:
        "Avant d’ajouter des actions, nous regardons ce qu’il y a en dessous : positionnement, offre, organisation, ventes et leadership. Votre problème marketing n’est peut-être pas un problème marketing.",
      link: { label: "Voir ce que nous analysons", href: href("consulting", lang, "#below-the-surface") },
    },
    {
      id: "execution",
      quote: "Notre stratégie est claire. Elle doit maintenant se voir dans notre marque, nos contenus et notre digital.",
      start: "Agency",
      accent: "var(--create)",
      interest: "agency",
      answer:
        "Nous traduisons la stratégie en plateformes de marque, contenus, sites web et campagnes qui restent cohérents, distinctifs et constants sur chaque point de contact.",
      link: { label: "Découvrir Agency", href: href("agency", lang) },
    },
    {
      id: "media",
      quote: "Nous investissons en médias, mais sans pouvoir relier cela aux ventes.",
      start: "Media",
      accent: "var(--amplify)",
      interest: "media",
      answer:
        "Nous planifions, achetons et optimisons sur tous les canaux, et nous mesurons par rapport à des résultats business réels — pas des indicateurs de vanité. Parfois, la décision la plus intelligente est de savoir où ne pas dépenser.",
      link: { label: "Découvrir Media", href: href("media", lang) },
    },
    {
      id: "connected",
      quote: "Stratégie, création et médias sont confiés à des partenaires différents qui ne se parlent pas.",
      start: "Les trois",
      accent: "var(--blue)",
      interest: "all",
      answer:
        "BlueDot réunit stratégie, création et médias sous un même toit : ce que vous pensez, créez et investissez est relié dès le premier brief.",
      link: { label: "Voir notre méthode", href: "#how" },
    },
  ],
  steps: [
    {
      title: "Nous nous impliquons.",
      text: "Nous travaillons au plus près de votre entreprise, de vos équipes et de votre réalité — pas à distance.",
    },
    {
      title: "Nous connectons les points.",
      text: "Stratégie, création et médias ne sont jamais traités isolément. Chaque décision est prise en tenant compte des autres.",
    },
    {
      title: "Nous passons à l’action.",
      text: "Une réflexion claire n’a de valeur que si elle se traduit en actions. C’est pourquoi nous restons impliqués jusqu’à l’exécution.",
    },
  ],
  principles: [
    ["L’impact business", "plutôt que les indicateurs de vanité."],
    ["La stratégie", "avant la production."],
    ["Les bons talents", "pour le bon défi."],
    ["Savoir où", "ne pas dépenser."],
  ],
  faqs: [
    {
      q: "Faut-il travailler avec les trois pôles ?",
      a: "Non. Vous pouvez commencer avec Consulting, Agency ou Media seul. Comme les trois sont reliés, il est facile d’intégrer les autres quand le projet le demande.",
    },
    {
      q: "Qu’est-ce qu’un CMO à temps partagé ?",
      a: "Un directeur marketing senior qui travaille au sein de votre entreprise à temps partiel. Vous bénéficiez d’une direction stratégique et d’un leadership marketing sans recruter un Chief Marketing Officer à temps plein.",
    },
    {
      q: "Pouvez-vous travailler avec notre équipe interne ?",
      a: "Oui. Nous travaillons au plus près de votre entreprise, de vos équipes et de votre réalité — en apportant la réflexion, la création ou l’expertise média qui manque, plutôt qu’en remplaçant ce qui fonctionne déjà.",
    },
    {
      q: "Sur quels canaux médias travaillez-vous ?",
      a: "Nous planifions et achetons sur les réseaux sociaux (Meta, TikTok, LinkedIn), le Search (Google Ads), le Display et les autres canaux pertinents pour votre audience et vos objectifs.",
    },
    {
      q: "Où êtes-vous basés ?",
      a: "BlueDot est une agence basée à Casablanca, au Maroc. Nos bureaux se trouvent rue de Larache, et nous accompagnons des entreprises à Casablanca et partout au Maroc.",
    },
    {
      q: "Comment mesurez-vous le succès ?",
      a: "Par rapport aux résultats business, pas aux indicateurs de vanité. De bons chiffres médias peuvent cacher une mauvaise performance commerciale : nous relions ce que fait le marketing à ce dont l’entreprise a besoin.",
    },
    {
      q: "Que se passe-t-il après notre prise de contact ?",
      a: "Nous revenons vers vous pour organiser un premier échange. Il nous permet de comprendre votre entreprise et votre enjeu avant de recommander quoi que ce soit.",
    },
  ],
});

export function getHomeData(lang: Lang): HomeData {
  return lang === "fr" ? fr(lang) : en(lang);
}
