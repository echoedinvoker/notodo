import React from 'react'

type PlanProps = {
  name: string
  price: string
  features: string[]
  isPopular?: boolean
}

const PlanCard: React.FC<PlanProps> = ({ name, price, features, isPopular }) => (
  <div className={`plan-card ${isPopular ? 'popular' : ''}`}>
    {isPopular && <div className="popular-badge">Most Popular</div>}
    <h3>{name}</h3>
    <div className="price">{price}</div>
    <ul>
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <button>Choose Plan</button>
  </div>
)

interface PricingSectionProps {
  [key: string]: any
}

export default function PricingSection({ ...props }: PricingSectionProps) {
  const plans = [
    {
      name: "Basic",
      price: "$9.99/month",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      name: "Pro",
      price: "$19.99/month",
      features: ["All Basic features", "Feature 4", "Feature 5"],
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      features: ["All Pro features", "Feature 6", "Feature 7", "Custom support"],
    },
  ]

  return (
    <section className="pricing" {...props}>
      <h2>Choose Your Plan</h2>
      <div className="plans-container">
        {plans.map((plan, index) => (
          <PlanCard key={index} {...plan} />
        ))}
      </div>
    </section>
  )
}
