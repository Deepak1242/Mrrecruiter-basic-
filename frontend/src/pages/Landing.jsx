import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <section className="flex flex-col items-center text-center gap-8">
      <div className="mt-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Open for opportunities
        </span>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
        Grow your professional network with
        <span className="block gradient-text">MrRecruiter</span>
      </h1>
      <p className="max-w-2xl text-slate-300">
        Discover jobs, build connections, and showcase your skills — all in one modern, fast, and beautiful app inspired by LinkedIn.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/signup"
          className="rounded-lg bg-brand px-6 py-3 text-white font-semibold hover:bg-brand-dark "
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-base font-semibold text-slate-200 hover:bg-white/10"
        >
          I already have an account
        </Link>
      </div>

      {/* Showcase Cards */}
      <div className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
        <div className="glass-card p-6 text-left">
          <h3 className="mb-2 text-lg font-semibold">Curated Jobs</h3>
          <p className="text-sm text-slate-300">Find opportunities across tech, design, and product from top companies.</p>
        </div>
        <div className="glass-card p-6 text-left">
          <h3 className="mb-2 text-lg font-semibold">Build Your Profile</h3>
          <p className="text-sm text-slate-300">Showcase your experience, projects, and achievements to recruiters.</p>
        </div>
        <div className="glass-card p-6 text-left">
          <h3 className="mb-2 text-lg font-semibold">Grow Network</h3>
          <p className="text-sm text-slate-300">Connect with peers, mentors, and hiring managers to level up your career.</p>
        </div>
      </div>
    </section>
  )
}
