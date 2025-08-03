// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Cart from "./pages/Cart";
import ThemeSwitchOverlay from "./components/ThemeSwitchOverlay";
import { CartProvider } from "./context/CartProvider";

function InnerRoutes() {
  const { theme } = useContext(ThemeContext);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <CartProvider>
    <ThemeProvider>
      <Router>
        <Header />
        <ThemeSwitchOverlay />

        <div className="pt-16 p-4 min-h-screen">
          <InnerRoutes />
        </div>
      </Router>
    </ThemeProvider>
    </CartProvider>
  );
}

export default App;
