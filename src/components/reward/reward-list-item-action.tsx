interface RewardListItemActionProps {
  name: string;
  [x: string]: any;
}

export default function RewardListItemAction({ name, ...props }: RewardListItemActionProps) {
  return (
    <>
      <div className="absolute peer hidden group-hover:flex inset-y-0 -right-3 w-8 flex-col justify-around items-center" {...props}>
        <input type="checkbox" className="peer hidden" id={name} />
        <label
          htmlFor={name}
          className="bg-stone-300 rounded-full z-40 before:content-[':'] peer-checked:before:content-['✕'] before:text-lg before:w-6 before:h-6 before:rounded-full before:flex before:items-center before:justify-center hover:before:bg-stone-200 before:duration-200"
        ></label>
      </div>
      {/* TODO: add action buttons */}
      <div className="hidden peer-has-[:checked]:block absolute inset-0 bg-stone-300 rounded-lg">
      </div>
    </>
  )
}
