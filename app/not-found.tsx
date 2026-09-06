import PageShell from "./components/PageShell";
import PageHero from "./components/PageHero";
import { ButtonLink } from "./components/Button";

export default function NotFound() {
  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow="404"
          title="This page is not here."
          description="The link may be outdated, or the page has moved. The rest of the site is still available."
        />
        <section className="bg-background px-4 py-16 md:px-8 md:py-20 lg:px-10">
          <div className="mx-auto flex max-w-site flex-wrap gap-3">
            <ButtonLink href="/">Back home</ButtonLink>
            <ButtonLink href="/work" variant="outline">
              View work
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact
            </ButtonLink>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
