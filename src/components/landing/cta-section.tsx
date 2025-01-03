interface CTASectionProps {
  [key: string]: any
}

export default function CTASection({ ...props }: CTASectionProps) {
  return (
    <section className="cta" {...props}>
      <h2>Ready to Get Started?</h2>
      <button>Sign Up Now</button>
    </section>
  )
}
