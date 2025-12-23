import { useEffect, useMemo, useState } from 'react'

export default function Testimonials() {
  const testimonials = useMemo(
    () => [
      {
        text: "The best cleaning service I've ever used! My home has never been cleaner.",
        author: 'Sarah Johnson',
      },
      {
        text: 'Professional, punctual, and thorough. I highly recommend SparkleClean!',
        author: 'Michael Brown',
      },
      {
        text: 'They did an amazing job on our office. Will definitely use them again.',
        author: 'Emily Davis',
      },
    ],
    [],
  )

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [testimonials.length])

  const current = testimonials[index]

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-slider">
          <div className="testimonial reveal">
            <p>"{current.text}"</p>
            <div className="client">- {current.author}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
