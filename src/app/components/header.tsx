export default function Header() {
  return (
    <header className="flex justify-between p-4">
      <div>
        <span className="font-bold">Cristian.dev</span>
      </div>

      <nav className="flex gap-4">
        <a className="hover-underline" href="#">
          Home
        </a>
        <a className="hover-underline" href="#">
          About
        </a>
        <a className="hover-underline" href="#">
          Projects
        </a>
        <a className="hover-underline" href="#">
          Contact
        </a>
      </nav>
    </header>
  )
}
