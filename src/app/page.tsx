import { auth } from "@/auth"
import { paths } from "@/paths"
import { redirect } from "next/navigation"
import { HeroSection, FeaturesSection, TestimonialsSection, CTASection, PricingSection, Footer } from "@/components/landing"

export default async function Home() {
  const session = await auth()

  if (session?.user) {
    redirect(paths.notodoListPage(session.user.id))
  }

  return (
    <>
      <main>
        <HeroSection id="hero" />
        <FeaturesSection id="feature" />
        <PricingSection id="pricing" />
        <TestimonialsSection id="testimonial" />
        <CTASection id="cta" />
      </main>
      <Footer />
    </>
  )
}

