import "../styles/MenuHamburger.css";
import { useRef, useState, useEffect } from "react";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIcon = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      id="nav-icon4"
      className={`nav-icon ${isOpen ? "open" : ""}`}
      onClick={toggleIcon}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
const DropdownMenu = ({ title = "Products", options = [] }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
 

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <button
        id="dropdown-nav"
        type="button"
        className={`flex items-center gap-1 px-4 py-2 rounded hover:bg-gray-100 focus:outline-none transition-colors ${
          open ? "bg-green-50 text-green-700" : "text-gray-700"
        }`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
   
          setOpen(!open);
        }}
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <ul
        className={`absolute z-10 mt-2 w-48 bg-white  rounded-md shadow-md transform transition-all duration-300 origin-top opacity-0 scale-95 ${
          open ? "opacity-100 scale-100" : "pointer-events-none"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-nav"
      >
        {options.map(({ label, href }, index) => (
          <a
            key={index}
            href={href}
            className="block px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100"
          >
            {label}
          </a>
        ))}
      </ul>
    </div>
  );
};

function SlideDown({ isOpen, children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      style={{
        height: height,
        overflow: "hidden",
        transition: "height 300ms ease",
      }}
    >
      {children}
    </div>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className=" py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div
          className={`bg-white  px-7 py-6 flex items-center justify-between shadow-sm border border-green-100 ${
            mobileMenuOpen ? " rounded-t-lg  border-b-0 " : "  rounded-lg "
          }`}
        >
          {/* Logo */}
          <a href="/" className="text-green-800 font-extrabold italic">
            <img src="../../public/K_logo.svg" alt="Logo" className="w-8 h-8" />
          </a>

          {/* Desktop nav */}

          <div className="hidden md:flex space-x-6 text-m text-gray-600 items-center">
            <DropdownMenu
              title="Soluciones"
              options={[
                { label: "Opción 1", href: "#opcion1" },
                { label: "Opción 2", href: "#opcion2" },
              ]}
            />

            <a href="#clientes" className="hover:text-green-800">
              Clientes{" "}
            </a>
            <a href="#precios" className="hover:text-green-800">
              Precios
            </a>
            <a href="#contacto" className="hover:text-green-800">
              Contacto
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="focus:outline-none"
            >
              <Hamburger />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <SlideDown isOpen={mobileMenuOpen}>
          <div className="md:hidden mt-0 bg-white border-x border-b border-green-100 rounded-b-lg shadow-sm px-2 py-4 space-y-3 text-sm text-gray-600">
            <DropdownMenu
              title="Soluciones"
              options={[
                { label: "Opción 1", href: "#opcion1" },
                { label: "Opción 2", href: "#opcion2" },
              ]}
            />
            <a href="#clientes" className="block hover:text-green-800 px-4">
              Clientes
            </a>
            <a href="#precios" className="block hover:text-green-800 px-4">
              Precios
            </a>
            <a href="#contacto" className="block hover:text-green-800 px-4">
              Contacto
            </a>
          </div>
        </SlideDown>
      </div>
    </nav>
  );
}
