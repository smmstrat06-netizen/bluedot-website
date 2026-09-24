/**
 * Dedicated pages for two BlueDot Agency services: website design and events.
 * Built from the Agency copy ("Digital" and "Experiences"). Lines marked
 * [confirm] describe scope that BlueDot should check before launch.
 */
import type { Lang } from "../i18n";
import type { Service } from "./divisions";

export type ExtraId = "website" | "events";

export interface ExtraPage {
  id: ExtraId;
  h1: string;
  display: string;
  lead: string;
  caps: string[];
  positioning: { title: string; text: string; fit: string[] };
  services: { title: string; lead: string; items: Service[] };
  how: { title: string; steps: { title: string; text: string }[] };
  faqs: { q: string; a: string }[];
  cross: { title: string; text: string };
  cta: { title: string; text: string; label: string };
  seo: { title: string; description: string };
}

const servicesLead = {
  en: "Open a service to see the problem it solves, what we do and what you get.",
  fr: "Ouvrez un service pour voir le problème qu’il résout, ce que nous faisons et ce que vous obtenez.",
};

const pages: Record<Lang, Record<ExtraId, ExtraPage>> = {
  en: {
    website: {
      id: "website",
      h1: "Website design in Casablanca",
      display: "Websites that make the next step obvious.",
      lead: "BlueDot Agency designs and builds websites, landing pages and digital experiences that help people understand, trust and act.",
      caps: ["Corporate & business websites", "Landing pages", "Website redesign", "Digital experiences"],
      positioning: {
        title: "A good-looking website isn’t enough.",
        text: "Your website is often the first place people meet you. We design it from your strategy and brand, so it explains clearly what you do and guides every visitor to the next step.",
        fit: [
          "Your website no longer reflects your brand or your offer.",
          "People visit, but too few get in touch.",
          "You’re launching an offer or campaign that needs its own page.",
        ],
      },
      services: {
        title: "What we build.",
        lead: servicesLead.en,
        items: [
          {
            title: "Corporate & business websites",
            short: "Presenting your business and offer clearly.",
            problem: "Your website doesn’t say clearly who you are, what you offer or why to choose you.",
            approach:
              "We structure your messages, design the pages and build a fast, mobile-friendly website set up for search engines.",
            result: "A website that presents your business as it is today.",
          },
          {
            title: "Landing pages",
            short: "Dedicated pages for an offer or a campaign.",
            problem: "Your campaigns send traffic to a page that wasn’t made for them.",
            approach: "We design landing pages focused on a single goal, aligned with your ads and conversion journeys.",
            result: "A clearer path from click to enquiry.",
          },
          {
            title: "Website redesign",
            short: "Bringing your website up to the level of your brand.",
            problem: "Your website has aged: it’s slow, hard to update or out of step with your brand.",
            approach:
              "We start from what works, rethink the structure, content and design, and plan the move so your search visibility is protected.",
            result: "An up-to-date website, consistent with your brand, without starting from scratch.",
          },
          {
            title: "Digital experiences",
            short: "Digital journeys and formats that serve the brand.",
            problem: "Your brand feels different depending on the screen people meet it on.",
            approach: "We design digital experiences — journeys, interactive formats and campaign microsites — rooted in your strategy.",
            result: "Digital touchpoints that make the next step obvious.",
          },
        ],
      },
      how: {
        title: "From brief to launch, with the strategy in view.",
        steps: [
          { title: "Understand.", text: "Your objectives, audiences, offer — and what your website needs to achieve." },
          { title: "Design.", text: "Structure, messages and design, built from your brand." },
          { title: "Build and launch.", text: "A fast, mobile-friendly website, ready for search — then connected to your campaigns." },
        ],
      },
      faqs: [
        {
          q: "Do you also create the website content?",
          a: "Yes. BlueDot Agency can handle the copy, visuals and content in line with your brand. We can also work from content you already have.",
        },
        {
          q: "Can the website be connected to our ad campaigns?",
          a: "Yes. Because BlueDot Media plans and buys media, your website and landing pages can be designed hand in hand with your Google Ads, Meta or TikTok campaigns.",
        },
        {
          q: "Can you redesign an existing website?",
          a: "Yes. We start from what already works, then rethink the structure, content and design while protecting your search visibility.",
        },
        {
          q: "Where are you based?",
          a: "BlueDot is based in Casablanca, Morocco, and works with businesses in Casablanca and across Morocco.",
        },
      ],
      cross: {
        title: "A website connected to your strategy and media.",
        text: "BlueDot Consulting sharpens your positioning and messages. BlueDot Media brings the right people to your website.",
      },
      cta: {
        title: "A website to build or redesign?",
        text: "Tell us where you are and what your website needs to achieve.",
        label: "Talk about your website",
      },
      seo: {
        title: "Website Design in Casablanca | BlueDot Agency",
        description:
          "Website design in Casablanca: corporate websites, landing pages, website redesigns and digital experiences, built from your strategy and brand.",
      },
    },
    events: {
      id: "events",
      h1: "Event agency in Casablanca",
      display: "Moments that bring your brand to life.",
      lead: "BlueDot Agency designs brand experiences across physical and virtual touchpoints — events, launches and activations rooted in your strategy.",
      caps: ["Corporate events", "Launches", "Brand activations", "Virtual experiences"],
      positioning: {
        title: "An event should work for the brand.",
        text: "A successful event isn’t only about the day itself. We start from your objectives and your brand to design a coherent experience — before, during and after the event.",
        fit: [
          "You’re launching a product, an offer or a new brand.",
          "You’re bringing together clients, partners or teams.",
          "Your brand needs to come to life on the ground as well as online.",
        ],
      },
      services: {
        title: "What we bring to life.",
        lead: servicesLead.en,
        items: [
          {
            title: "Corporate events",
            // [confirm] event formats
            short: "Conventions, seminars and client events.",
            problem: "Your events come and go without saying much about your brand.",
            approach: "We design the concept, message and experience of your events, consistent with your brand.",
            result: "Events that feel like your brand.",
          },
          {
            title: "Launches",
            short: "Introducing a product, an offer or a brand.",
            problem: "A launch comes down to a few moments — and everything needs to line up.",
            approach: "We connect the event, the content and the campaign around one idea.",
            result: "A coherent launch, from the first teaser to the follow-up.",
          },
          {
            title: "Brand activations",
            short: "Bringing the brand face to face with people.",
            problem: "Your brand is visible, but people don’t get to experience it.",
            approach: "We create on-the-ground activations that turn your brand into an experience.",
            result: "A brand people remember because they experienced it.",
          },
          {
            title: "Virtual experiences",
            short: "Online events and hybrid formats.",
            problem: "Part of your audience can’t be there in person.",
            approach: "We design online and hybrid experiences with the same care as the physical event.",
            result: "One recognizable experience, online and off.",
          },
        ],
      },
      how: {
        title: "Every event starts with what it needs to achieve.",
        steps: [
          { title: "Frame.", text: "Your objectives, your audience and what the event needs to achieve for the brand." },
          { title: "Design.", text: "The concept, the message and the experience — rooted in your strategy." },
          { title: "Bring it to life.", text: "Execution, content and amplification — before, during and after the event." },
        ],
      },
      faqs: [
        {
          q: "Do you organize corporate events?",
          a: "Yes. BlueDot Agency designs corporate events, launches and brand activations, connected to your strategy and your content.",
        },
        {
          q: "Can you promote the event online?",
          a: "Yes. BlueDot Agency creates the content and BlueDot Media promotes the event on the right channels — before, during and after.",
        },
        {
          q: "Do you offer virtual or hybrid events?",
          a: "Yes. We design online and hybrid experiences for the people who can’t be there in person.",
        },
        {
          q: "Where are you based?",
          a: "BlueDot is based in Casablanca, Morocco, and works with businesses in Casablanca and across Morocco.",
        },
      ],
      cross: {
        title: "An event connected to strategy and media.",
        text: "BlueDot Consulting clarifies what the event needs to achieve. BlueDot Media makes sure the right people hear about it.",
      },
      cta: {
        title: "Have an event coming up?",
        text: "Tell us what you’re planning and what the event needs to achieve.",
        label: "Talk about your event",
      },
      seo: {
        title: "Event Agency in Casablanca | BlueDot Agency",
        description:
          "Event agency in Casablanca: corporate events, product launches, brand activations and virtual experiences, designed from your brand strategy.",
      },
    },
  },
  fr: {
    website: {
      id: "website",
      h1: "Création de site web à Casablanca",
      display: "Des sites qui font passer à l’action.",
      lead: "BlueDot Agency conçoit et développe des sites web, des landing pages et des expériences digitales qui aident vos visiteurs à comprendre, à faire confiance et à agir.",
      caps: ["Sites vitrines & corporate", "Landing pages", "Refonte de site web", "Expériences digitales"],
      positioning: {
        title: "Un beau site ne suffit pas.",
        text: "Votre site est souvent le premier endroit où l’on vous rencontre. Nous le concevons à partir de votre stratégie et de votre marque, pour qu’il explique clairement ce que vous faites et guide chaque visiteur vers l’étape suivante.",
        fit: [
          "Votre site ne reflète plus votre marque ni votre offre.",
          "Vous avez des visites, mais trop peu de demandes.",
          "Vous lancez une offre ou une campagne qui a besoin de sa propre page.",
        ],
      },
      services: {
        title: "Ce que nous concevons.",
        lead: servicesLead.fr,
        items: [
          {
            title: "Site vitrine & corporate",
            short: "Présenter clairement votre entreprise et votre offre.",
            problem: "Votre site ne dit pas clairement qui vous êtes, ce que vous proposez ni pourquoi vous choisir.",
            approach:
              "Nous structurons vos messages, concevons les pages et développons un site rapide, adapté au mobile et pensé pour le référencement naturel (SEO).",
            result: "Un site qui présente votre entreprise telle qu’elle est aujourd’hui.",
          },
          {
            title: "Landing pages",
            short: "Des pages dédiées à une offre ou à une campagne.",
            problem: "Vos campagnes envoient du trafic vers une page qui n’a pas été pensée pour elles.",
            approach: "Nous concevons des landing pages centrées sur un seul objectif, alignées avec vos annonces et vos parcours de conversion.",
            result: "Un chemin plus clair entre le clic et la demande de contact.",
          },
          {
            title: "Refonte de site web",
            short: "Remettre votre site au niveau de votre marque.",
            problem: "Votre site a vieilli : il est lent, difficile à mettre à jour ou décalé par rapport à votre marque.",
            approach:
              "Nous partons de ce qui fonctionne, revoyons la structure, le contenu et le design, et préparons la migration pour préserver votre référencement.",
            result: "Un site à jour, cohérent avec votre marque, sans repartir de zéro.",
          },
          {
            title: "Expériences digitales",
            short: "Des parcours et des formats digitaux au service de la marque.",
            problem: "Votre marque semble différente selon l’écran sur lequel on la rencontre.",
            approach:
              "Nous concevons des expériences digitales — parcours, formats interactifs et mini-sites de campagne — ancrées dans votre stratégie.",
            result: "Des points de contact digitaux qui rendent l’étape suivante évidente.",
          },
        ],
      },
      how: {
        title: "Du brief au lancement, sans perdre la stratégie de vue.",
        steps: [
          { title: "Comprendre.", text: "Vos objectifs, vos cibles, votre offre — et ce que votre site doit accomplir." },
          { title: "Concevoir.", text: "La structure, les messages et le design, construits à partir de votre marque." },
          {
            title: "Développer et lancer.",
            text: "Un site rapide, adapté au mobile et prêt pour le référencement — puis relié à vos campagnes.",
          },
        ],
      },
      faqs: [
        {
          q: "Réalisez-vous aussi les contenus du site ?",
          a: "Oui. BlueDot Agency peut prendre en charge les textes, les visuels et les contenus, en cohérence avec votre marque. Nous pouvons aussi partir de vos contenus existants.",
        },
        {
          q: "Le site peut-il être relié à nos campagnes publicitaires ?",
          a: "Oui. Comme BlueDot Media planifie et achète les médias, votre site et vos landing pages peuvent être conçus en lien direct avec vos campagnes Google Ads, Meta ou TikTok.",
        },
        {
          q: "Pouvez-vous refondre un site existant ?",
          a: "Oui. Nous partons de ce qui fonctionne déjà, puis nous revoyons la structure, le contenu et le design en préservant votre référencement.",
        },
        {
          q: "Où êtes-vous basés ?",
          a: "BlueDot est basée à Casablanca, au Maroc, et accompagne des entreprises à Casablanca et partout au Maroc.",
        },
      ],
      cross: {
        title: "Un site relié à votre stratégie et à vos médias.",
        text: "BlueDot Consulting clarifie votre positionnement et vos messages. BlueDot Media amène les bonnes personnes sur votre site.",
      },
      cta: {
        title: "Un site à créer ou à refondre ?",
        text: "Dites-nous où vous en êtes et ce que votre site doit accomplir.",
        label: "Parler de votre site",
      },
      seo: {
        title: "Création de site web à Casablanca | BlueDot Agency",
        description:
          "Création de site web à Casablanca : sites vitrines et corporate, landing pages, refonte de site et expériences digitales, pensés à partir de votre marque.",
      },
    },
    events: {
      id: "events",
      h1: "Agence événementielle à Casablanca",
      display: "Des moments qui font vivre votre marque.",
      lead: "BlueDot Agency conçoit des expériences de marque, sur le terrain comme en ligne — événements, lancements et activations ancrés dans votre stratégie.",
      caps: ["Événements d’entreprise", "Lancements", "Activations de marque", "Expériences virtuelles"],
      positioning: {
        title: "Un événement doit servir la marque.",
        text: "Un événement réussi ne se limite pas au jour J. Nous partons de vos objectifs et de votre marque pour concevoir une expérience cohérente — avant, pendant et après l’événement.",
        fit: [
          "Vous lancez un produit, une offre ou une nouvelle marque.",
          "Vous réunissez vos clients, vos partenaires ou vos équipes.",
          "Votre marque doit se vivre sur le terrain comme en ligne.",
        ],
      },
      services: {
        title: "Ce que nous faisons vivre.",
        lead: servicesLead.fr,
        items: [
          {
            title: "Événements d’entreprise",
            // [confirm] formats d’événements
            short: "Conventions, séminaires et événements clients.",
            problem: "Vos événements se succèdent sans dire grand-chose de votre marque.",
            approach: "Nous concevons le concept, le message et l’expérience de vos événements, en cohérence avec votre marque.",
            result: "Des événements qui ressemblent à votre marque.",
          },
          {
            title: "Lancements",
            short: "Présenter un produit, une offre ou une marque.",
            problem: "Un lancement se joue en quelques moments — et tout doit être aligné.",
            approach: "Nous relions l’événement, les contenus et la campagne autour d’une même idée.",
            result: "Un lancement cohérent, du premier teaser jusqu’à l’après-événement.",
          },
          {
            title: "Activations de marque",
            short: "Faire vivre la marque au contact du public.",
            problem: "Votre marque est visible, mais on ne la vit pas.",
            approach: "Nous imaginons des activations sur le terrain qui traduisent votre marque en expérience.",
            result: "Une marque dont on se souvient parce qu’on l’a vécue.",
          },
          {
            title: "Expériences virtuelles",
            short: "Événements en ligne et formats hybrides.",
            problem: "Une partie de votre public ne peut pas être présente.",
            approach: "Nous concevons des expériences en ligne et hybrides, avec la même exigence que l’événement physique.",
            result: "Une expérience reconnaissable, en ligne comme hors ligne.",
          },
        ],
      },
      how: {
        title: "Chaque événement commence par ce qu’il doit accomplir.",
        steps: [
          { title: "Cadrer.", text: "Vos objectifs, votre public et ce que l’événement doit accomplir pour la marque." },
          { title: "Concevoir.", text: "Le concept, le message et l’expérience — ancrés dans votre stratégie." },
          { title: "Faire vivre.", text: "L’exécution, les contenus et la diffusion — avant, pendant et après l’événement." },
        ],
      },
      faqs: [
        {
          q: "Organisez-vous des événements d’entreprise ?",
          a: "Oui. BlueDot Agency conçoit des événements d’entreprise, des lancements et des activations de marque, en lien avec votre stratégie et vos contenus.",
        },
        {
          q: "Pouvez-vous faire connaître l’événement en ligne ?",
          a: "Oui. BlueDot Agency crée les contenus et BlueDot Media diffuse l’événement sur les bons canaux — avant, pendant et après.",
        },
        {
          q: "Proposez-vous des événements virtuels ou hybrides ?",
          a: "Oui. Nous concevons des expériences en ligne et hybrides pour les personnes qui ne peuvent pas être présentes.",
        },
        {
          q: "Où êtes-vous basés ?",
          a: "BlueDot est basée à Casablanca, au Maroc, et accompagne des entreprises à Casablanca et partout au Maroc.",
        },
      ],
      cross: {
        title: "Un événement relié à la stratégie et aux médias.",
        text: "BlueDot Consulting clarifie ce que l’événement doit accomplir. BlueDot Media le fait connaître aux bonnes personnes.",
      },
      cta: {
        title: "Un événement à préparer ?",
        text: "Dites-nous ce que vous préparez et ce que l’événement doit accomplir.",
        label: "Parler de votre événement",
      },
      seo: {
        title: "Agence événementielle à Casablanca | BlueDot Agency",
        description:
          "Agence événementielle à Casablanca : événements d’entreprise, lancements, activations de marque et expériences virtuelles, au service de votre marque.",
      },
    },
  },
};

export function getExtraPage(id: ExtraId, lang: Lang): ExtraPage {
  return pages[lang][id];
}
