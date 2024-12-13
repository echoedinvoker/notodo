interface ToggleMenuProps {
  [x: string]: any
}

export default function ToggleMenu({ ...props }: ToggleMenuProps) {
  return (
    <div className="" {...props}>
      <input type="checkbox" className="peer hidden" id="menu-toggle" />
      <label
        htmlFor="menu-toggle"
        className="before:content-['☰'] peer-checked:before:content-['✕'] before:text-lg before:w-8 before:h-8 before:rounded-full before:flex before:items-center before:justify-center hover:before:bg-stone-200 before:duration-200"
      ></label>
    </div>
  )
}
