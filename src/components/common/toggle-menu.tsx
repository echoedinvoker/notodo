export default function ToggleMenu() {
  return (
    <div className="sm:hidden">
      <input type="checkbox" className="peer hidden" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="before:content-['☰'] peer-checked:before:content-['✕']"></label>
    </div>
  )
}
