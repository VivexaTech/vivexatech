import { CONTACT } from "@/lib/site";

export default function ContactDetails({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <address className="not-italic">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
        Gurugram office
      </p>
      <div className={compact ? "mt-3 space-y-1.5" : "mt-4 space-y-2"}>
        <p>
          <a
            href={CONTACT.phoneHref}
            className="font-semibold text-ink underline-offset-4 hover:underline"
          >
            {CONTACT.phoneDisplay}
          </a>
        </p>
        <p>
          <a
            href={CONTACT.emailHref}
            className="text-ink underline-offset-4 hover:underline"
          >
            {CONTACT.email}
          </a>
        </p>
        <p className="leading-relaxed text-muted">
          {CONTACT.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p>
          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-ink underline-offset-4 hover:underline"
          >
            {CONTACT.mapsLabel}
          </a>
        </p>
      </div>
    </address>
  );
}
