
'use client';

import React from 'react';

const Page = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#090a09] text-[#f4f3ed] selection:bg-lime-300 selection:text-black">

      <nav className="relative z-20 mx-auto flex max-w-[1440px] items-center justify-between border-b border-white/[0.09] px-6 py-5 sm:px-10 lg:px-16">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-300 text-black">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="M5 17L12 4L19 17M8 12H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-[0.2em]">
            NEXORA
          </span>
        </a>

        <div className="hidden items-center gap-9 text-[13px] text-white/55 md:flex">
          <a href="#vision" className="transition hover:text-white">Vision</a>
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#about" className="transition hover:text-white">About</a>
        </div>

        <a
          href="/signup"
          className="group flex items-center gap-3 rounded-full border border-white/20 px-4 py-2.5 text-xs transition hover:border-lime-300 hover:bg-lime-300 hover:text-black sm:px-5"
        >
          Get started
          <span className="transition-transform group-hover:translate-x-1">↗</span>
        </a>
      </nav>


      <section id="vision" className="relative mx-auto grid min-h-[690px] max-w-[1440px] items-center px-6 py-20 sm:px-10 lg:min-h-[760px] lg:grid-cols-[1.08fr_0.92fr] lg:px-16 lg:py-24">

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative z-10 max-w-2xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_10px_rgba(190,242,100,0.7)]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/65">
              A new perspective starts here
            </span>
          </div>

          <h1 className="text-[clamp(3.5rem,8vw,7.5rem)] font-medium leading-[0.91] tracking-[-0.085em]">
            Think
            <br />
            beyond
            <br />
            <span className="font-serif italic font-normal text-lime-300">
              ordinary.
            </span>
          </h1>

          <p className="mt-8 max-w-md text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
            A different way to create, explore, and move forward.
            Built for people who see possibility where others see limits.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/signup"
              className="group inline-flex items-center gap-8 rounded-full bg-lime-300 px-6 py-4 text-sm font-semibold text-black transition hover:bg-lime-200"
            >
              Discover Nexora
              <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
            </a>

            <a
              href="#features"
              className="inline-flex items-center gap-2 px-3 py-3 text-sm text-white/65 transition hover:text-white"
            >
              Explore the vision <span>↓</span>
            </a>
          </div>

          <div className="mt-14 flex items-center gap-4 border-t border-white/10 pt-5">
            <span className="text-[10px] tracking-[0.18em] text-white/35">01 / 03</span>
            <div className="h-px w-12 bg-lime-300/70" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
              Made for what comes next
            </span>
          </div>
        </div>

        <div className="relative mx-auto mt-16 flex aspect-square w-full max-w-[520px] items-center justify-center lg:mt-0 lg:ml-auto">

          <div className="absolute inset-[8%] rounded-full border border-white/[0.07]" />
          <div className="absolute inset-[17%] rounded-full border border-white/[0.09]" />
          <div className="absolute inset-[27%] rounded-full border border-white/[0.12]" />

          <div className="absolute inset-[12%] rotate-45 rounded-[36%] border border-lime-300/20" />
          <div className="absolute inset-[12%] -rotate-45 rounded-[36%] border border-white/10" />

          <div className="absolute h-[74%] w-[74%] animate-[spin_35s_linear_infinite] rounded-full border border-dashed border-white/15" />

          <div className="absolute left-[16%] top-[23%] h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_20px_rgba(190,242,100,0.8)]" />
          <div className="absolute bottom-[23%] right-[17%] h-1.5 w-1.5 rounded-full bg-white/80" />
          <div className="absolute right-[14%] top-[35%] h-1 w-1 rounded-full bg-lime-300" />

          <div className="relative flex h-[42%] w-[42%] items-center justify-center rounded-full border border-lime-200/30 bg-[#a3c76c]/[0.04] shadow-[0_0_100px_rgba(190,242,100,0.07)]">
            <div className="absolute inset-3 rounded-full border border-white/10" />

            <svg viewBox="0 0 160 160" fill="none" className="h-[66%] w-[66%]">
              <path d="M80 15L137 47V113L80 145L23 113V47L80 15Z" stroke="#BEF264" strokeWidth="0.8" strokeOpacity="0.6" />
              <path d="M80 37L117 58V102L80 123L43 102V58L80 37Z" stroke="#BEF264" strokeWidth="1" strokeOpacity="0.8" />
              <path d="M80 57L99 68V92L80 103L61 92V68L80 57Z" fill="#BEF264" fillOpacity="0.9" />
              <path d="M80 15V57M137 47L99 68M137 113L99 92M80 145V103M23 113L61 92M23 47L61 68" stroke="#BEF264" strokeWidth="0.8" strokeOpacity="0.55" />
            </svg>
          </div>

          <div className="absolute left-0 top-[18%] hidden border-l border-white/20 pl-3 sm:block">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">System</p>
            <p className="mt-1 text-xs text-white/75">01 — Evolving</p>
          </div>

          <div className="absolute bottom-[13%] right-0 hidden border-r border-white/20 pr-3 text-right sm:block">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">Perspective</p>
            <p className="mt-1 text-xs text-white/75">Beyond limits</p>
          </div>

          <div className="absolute bottom-[5%] left-[13%] h-px w-12 bg-white/20" />
          <div className="absolute right-[13%] top-[8%] h-px w-12 bg-lime-300/50" />
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d0e0c]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-5 px-6 py-6 sm:px-10 lg:px-16">
          {['CLARITY', 'CREATIVITY', 'PRECISION', 'POSSIBILITY'].map((item, index) => (
            <div key={item} className="flex items-center gap-3">
              <span className="text-[10px] text-lime-300">
                0{index + 1}
              </span>
              <span className="text-[10px] font-medium tracking-[0.22em] text-white/50 sm:text-xs">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>


      <section id="features" className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-lime-300">
              The philosophy
            </p>

            <h2 className="max-w-md text-4xl leading-[1.1] tracking-[-0.06em] sm:text-5xl">
              Less noise.
              <br />
              <span className="font-serif italic text-white/45">
                More meaning.
              </span>
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
              Great experiences do not need to shout.
              They earn attention through thoughtful details,
              purposeful design, and a clear point of view.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
            <article className="group bg-[#0d0e0c] p-7 transition hover:bg-[#12140f] sm:p-9">
              <div className="mb-12 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl text-lime-300">
                ↗
              </div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/35">
                01 / Focus
              </p>
              <h3 className="text-xl font-medium tracking-tight">
                Built with purpose
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/45">
                Every element has a reason to exist.
                Nothing is here just to fill space.
              </p>
            </article>

            <article className="group bg-[#0d0e0c] p-7 transition hover:bg-[#12140f] sm:p-9">
              <div className="mb-12 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl text-lime-300">
                ◈
              </div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/35">
                02 / Form
              </p>
              <h3 className="text-xl font-medium tracking-tight">
                Details that matter
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/45">
                A considered visual language that feels
                natural today and relevant tomorrow.
              </p>
            </article>

            <article className="group bg-[#0d0e0c] p-7 transition hover:bg-[#12140f] sm:p-9">
              <div className="mb-12 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl text-lime-300">
                ⌁
              </div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/35">
                03 / Flow
              </p>
              <h3 className="text-xl font-medium tracking-tight">
                Made to feel effortless
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/45">
                A straightforward experience that lets
                you focus on what you came to do.
              </p>
            </article>

            <article className="group bg-[#0d0e0c] p-7 transition hover:bg-[#12140f] sm:p-9">
              <div className="mb-12 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl text-lime-300">
                ⊹
              </div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/35">
                04 / Future
              </p>
              <h3 className="text-xl font-medium tracking-tight">
                Room to evolve
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/45">
                A foundation designed to grow alongside
                your ideas and ambitions.
              </p>
            </article>
          </div>
        </div>
      </section>


      <section id="about" className="px-6 pb-24 sm:px-10 sm:pb-32 lg:px-16">
        <div className="relative mx-auto max-w-[1312px] overflow-hidden rounded-2xl border border-white/10 bg-[#11130f] px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-lime-300/[0.05] blur-3xl" />

          <p className="relative mb-5 text-[10px] uppercase tracking-[0.25em] text-lime-300">
            Your next chapter
          </p>

          <h2 className="relative text-4xl font-medium tracking-[-0.06em] sm:text-6xl">
            Make room for
            <br />
            <span className="font-serif italic font-normal text-white/45">
              something different.
            </span>
          </h2>

          <p className="relative mx-auto mt-6 max-w-md text-sm leading-7 text-white/45">
            Start with an idea. Build toward something meaningful.
            The rest begins with you.
          </p>

          <a
            href="/signup"
            className="relative mt-9 inline-flex items-center gap-8 rounded-full bg-lime-300 px-7 py-4 text-sm font-semibold text-black transition hover:bg-lime-200"
          >
            Get started
            <span className="text-lg">↗</span>
          </a>
        </div>
      </section>


      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <a href="/" className="text-xs font-semibold tracking-[0.2em]">
            NEXORA
          </a>

          <p className="text-xs text-white/35">
            A different perspective on what comes next.
          </p>

          <p className="text-xs text-white/35">
            © 2026 Nexora
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Page;
