import PageShell from "../../../components/PageShell";
import PageHero from "../../../components/PageHero";

export default function ApplyLoading() {
  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow="Apply"
          title="Preparing the application form."
          description="Loading the selected opportunity."
        />
        <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto h-80 max-w-site animate-pulse rounded-3xl bg-ink/8" />
        </section>
      </main>
    </PageShell>
  );
}