interface HeroSectionProps {
  [key: string]: any
}

export default function HeroSection({ ...props }: HeroSectionProps) {
  return (
    <section className="hero" {...props}>
      <h1>Welcome to Our App</h1>
      <p>The best way to manage your tasks</p>
    </section>
  )
}
