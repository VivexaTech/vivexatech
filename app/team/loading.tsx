import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";

function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-ink/8 ${className}`}
      aria-hidden="true"
    />
  );
}

export default function TeamLoading() {
  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow="Our team"
          title="The people behind the work."
          description="Loading studio profiles."
        />
        <section className="bg-background px-4 py-16 md:px-8 md:py-20 lg:px-10">
          <div className="mx-auto max-w-site space-y-12">
            <Skeleton className="h-[28rem] rounded-[2rem]" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Skeleton className="h-[32rem] rounded-[1.6rem]" />
              <Skeleton className="h-[32rem] rounded-[1.6rem]" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[1.5rem] border border-ink/8 bg-white"
                >
                  <Skeleton className="aspect-[3/4] rounded-none" />
                  <div className="space-y-3 p-6">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
