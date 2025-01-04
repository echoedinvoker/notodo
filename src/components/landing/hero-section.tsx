import NotodoLogo from "../notodo-logo"

interface HeroSectionProps {
  [key: string]: any
}

export default function HeroSection({ ...props }: HeroSectionProps) {
  return (
    <section className="hero" {...props}>
      <div className="max-w-6xl mx-auto text-center mb-40 px-10 pt-16">
        <NotodoLogo className="mx-auto my-16 w-[300px] h-[100px]" />
        <h3 className="mb-8 text-4xl md:text-5xl font-bold text-darkGrayishBlue">
          Break Bad Habits, Build Better You
        </h3>
        <p className="max-w-3xl mx-auto mb-10 text-2xl text-grayishBlue">
          Notodo helps you identify and avoid harmful habits while guiding you towards positive lifestyle changes. Start your journey to a better self today.
        </p>
      </div>
    </section>
  )
}
