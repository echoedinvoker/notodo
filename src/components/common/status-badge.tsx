export function StatusBadge({ isAchieved }: { isAchieved: boolean }) {
  const statusText = isAchieved ? "Achieved" : "In Progress";
  const statusClass = isAchieved
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
      {statusText}
    </span>
  );
}
