/**
 * BlueDot's three divisions. Copy is based on BlueDot's existing website;
 * lines marked [reconstructed] were partly hidden in the source screenshots
 * and should be confirmed by BlueDot.
 */

export type DivisionId = "consulting" | "agency" | "media";

export interface Service {
  title: string;
  short: string;
  problem: string;
  approach: string;
  result: string;
}

export interface Division {
  id: DivisionId;
  index: string;
  name: string;
  verb: string;
  /** Short descriptor for compact navigation */
  tagline: string;
  accent: string;
  href: string;
  scene: "think" | "create" | "amplify";
  headline: string;
  summary: string;
  problem: string;
  outcome: string;
  capabilities: string[];
  cta: string;
  seo: { title: string; description: string };
  services: Service[];
}

export const divisions: Division[] = [
  {
    id: "consulting",
    index: "01",
    name: "Consulting",
    verb: "Think",
    tagline: "Strategy & fractional CMO leadership",
    accent: "var(--think)",
    href: "/consulting/",
    scene: "think",
    headline: "This is where we think.",
    // [reconstructed] "from marketing strategy to" was hidden in the source
    summary:
      "Strategic marketing support from inside your business — from marketing strategy to fractional CMO leadership.",
    problem: "Strategy without execution stays on paper.",
    outcome: "A clear direction your teams can act on.",
    capabilities: ["Marketing strategy", "Fractional CMO", "Brand strategy", "Creative strategy"],
    cta: "Talk to BlueDot Consulting",
    seo: {
      title: "Marketing Consulting & Fractional CMO",
      description:
        "BlueDot Consulting provides strategic marketing support from inside your business — marketing strategy, brand and creative strategy, and fractional CMO leadership.",
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
  {
    id: "agency",
    index: "02",
    name: "Agency",
    verb: "Create",
    tagline: "Brand, content, digital & growth",
    accent: "var(--create)",
    href: "/agency/",
    scene: "create",
    headline: "This is where we create.",
    summary: "Strategy brought to life through branding, content, digital and creative execution.",
    problem: "Creativity without direction creates noise.",
    outcome: "One consistent brand across every touchpoint.",
    capabilities: ["Branding", "Social media", "Content", "Digital experiences", "Lead generation"],
    cta: "Talk to BlueDot Agency",
    seo: {
      title: "Creative Agency — Brand, Content & Digital",
      description:
        "BlueDot Agency turns strategy into brands, content, websites, experiences and growth assets that are coherent, distinctive and effective.",
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
      },
      {
        title: "Experiences",
        // [reconstructed] partly hidden in the source
        short: "Virtual and physical brand touchpoints.",
        problem: "Your brand feels different depending on where people meet it.",
        approach: "We design brand experiences across virtual and physical touchpoints.",
        result: "One recognizable experience, online and off.",
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
  {
    id: "media",
    index: "03",
    name: "Media",
    verb: "Amplify",
    tagline: "Planning, buying & performance",
    accent: "var(--amplify)",
    href: "/media/",
    scene: "amplify",
    headline: "This is where we amplify.",
    summary: "Media strategy, buying and optimization designed around real business outcomes.",
    problem: "Media without the right thinking wastes budget.",
    outcome: "Investment that works harder.",
    capabilities: ["Media strategy", "Paid media", "Performance marketing"],
    cta: "Talk to BlueDot Media",
    seo: {
      title: "Media Strategy, Buying & Performance",
      description:
        "BlueDot Media plans, buys, optimizes and measures media across Paid Social, Search, Display and other channels — built around business impact, not vanity metrics.",
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
        approach: "We buy across Paid Social, Search, Display and other relevant channels.",
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
];

export const getDivision = (id: DivisionId) => divisions.find((d) => d.id === id)!;
