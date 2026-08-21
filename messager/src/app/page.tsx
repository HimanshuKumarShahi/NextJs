export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0d10] text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-bold">
              N
            </div>
            <span className="text-lg font-semibold tracking-tight">Nexora</span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#platform" className="hover:text-white">
              Platform
            </a>
            <a href="#solutions" className="hover:text-white">
              Solutions
            </a>
            <a href="#developers" className="hover:text-white">
              Developers
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
            <a href="#docs" className="hover:text-white">
              Docs
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden text-sm text-zinc-400 hover:text-white sm:block">
              Sign in
            </button>
            <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200">
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.18),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 text-center lg:pb-32 lg:pt-36">
          <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Infrastructure for modern applications
            <span className="text-zinc-500">→</span>
          </div>

          <h1 className="mx-auto max-w-5xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-8xl">
            Build, deploy and scale
            <span className="block bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
              without the infrastructure headache.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            A unified platform for SaaS, PaaS and Network-as-a-Service.
            Ship production workloads faster with infrastructure that scales
            automatically.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <button className="rounded-xl bg-white px-6 py-3.5 font-medium text-black transition hover:bg-zinc-200">
              Start building for free
            </button>

            <button className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-medium text-white transition hover:bg-white/[0.07]">
              Explore the platform
            </button>
          </div>

          <p className="mt-5 text-xs text-zinc-600">
            No credit card required · Deploy in minutes · Free developer tier
          </p>
        </div>
      </section>

      {/* Product preview */}
      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101318] shadow-2xl shadow-black/40">
          <div className="flex items-center border-b border-white/10 px-4 py-3">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-zinc-700" />
              <span className="h-3 w-3 rounded-full bg-zinc-700" />
              <span className="h-3 w-3 rounded-full bg-zinc-700" />
            </div>

            <div className="mx-auto rounded-md border border-white/10 bg-black/20 px-20 py-1 text-xs text-zinc-600">
              app.nexora.dev/dashboard
            </div>
          </div>

          <div className="grid min-h-[520px] lg:grid-cols-[220px_1fr]">
            {/* Sidebar */}
            <aside className="hidden border-r border-white/10 p-4 lg:block">
              <div className="mb-7 text-xs font-medium text-zinc-600">
                WORKSPACE
              </div>

              <div className="space-y-1 text-sm">
                {[
                  "Overview",
                  "Projects",
                  "Deployments",
                  "Databases",
                  "Networks",
                  "Logs",
                  "Settings",
                ].map((item, i) => (
                  <div
                    key={item}
                    className={`rounded-lg px-3 py-2 ${
                      i === 0
                        ? "bg-white/10 text-white"
                        : "text-zinc-500 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>

            {/* Dashboard */}
            <div className="p-6 lg:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm text-zinc-500">Overview</p>
                  <h2 className="mt-1 text-2xl font-semibold">
                    Production environment
                  </h2>
                </div>

                <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black">
                  + New deployment
                </button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["99.99%", "Uptime"],
                  ["142ms", "Avg. response"],
                  ["18.4M", "Requests"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                  >
                    <div className="text-2xl font-semibold">{value}</div>
                    <div className="mt-1 text-sm text-zinc-500">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Request volume</div>
                    <div className="mt-1 text-xs text-zinc-600">
                      Last 24 hours
                    </div>
                  </div>

                  <span className="text-xs text-emerald-400">
                    +18.2%
                  </span>
                </div>

                <div className="mt-8 flex h-44 items-end gap-2">
                  {[35, 48, 42, 65, 52, 72, 60, 84, 70, 92, 76, 100, 88, 95, 82, 100].map(
                    (height, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-white/20 transition hover:bg-white/40"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-y border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-14 gap-y-6 px-6 py-10 text-sm font-semibold tracking-widest text-zinc-600">
          ACME
          <span>VERTEX</span>
          <span>LINEAR</span>
          <span>ORBIT</span>
          <span>NEBULA</span>
          <span>QUANT</span>
        </div>
      </section>

      {/* Platform */}
      <section id="platform" className="mx-auto max-w-7xl px-6 py-32">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-zinc-500">
            ONE PLATFORM
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything your infrastructure needs.
          </h2>

          <p className="mt-5 text-lg leading-8 text-zinc-500">
            Stop stitching together ten different services. Nexora gives
            your team compute, networking, databases, observability and
            deployment tooling in one platform.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {[
            {
              icon: "⌘",
              title: "SaaS Infrastructure",
              text: "Build multi-tenant applications with authentication, billing, storage and observability built in.",
            },
            {
              icon: "◇",
              title: "PaaS",
              text: "Push your code and let the platform handle builds, deployments, scaling, networking and rollbacks.",
            },
            {
              icon: "◈",
              title: "NaaS",
              text: "Create secure private networks, service meshes and global connectivity without managing hardware.",
            },
            {
              icon: "↗",
              title: "Auto Scaling",
              text: "Automatically scale compute based on real-time traffic and workload requirements.",
            },
            {
              icon: "◌",
              title: "Observability",
              text: "Logs, metrics, traces and alerts in one place so your team knows exactly what is happening.",
            },
            {
              icon: "⚡",
              title: "Edge Network",
              text: "Serve applications closer to users with globally distributed infrastructure.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[#0d1014] p-8 transition hover:bg-[#12161b]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-lg">
                {item.icon}
              </div>

              <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                {item.text}
              </p>

              <div className="mt-6 text-sm text-zinc-400">
                Learn more →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Developer section */}
      <section id="developers" className="border-y border-white/10 bg-[#0d0f12]">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-32 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium text-zinc-500">
              BUILT FOR DEVELOPERS
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              From git push to production.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-500">
              Your workflow should be simple. Connect your repository,
              configure your environment and deploy.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Automatic CI/CD pipelines",
                "Preview deployments for every pull request",
                "Instant rollbacks",
                "Environment variables and secrets",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10 text-xs text-emerald-400">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Code */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080a0d]">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-3 text-xs text-zinc-600">
                terminal
              </span>
            </div>

            <pre className="overflow-x-auto p-6 text-sm leading-7 text-zinc-400">
{`$ nexora init

✓ Project created

$ nexora deploy

Building application...
Installing dependencies...
Running tests...
Creating deployment...
Provisioning infrastructure...

✓ Deployment successful

https://my-app.nexora.dev

Production is live.`}
            </pre>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="solutions" className="mx-auto max-w-7xl px-6 py-32">
        <div className="text-center">
          <p className="text-sm font-medium text-zinc-500">
            DESIGNED TO SCALE
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Infrastructure that grows with you.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-zinc-500">
            Start with a single service. Grow into a global architecture
            without rebuilding your infrastructure.
          </p>
        </div>

        <div className="relative mt-20 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0f13] p-8 lg:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />

          <div className="relative grid gap-6 md:grid-cols-3">
            {[
              ["01", "Application", "Frontend · API · Workers"],
              ["02", "Platform", "Compute · Database · Storage"],
              ["03", "Network", "Edge · VPC · Security"],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-xl border border-white/10 bg-black/30 p-7 backdrop-blur"
              >
                <span className="text-xs text-zinc-600">{number}</span>

                <h3 className="mt-10 text-xl font-semibold">{title}</h3>

                <p className="mt-2 text-sm text-zinc-500">{text}</p>

                <div className="mt-8 h-px bg-white/10" />

                <div className="mt-5 text-xs text-zinc-600">
                  Managed by Nexora
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y border-white/10 bg-[#0d0f12]">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <div className="text-center">
            <p className="text-sm font-medium text-zinc-500">PRICING</p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Simple pricing. No infrastructure games.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-zinc-500">
              Start free and pay only as your infrastructure grows.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-3">
            {[
              {
                name: "Hobby",
                price: "$0",
                description: "For personal projects.",
                features: [
                  "1 project",
                  "100K requests",
                  "Community support",
                  "Basic analytics",
                ],
              },
              {
                name: "Pro",
                price: "$29",
                description: "For growing teams.",
                features: [
                  "Unlimited projects",
                  "Advanced deployments",
                  "Autoscaling",
                  "Observability",
                  "Priority support",
                ],
                featured: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For serious infrastructure.",
                features: [
                  "Dedicated infrastructure",
                  "Private networking",
                  "SSO & RBAC",
                  "SLA",
                  "24/7 support",
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 ${
                  plan.featured
                    ? "border-white/30 bg-white/[0.06]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {plan.featured && (
                  <div className="mb-5 text-xs font-medium text-emerald-400">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-lg font-semibold">{plan.name}</h3>

                <p className="mt-2 text-sm text-zinc-500">
                  {plan.description}
                </p>

                <div className="mt-8 text-4xl font-semibold">
                  {plan.price}
                  {plan.price === "$29" && (
                    <span className="text-sm font-normal text-zinc-600">
                      /month
                    </span>
                  )}
                </div>

                <button className="mt-8 w-full rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-medium hover:bg-white/10">
                  {plan.name === "Enterprise"
                    ? "Contact sales"
                    : "Get started"}
                </button>

                <div className="my-8 h-px bg-white/10" />

                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex gap-3 text-sm text-zinc-400"
                    >
                      <span className="text-zinc-300">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.15),transparent_55%)]" />

        <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Your next product deserves
            <span className="block text-zinc-500">
              better infrastructure.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-zinc-500">
            Deploy your first production application today and let Nexora
            handle the infrastructure.
          </p>

          <button className="mt-10 rounded-xl bg-white px-7 py-3.5 font-medium text-black hover:bg-zinc-200">
            Start building for free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-bold text-black">
                N
              </div>
              <span className="font-semibold">Nexora</span>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-600">
              Modern infrastructure for developers building the next
              generation of software.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: ["Platform", "Compute", "Database", "Networking"],
            },
            {
              title: "Developers",
              links: ["Documentation", "API Reference", "CLI", "Changelog"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Security", "Contact"],
            },
          ].map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-medium">{column.title}</h4>

              <div className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-sm text-zinc-600 hover:text-white"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 text-xs text-zinc-600 sm:flex-row">
            <span>© 2026 Nexora Inc.</span>
            <div className="flex gap-5">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Status</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}