import { FiClock, FiAward, FiTrendingUp, FiStar } from 'react-icons/fi';

interface FeaturesSectionProps {
  [key: string]: any
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    <div className="text-4xl text-blue-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

export default function FeaturesSection({ ...props }: FeaturesSectionProps) {
  const features: FeatureProps[] = [
    {
      icon: <FiClock />,
      title: "Maintain, Don't Do",
      description: "Focus on maintaining habits rather than completing tasks. Earn points hourly based on your sustained efforts."
    },
    {
      icon: <FiAward />,
      title: "Customizable Rewards",
      description: "Set your own rewards and required points. Some rewards may be locked behind achievements."
    },
    {
      icon: <FiTrendingUp />,
      title: "Progressive Growth",
      description: "Define thresholds for each habit, allowing for staged growth and increasing point accumulation."
    },
    {
      icon: <FiStar />,
      title: "Achievement System",
      description: "Unlock achievements as you progress, providing recognition and motivation for your efforts."
    }
  ];

  return (
    <section className="features py-16 bg-gray-100" {...props}>
      <div className="container mx-auto px-4">
        <h2 className="text-stone-600 text-3xl font-bold uppercase tracking-wide text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
