const jobs = [
  {
    id: 1,
    title: 'Frontend Engineer',
    company: 'Acme Corp',
    location: 'Remote',
    tags: ['React', 'Tailwind', 'Vite'],
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'Designify',
    location: 'San Francisco, CA',
    tags: ['Figma', 'UX', 'Prototyping'],
  },
  {
    id: 3,
    title: 'Backend Engineer',
    company: 'DataWorks',
    location: 'Bengaluru, IN',
    tags: ['Node.js', 'PostgreSQL', 'Cloud'],
  },
]

export default function Jobs() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recommended jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="glass-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-slate-300">
                  {job.company} • {job.location}
                </p>
              </div>
              <button className="rounded-md bg-brand px-3 py-1.5 text-sm font-semibold hover:bg-brand-dark">
                Apply
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.tags.map((t) => (
                <span key={t} className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-slate-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
