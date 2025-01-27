export function StatusBadge({ isAchieved }: { isAchieved: boolean }) {
  const statusText = isAchieved ? "Achieved" : "In Progress";
  const statusClass = isAchieved
    ? "bg-green-200 text-green-800"
    : "bg-yellow-200 text-yellow-800";

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClass}`}>
      {statusText}
    </span>
  );
}
