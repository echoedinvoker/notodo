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
      icon: <FiClock className="text-blue-500" />,
      title: "Maintain, Don't Do",
      description: "Focus on maintaining habits rather than completing tasks. Earn points hourly based on your sustained efforts."
    },
    {
      icon: <FiAward className="text-purple-500" />,
      title: "Customizable Rewards",
      description: "Set your own rewards and required points. Some rewards may be locked behind achievements."
    },
    {
      icon: <FiTrendingUp className="text-green-500" />,
      title: "Progressive Growth",
      description: "Define thresholds for each habit, allowing for staged growth and increasing point accumulation."
    },
    {
      icon: <FiStar className="text-amber-500" />,
      title: "Achievement System",
      description: "Unlock achievements as you progress, providing recognition and motivation for your efforts."
    }
  ];

  return (
    <section className="features py-24 bg-gradient-to-b from-white to-gray-50" {...props}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Designed to help you break bad habits and build better ones with a unique approach.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-5xl mb-6 p-4 bg-gray-50 rounded-full">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
