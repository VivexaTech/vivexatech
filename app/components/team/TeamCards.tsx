import EmployeePhoto from "../EmployeePhoto";
import { LinkedInLink } from "../LinkedInLink";
import Reveal from "../Reveal";
import {
  displayName,
  formatTeamDate,
  type PublicEmployee,
} from "../../../lib/employees";

const COMPANY_LINKEDIN = "https://www.linkedin.com/company/vivexa-tech";

function employeeLinkedIn(employee: PublicEmployee, name: string) {
  const href = employee.linkedin || COMPANY_LINKEDIN;
  return {
    href,
    label:
      href === COMPANY_LINKEDIN
        ? `${name} — Vivexa Tech on LinkedIn`
        : `${name} on LinkedIn`,
  };
}

function IdPill({
  id,
  tone = "light",
}: {
  id: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 font-mono text-xs font-medium tracking-wide ${
        tone === "dark"
          ? "bg-white/10 text-white/70"
          : "bg-background text-muted"
      }`}
    >
      ID {id}
    </span>
  );
}

function PhotoFrame({
  employee,
  aspect,
  priority = false,
  className = "",
}: {
  employee: PublicEmployee;
  aspect: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#dfe6ea] ${aspect} ${className}`}
    >
      <EmployeePhoto
        src={employee.profilePhoto}
        name={displayName(employee.name)}
        priority={priority}
        className="h-full w-full motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
      />
    </div>
  );
}

export function FounderFeature({ employee }: { employee: PublicEmployee }) {
  const name = displayName(employee.name);

  return (
    <Reveal className="group relative overflow-hidden rounded-[1.75rem] bg-navy-deep text-white md:rounded-[2.25rem]">
      <div
        className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-accent/15 blur-[90px]"
        aria-hidden="true"
      />
      <div className="relative grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-14 lg:p-12">
        <PhotoFrame
          employee={employee}
          aspect="aspect-[3/4]"
          priority
          className="rounded-[1.35rem] shadow-[0_30px_60px_-28px_rgba(0,0,0,0.55)]"
        />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            Founder & CEO
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-5xl md:text-[3.4rem]">
            {name}
          </h2>
          <p className="mt-3 text-lg text-white/70">
            {employee.designation || "Founder & CEO"}
          </p>
          <p className="mt-3 text-lg text-white/70">
          Vivek Singh is the founder of Vivexa Tech, established to help local businesses grow through end-to-end digital solutions. He is passionate about creating modern digital experiences while also empowering students through internships and future-ready skills.
          </p>
          <div className="mt-6">
            <IdPill id={employee.employeeId} tone="dark" />
          </div>
          <div className="mt-8">
            <LinkedInLink
              {...employeeLinkedIn(employee, name)}
              tone="dark"
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function LeadershipCard({
  employee,
  index,
}: {
  employee: PublicEmployee;
  index: number;
}) {
  const name = displayName(employee.name);

  return (
    <Reveal delay={Math.min(index, 4) * 0.06}>
      <article className="group overflow-hidden rounded-[1.6rem] border border-ink/8 bg-white shadow-[0_18px_40px_-28px_rgba(10,22,40,0.35)] transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_28px_50px_-24px_rgba(10,22,40,0.4)]">
        <PhotoFrame
          employee={employee}
          aspect="aspect-[4/5]"
          className="rounded-none"
        />
        <div className="p-6 md:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-strong">
            Department Head
          </p>
          <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-ink">
            {name}
          </h3>
          <p className="mt-1 text-muted">{employee.designation}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <IdPill id={employee.employeeId} />
            <LinkedInLink {...employeeLinkedIn(employee, name)} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function ExecutiveCard({
  employee,
  index,
}: {
  employee: PublicEmployee;
  index: number;
}) {
  const name = displayName(employee.name);

  return (
    <Reveal delay={Math.min(index, 6) * 0.05}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/8 bg-white transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_22px_40px_-24px_rgba(10,22,40,0.28)]">
        <PhotoFrame employee={employee} aspect="aspect-[3/4]" />
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3 className="font-heading text-xl font-semibold text-ink">{name}</h3>
          <p className="mt-1 text-sm text-muted">{employee.designation}</p>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
            <IdPill id={employee.employeeId} />
            <LinkedInLink {...employeeLinkedIn(employee, name)} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function MemberCard({
  employee,
  index,
}: {
  employee: PublicEmployee;
  index: number;
}) {
  const name = displayName(employee.name);

  return (
    <Reveal delay={Math.min(index, 6) * 0.05}>
      <article className="group overflow-hidden rounded-[1.5rem] border border-ink/8 bg-white transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_22px_40px_-24px_rgba(10,22,40,0.28)]">
        <PhotoFrame employee={employee} aspect="aspect-[3/4]" />
        <div className="p-5 md:p-6">
          <h3 className="font-heading text-xl font-semibold text-ink">{name}</h3>
          <p className="mt-1 text-sm text-muted">
            {employee.designation || "Team member"}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <IdPill id={employee.employeeId} />
            <LinkedInLink {...employeeLinkedIn(employee, name)} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function InternCard({
  employee,
  index,
}: {
  employee: PublicEmployee;
  index: number;
}) {
  const name = displayName(employee.name);
  const joined = formatTeamDate(employee.joinedDate);
  const ended = formatTeamDate(employee.endDate);
  const isActive = employee.status === "Active";

  return (
    <Reveal delay={Math.min(index, 6) * 0.05}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/8 bg-white transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_22px_40px_-24px_rgba(10,22,40,0.28)]">
        <div className="relative">
          <PhotoFrame employee={employee} aspect="aspect-[3/4]" />
          <span
            className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${
              isActive ? "bg-white/90 text-ink" : "bg-navy-deep/90 text-white"
            }`}
          >
            {isActive ? "Active intern" : "Internship completed"}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3 className="font-heading text-xl font-semibold text-ink">{name}</h3>
          <p className="mt-1 text-sm text-muted">
            {employee.designation || "Intern"}
          </p>
          <div className="mt-4 space-y-1 text-sm text-muted">
            {joined ? <p>Joined: {joined}</p> : null}
            {!isActive ? (
              <p>
                {ended
                  ? `Internship Ended: ${ended}`
                  : "Internship Completed"}
              </p>
            ) : null}
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
            <IdPill id={employee.employeeId} />
            <LinkedInLink {...employeeLinkedIn(employee, name)} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}
