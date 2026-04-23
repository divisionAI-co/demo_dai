export type ProcessStep = {
  title: string;
  description: string;
};

export const STEPS: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "We capture intent from a ticket, doc, or conversation and translate it into a clear spec with acceptance criteria.",
  },
  {
    title: "Design",
    description:
      "The Planner produces an architecture and a task breakdown with explicit contracts between each agent.",
  },
  {
    title: "Build",
    description:
      "The Coder implements changes against your real repo in an isolated workspace, preserving your stack and conventions.",
  },
  {
    title: "Verify",
    description:
      "The Tester executes unit and integration checks, and the Reviewer inspects diffs for correctness and clarity.",
  },
  {
    title: "Ship",
    description:
      "Once gates pass, changes are packaged for merge with traceable links back to the original request.",
  },
];

type ProcessPageProps = {
  onNavigateHome?: () => void;
};

export default function ProcessPage({ onNavigateHome }: ProcessPageProps) {
  return (
    <main className="relative mx-auto max-w-5xl px-6 pb-24 pt-16">
      <section className="text-center">
        <p className="mb-4 inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
          How we deliver
        </p>
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Our Process
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          A repeatable, human-in-the-loop workflow that turns an intent into a
          shippable change—without giving up review, traceability, or taste.
        </p>
      </section>

      <section className="mt-20">
        <ol className="space-y-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-2xl border border-surface-border bg-surface-raised/30 p-5 sm:items-center"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 font-display text-sm font-bold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display font-semibold text-white">
                  {step.title}
                </h2>
                <p className="mt-1 text-sm text-slate-400">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {onNavigateHome ? (
        <section className="mt-20 rounded-3xl border border-accent/20 bg-gradient-to-br from-sky-500/10 to-transparent p-8 sm:p-10">
          <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">
            Want to see the demo flow?
          </h2>
          <p className="mt-3 max-w-xl text-slate-400">
            Head back to the landing page to walk through the narrative in under
            ten minutes.
          </p>
          <button
            type="button"
            onClick={onNavigateHome}
            className="mt-6 inline-flex rounded-xl bg-accent px-6 py-3 font-semibold text-surface shadow-lg shadow-sky-500/20 transition hover:bg-sky-300"
          >
            Back to home
          </button>
        </section>
      ) : null}
    </main>
  );
}
