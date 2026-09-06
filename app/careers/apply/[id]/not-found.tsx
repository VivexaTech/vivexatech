import PageShell from "../../../components/PageShell";
import PageHero from "../../../components/PageHero";
import { ButtonLink } from "../../../components/Button";

export default function ApplyNotFound() {
  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow="Careers"
          title="This opening is not accepting applications."
          description="It may be closed, expired, or no longer published. Other roles may still be open."
        />
        <section className="bg-background px-4 py-16 md:px-8 md:py-20 lg:px-10">
          <div className="mx-auto max-w-site">
            <ButtonLink href="/careers">Back to careers</ButtonLink>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
