import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

// fallback metadata in case you haven't centralized in ThemeContext yet
const themeConfig: Record<string, { label: string; icon: ReactNode }> = {
  theme1: { label: "Theme 1", icon: <Sun className="w-4 h-4" /> },
  theme2: { label: "Theme 2", icon: <Moon className="w-4 h-4" /> },
  theme3: { label: "Theme 3", icon: <Sun className="w-4 h-4" /> },
};

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // optional: if ThemeContext exposes headerBg and you want to reflect it via inline style
  const currentLabel = themeConfig[theme]?.label ?? theme;
  const currentIcon = themeConfig[theme]?.icon;

  useEffect(() => {
    // let the root reflect current theme for CSS selectors
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header
      className="fixed top-0 w-full z-50 shadow-md"
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
            className="font-extrabold text-xl tracking-wide"
          >
            Hipster
          </motion.div>
        </Link>

        {/* Desktop nav */}
        { theme !== "theme2" &&
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative px-1 py-2 font-medium text-sm transition-colors"
              aria-current={location.pathname === item.to ? "page" : undefined}
            >
              {item.name}
              <span className="absolute left-0 bottom-0 h-0.5 w-full rounded-sm transition-all" />
            </Link>
          ))}
        </nav>}

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Theme dropdown */}
          <div className="relative flex items-center gap-2">
            <motion.div
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative"
            >
              <select
                aria-label="Select theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="appearance-none pr-8 pl-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current  backdrop-blur-sm shadow-sm cursor-pointer"
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
            <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs uppercase tracking-wider">
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
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-2 font-semibold rounded text-base transition-colors"
                  aria-current={location.pathname === item.to ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile theme selector too */}
              <div className="mt-2">
                <label className="block text-xs mb-1">Select Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="w-full rounded px-3 py-2"
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
