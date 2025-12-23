const STATS = [
  { number: '1000+', label: 'Happy Clients' },
  { number: '5000+', label: 'Cleanings Done' },
  { number: '50+', label: 'Team Members' },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <h2>About SparkleClean</h2>
          <p>
            With over 10 years of experience, SparkleClean has been providing top-notch cleaning services to both
            residential and commercial clients. Our team of trained professionals uses eco-friendly products to ensure a
            safe and clean environment for you and your family.
          </p>
          <div className="stats">
            {STATS.map((s) => (
              <div key={s.label} className="stat reveal">
                <span className="number">{s.number}</span>
                <span className="label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
