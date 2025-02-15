import { FaTimes } from "react-icons/fa";

interface NotificationItemProps {
  title: string;
  subtitle: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  dismissAction: () => void;
}

interface DismissButtonProps {
  color: string;
  onClick: () => void;
}

const DismissButton: React.FC<DismissButtonProps> = ({ color, onClick }) => (
  <form action={onClick}>
    <button className={`${color} hover:${color} transition-colors duration-200 rounded-full p-1 hover:bg-opacity-20`}>
      <FaTimes size={20} />
      <span className="sr-only">Dismiss notification</span>
    </button>
  </form>
);

const NotificationItem: React.FC<NotificationItemProps> = ({ title, subtitle, bgColor, borderColor, textColor, dismissAction }) => (
  <div className={`${bgColor} rounded-lg p-4 flex justify-between items-center ${borderColor}`}>
    <div>
      <h3 className={`text-lg font-semibold ${textColor} mb-1`}>{title}</h3>
      <p className={`text-sm ${textColor}`}>{subtitle}</p>
    </div>
    <DismissButton color={textColor} onClick={dismissAction} />
  </div>
);

export default NotificationItem;
