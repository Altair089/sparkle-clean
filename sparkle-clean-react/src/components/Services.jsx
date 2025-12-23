const SERVICES = [
  {
    icon: 'fa-home',
    title: 'Residential Cleaning',
    description: 'Complete home cleaning for a healthier living space.',
  },
  {
    icon: 'fa-building',
    title: 'Commercial Cleaning',
    description: 'Professional cleaning for your business premises.',
  },
  {
    icon: 'fa-couch',
    title: 'Deep Cleaning',
    description: 'Thorough cleaning for all hard-to-reach areas.',
  },
]

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <h2>Our Services</h2>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="service-card reveal">
              <i className={`fas ${s.icon}`} aria-hidden="true" />
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
