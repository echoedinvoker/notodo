interface FeaturesSectionProps {
  [key: string]: any
}

// TODO: figure out some features and their introductions and write the structure of the section at first
export default function FeaturesSection({ ...props }: FeaturesSectionProps) {
  return (
    <section className="features" {...props}>
      <h2>Our Features</h2>
      {/* Add feature list here */}
    </section>
  )
}
