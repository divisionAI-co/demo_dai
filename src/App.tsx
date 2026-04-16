const features = [
  {
    title: "Multi-agent routing",
    body: "Planner, Coder, Tester, and Reviewer collaborate with explicit contracts—each step has clear inputs and outputs.",
  },
  {
    title: "Human-in-the-loop",
    body: "Approve gates before sensitive steps, add feedback, and resume without losing workspace context.",
  },
  {
    title: "Repo-native delivery",
    body: "Clone, edit, test, and push against your real stack—Next.js, Bun, Python, and more.",
  },
];

const steps = [
  { n: "01", t: "Intent", d: "Connect a ticket or describe the change you want." },
  { n: "02", t: "Plan", d: "Spec, architecture, and tasks are produced with traceability." },
  { n: "03", t: "Build", d: "Implementation and tests run in an isolated workspace." },
  { n: "04", t: "Ship", d: "Review, merge, and board updates when your process allows." },
];

export default function App() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(56, 189, 248, 0.25), transparent)",
        }}
      />

      <header className="relative border-b border-surface-border/80 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-lg font-display font-semibold text-accent">
              D
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              Division AI
            </span>
          </div>
          <span className="rounded-full border border-surface-border bg-surface-raised/50 px-3 py-1 text-xs font-medium text-slate-400">
            Customer demo
          </span>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-6 pb-24 pt-16">
        <section className="text-center">
          <p className="mb-4 inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            Live orchestration for software delivery
          </p>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Ship features with agents you can{" "}
            <span className="bg-gradient-to-r from-sky-300 to-cyan-400 bg-clip-text text-transparent">
              trust and steer
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            This page is a lightweight demo shell—use it to walk customers through value,
            then switch to your product UI or a recorded workflow run.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#features"
              className="rounded-xl bg-accent px-6 py-3 font-semibold text-surface shadow-lg shadow-sky-500/20 transition hover:bg-sky-300"
            >
              See capabilities
            </a>
            <a
              href="#flow"
              className="rounded-xl border border-surface-border bg-surface-raised px-6 py-3 font-semibold text-slate-200 transition hover:border-slate-500"
            >
              How it works
            </a>
          </div>
        </section>

        <section id="features" className="mt-28">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            What to highlight in the room
          </h2>
          <p className="mt-2 max-w-2xl text-slate-400">
            Three talking points that map cleanly to an enterprise buyer conversation.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <article
                key={f.title}
                className="rounded-2xl border border-surface-border bg-surface-raised/40 p-6 shadow-xl shadow-black/20 transition hover:border-slate-600"
              >
                <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="flow" className="mt-28">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Suggested demo flow
          </h2>
          <p className="mt-2 max-w-2xl text-slate-400">
            A four-beat narrative you can complete in under ten minutes.
          </p>
          <ol className="mt-10 space-y-4">
            {steps.map((s) => (
              <li
                key={s.n}
                className="flex gap-4 rounded-2xl border border-surface-border bg-surface-raised/30 p-5 sm:items-center"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 font-display text-sm font-bold text-accent">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-white">{s.t}</h3>
                  <p className="mt-1 text-sm text-slate-400">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-28 rounded-3xl border border-accent/20 bg-gradient-to-br from-sky-500/10 to-transparent p-8 sm:p-10">
          <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">
            Ready for the next slide
          </h2>
          <p className="mt-3 max-w-xl text-slate-400">
            Replace this block with a screenshot, embedded video, or iframe to your staging
            orchestrator. This repo stays dependency-light so it is easy to hand off.
          </p>
        </section>
      </main>

      <footer className="relative border-t border-surface-border py-8 text-center text-sm text-slate-500">
        <p>Division AI — customer demo · Not connected to production data</p>
      </footer>
    </div>
  );
}
