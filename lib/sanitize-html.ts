import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "h2",
  "h3",
  "h4",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "code",
  "a",
  "img",
  "figure",
  "figcaption",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "hr",
  "br",
  "span",
];

const ALLOWED_ATTR = [
  "href",
  "src",
  "alt",
  "title",
  "class",
  "target",
  "rel",
  "colspan",
  "rowspan",
  "width",
  "height",
];

function wrapImageCaptions(html: string) {
  return html.replace(
    /<img\b([^>]*?)\s*\/?>/gi,
    (match, attrs: string) => {
      const titleMatch = attrs.match(/\btitle=(["'])(.*?)\1/i);
      const caption = titleMatch?.[2]?.trim();
      if (!caption || /<figure[\s>]/i.test(match)) return match;
      return `<figure>${match}<figcaption>${caption}</figcaption></figure>`;
    },
  );
}

export function sanitizeBlogHtml(html: string) {
  const clean = sanitizeHtml(html ?? "", {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { "*": ALLOWED_ATTR },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https", "data"] },
    allowProtocolRelative: false,
  });
  return wrapImageCaptions(clean);
}
