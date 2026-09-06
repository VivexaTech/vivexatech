export const blogPosts = [
  {
    slug: "launch-a-startup-website-in-two-weeks",
    title: "How we launch a startup website in one to two weeks",
    excerpt:
      "A realistic timeline for a landing page or portfolio site — from brief to a live, searchable page.",
    date: "August 2026",
    category: "Process",
  },
  {
    slug: "seo-from-the-first-build",
    title: "SEO should start in the first build, not the third redesign",
    excerpt:
      "Why metadata, structure, and speed belong in development — especially when paid traffic is not the plan.",
    date: "July 2026",
    category: "SEO",
  },
  {
    slug: "what-web-security-means-for-a-new-site",
    title: "What web security actually means for a new business site",
    excerpt:
      "A plain-language look at protecting assets, visitors, and the confidence your brand needs to earn.",
    date: "June 2026",
    category: "Security",
  },
];

export const blogBodies: Record<string, string[]> = {
  "launch-a-startup-website-in-two-weeks": [
    "Most of the sites we ship for new businesses are not platforms. They are a clear story, a trustworthy visual system, and a path to contact. That is why a standard landing page or portfolio can move from design to launch in about one to two weeks.",
    "The work is sequenced on purpose: positioning and sitemap first, then visual direction, then a build that is already structured for SEO. Extra time only appears when custom functionality, deeper security, or a larger content set is required.",
    "If you are still shaping the offer, we would rather tighten the story before we decorate the page. A fast launch is only useful if the page is saying the right thing.",
  ],
  "seo-from-the-first-build": [
    "Startups often treat SEO as a later project. By then the site is slow, the headings are vague, and Google is indexing a structure nobody planned.",
    "We implement the fundamentals during development: keyword research, titles, descriptions, and crawler-friendly markup. Speed is part of that work — a beautiful page that takes too long to open will not rank, and will not convert.",
    "You do not need a content factory on week one. You need a site that can be found, understood, and trusted when someone finally searches for what you do.",
  ],
  "what-web-security-means-for-a-new-site": [
    "Security for a young company is not a SOC 2 binder. It is making sure the website you just launched does not leak trust the moment someone inspects it, copies it, or tries to misuse it.",
    "We apply practical protections during the build: safer defaults, attention to assets, and patterns that reduce casual source inspection. Visitors should feel they are on a real business property.",
    "If your product later needs a heavier security posture, the marketing site should already be a clean, professional foundation rather than another risk.",
  ],
};
