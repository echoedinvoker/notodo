interface NotificationCardProps {
  title: string;
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  bgColor: string;
  borderColor: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ title, items, renderItem, bgColor, borderColor }) => {
  if (items.length === 0) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-4">
        {items.map(renderItem)}
      </div>
    </div>
  );
};

export default NotificationCard;
