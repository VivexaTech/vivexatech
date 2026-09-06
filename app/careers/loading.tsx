import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";

function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-3xl bg-ink/8 ${className}`}
      aria-hidden="true"
    />
  );
}

export default function CareersLoading() {
  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow="Careers"
          title="Come make websites that feel expensive."
          description="Loading open roles."
        />
        <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto grid max-w-site gap-5 md:grid-cols-2">
            <Skeleton className="h-72" />
            <Skeleton className="h-72" />
          </div>
        </section>
      </main>
    </PageShell>
  );
}
