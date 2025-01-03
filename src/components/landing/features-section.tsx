interface FeaturesSectionProps {
  [key: string]: any
}

export default function FeaturesSection({ ...props }: FeaturesSectionProps) {
  return (
    <section className="features" {...props}>
      <h2>Our Features</h2>
      {/* Add feature list here */}
    </section>
  )
}
