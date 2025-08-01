// components/ThemeSwitchOverlay.tsx
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const themeLabels: Record<string, string> = {
  theme1: "Minimalist Light",
  theme2: "Dark Sidebar",
  theme3: "Colorful Grid",
};

export default function ThemeSwitchOverlay() {
  const { theme } = useContext(ThemeContext);
  const prevThemeRef = useRef<string>(theme);
  const [visible, setVisible] = useState(false);
  const [from, setFrom] = useState<string>(theme);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (theme === prevThemeRef.current) return;

    setFrom(prevThemeRef.current);
    prevThemeRef.current = theme;

    setVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setVisible(false);
      timeoutRef.current = null;
    }, 2200);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [theme]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={theme}
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(10px)",
              background: "rgba(255,255,255,0.15)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <motion.div
            className="relative flex items-center gap-4 px-6 py-3 rounded-full bg-white/90 shadow-xl overflow-hidden"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
          >
            <div className="flex relative w-60 h-8">
              <motion.div
                key={from}
                className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600"
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: -80, opacity: 0 }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
              >
                {themeLabels[from]}
              </motion.div>
              <motion.div
                key={theme}
                className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-zinc-950"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.0, ease: "easeInOut", delay: 0.1 }}
              >
                {themeLabels[theme]}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
