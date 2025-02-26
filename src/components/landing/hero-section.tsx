import NotodoLogo from "../notodo-logo"

interface HeroSectionProps {
  [key: string]: any
}

export default function HeroSection({ ...props }: HeroSectionProps) {
  return (
    <section className="hero bg-gradient-to-br from-blue-50 to-purple-50" {...props}>
      <div className="max-w-6xl mx-auto text-center px-6 py-20 md:py-32">
        <NotodoLogo className="mx-auto mb-12 w-[250px] h-[80px] md:w-[300px] md:h-[100px]" />
        <h1 className="mb-6 text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
          Break Bad Habits, <span className="text-blue-600">Build Better You</span>
        </h1>
        <p className="max-w-3xl mx-auto mb-12 text-xl md:text-2xl text-gray-600 leading-relaxed">
          Notodo helps you identify and avoid harmful habits while guiding you towards positive lifestyle changes. Start your journey to a better self today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <a href="#cta" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105">
            Get Started Free
          </a>
          <a href="#operation-flow" className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-md border border-blue-200 hover:bg-gray-50 transition-all">
            How It Works
          </a>
        </div>
        <div className="mt-12 bg-white p-4 rounded-lg shadow-md inline-block">
          <p className="text-gray-500 text-sm">Trusted by thousands of users worldwide</p>
        </div>
      </div>
    </section>
  )
}
