interface HeroSectionProps {
  [key: string]: any
}

export default function HeroSection({ ...props }: HeroSectionProps) {
  return (
    <section className="hero" {...props}>
      <div className="max-w-6xl mx-auto text-center mb-40 px-10 pt-16">
        <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" className="mx-auto my-16">
          <circle cx="50" cy="50" r="40" fill="#FF6B6B" />

          <line x1="25" y1="25" x2="75" y2="75" stroke="white" stroke-width="8" stroke-linecap="round" />
          <line x1="75" y1="25" x2="25" y2="75" stroke="white" stroke-width="8" stroke-linecap="round" />

          <text x="110" y="65" font-family="Arial" font-size="48" font-weight="bold" fill="#333333">
            notodo
          </text>
        </svg>
        {/* TODO: change contents */}
        <h3 className="mb-8 text-4xl md:text-5xl font-bold text-darkGrayishBlue">
          A history of everything you copy
        </h3>
        {/* TODO: change contents */}
        <p className="max-w-3xl mx-auto mb-10 text-2xl text-grayishBlue">
          Clipboard allows you to track and organize everything you copy. Instantly access your clipboard on all your
          devices.
        </p>
      </div>
    </section>
  )
}
