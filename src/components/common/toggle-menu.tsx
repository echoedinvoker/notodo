interface ToggleMenuProps {
  [x: string]: any
}

export default function ToggleMenu({ ...props }: ToggleMenuProps) {
  return (
    <div className="" {...props}>
      <input type="checkbox" className="peer hidden" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="before:content-['☰'] peer-checked:before:content-['✕'] before:text-lg"></label>
    </div>
  )
}
