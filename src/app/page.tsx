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
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

