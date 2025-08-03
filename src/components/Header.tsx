import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ShoppingCart, Palette } from "lucide-react";
import type { ReactNode } from "react";
import { useCart } from "../context/CartProvider";

const navItems = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

const themeConfig: Record<string, { label: string; icon: ReactNode }> = {
  theme1: { label: "Theme 1", icon: <Sun className="w-6 h-6" /> },
  theme2: { label: "Theme 2", icon: <Moon className="w-6 h-6" /> },
  theme3: { label: "Theme 3", icon: <Palette className="w-6 h-6" /> },
};

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  const currentLabel = themeConfig[theme]?.label ?? theme;
  const currentIcon = themeConfig[theme]?.icon;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header
      className={`fixed top-0 w-full z-50 shadow-md ${theme !== "theme2" ? "" : "bg-gray-800"}`}
      style={{
        transition: "background 0.35s ease",
        backdropFilter: "saturate(180%) blur(100px)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" aria-label="Homepage" className="flex items-center gap-2">
          <motion.div
            layout
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`font-extrabold text-3xl tracking-wide ${theme !== "theme2" ? "text-black" : "text-white"}`}
          >
            Hipster
          </motion.div>
        </Link>

        {/* Desktop nav */}
        {theme !== "theme2" && (
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative px-1 py-2 font-medium text-xl transition-colors text-black"
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 bottom-0 h-0.5 w-full rounded-sm transition-all ${isActive ? "bg-black scale-x-100" : "bg-transparent"
                      }`}
                    style={{ transformOrigin: "left" }}
                  />
                </Link>
              );
            })}
          </nav>
        )}

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Cart Button (desktop) */}
          {/* Cart Button (desktop) */}
          {theme !== "theme2" && (
            <Link to="/cart" className="hidden md:inline-block relative p-2 rounded-full border">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  {totalItems}
                </span>
              )}
            </Link>
          )}


          {/* Theme dropdown */}
          <div className="flex items-center gap-2">
            <motion.div
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative"
            >
              <select
                aria-label="Select theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className={`
                  appearance-none pr-8 pl-4 py-2 rounded-full text-xl outline-none shadow-sm cursor-pointer transition-colors backdrop-blur-sm
                  ${theme === "theme2"
                    ? "bg-gray-700 text-white placeholder-gray-300 focus:ring-white focus:ring-offset-1"
                    : "bg-white text-black focus:ring-black focus:ring-offset-1"
                  }
                `}
              >
                {Object.entries(themeConfig).map(([key, meta]) => (
                  <option key={key} value={key}>
                    {meta.label}
                  </option>
                ))}
              </select>
              {/* custom chevron */}
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>
            <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full text-xs uppercase tracking-wider">
              {currentIcon}
              <span>{currentLabel.replace("Theme ", "")}</span>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-full focus:outline-none"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="md:hidden border-t"
          >
            <div className="flex flex-col px-6 py-4 gap-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`py-2 font-bold rounded text-base transition-colors ${isActive ? "underline decoration-black" : "text-black"
                      }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile Cart Button */}
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="relative flex items-center gap-2 py-2 font-bold text-base"
              >
                <ShoppingCart className="w-6 h-6" />
                Cart
                {totalItems > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile Theme selector */}
              <div className="mt-2">
                <label className="block text-xs mb-1">Select Theme</label>
                <select
                  aria-label="Select theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className={`
                    appearance-none pr-8 pl-4 py-2 rounded-full text-sm outline-none shadow-sm cursor-pointer transition-colors
                    ${theme === "theme2"
                      ? "bg-gray-700 text-white placeholder-gray-300"
                      : "bg-white text-black"
                    }
                    focus:ring-2 focus:ring-offset-1 ${theme === "theme2" ? "focus:ring-white" : "focus:ring-black"
                    }
                  `}
                >
                  {Object.entries(themeConfig).map(([key, meta]) => (
                    <option key={key} value={key}>
                      {meta.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
