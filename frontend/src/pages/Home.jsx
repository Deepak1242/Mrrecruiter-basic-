export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <aside className="md:col-span-1">
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-2">Welcome 👋</h3>
          <p className="text-sm text-slate-300">Start building your network and explore trending topics.</p>
        </div>
        <div className="glass-card p-4 mt-4">
          <h3 className="font-semibold mb-2">Trends</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>#hiring</li>
            <li>#react</li>
            <li>#design</li>
          </ul>
        </div>
      </aside>

      <section className="md:col-span-2 space-y-4">
        <div className="glass-card p-4">
          <input
            placeholder="Start a post"
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        {[1, 2, 3].map((i) => (
          <article key={i} className="glass-card p-4">
            <h4 className="font-semibold">A great day to learn Tailwind</h4>
            <p className="text-sm text-slate-300 mt-1">
              Building beautiful UIs quickly with utility-first CSS.
            </p>
          </article>
        ))}
      </section>
    </div>
  )
}
