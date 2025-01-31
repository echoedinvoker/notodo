export default function ProgressBar({ progress }: { progress: number }) {
  const clampedProgress = Math.min(100, Math.max(0, progress * 100));
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
      {clampedProgress > 0 && (
        <div 
          className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" 
          style={{ width: `${clampedProgress}%` }}
        ></div>
      )}
    </div>
  );
}
