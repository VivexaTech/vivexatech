import DOMPurify from "isomorphic-dompurify";

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
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input"],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "style"],
  });
  return wrapImageCaptions(clean);
}
