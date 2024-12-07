import { FaCar, FaCheck } from "react-icons/fa";

export default function CreateRewardPage() {
  return (
    <div className="flex justify-center items-center">
      <input
        className="peer hidden"
        type="checkbox"
        id="toggleCheckbox"
      />
      <label htmlFor="toggleCheckbox" className="hidden fixed text-stone-500 peer-[:checked]:block z-30">
        <FaCheck />
      </label>
      <label htmlFor="toggleCheckbox" className="fixed text-stone-500 peer-[:checked]:hidden z-30">
        <FaCar />
      </label>
      <div className="hidden peer-[:checked]:block absolute inset-0 bg-black/30 backdrop-blur-sm">
      </div>
    </div>
  );
}
