
interface TestimonialSecctionProps {
  [key: string]: any
}

export default function TestimonialsSection({ ...props }: TestimonialSecctionProps) {
  return (
    <section className="testimonials" {...props}>
      <h2>What Our Users Say</h2>
      {/* Add testimonials here */}
    </section>
  )
}
