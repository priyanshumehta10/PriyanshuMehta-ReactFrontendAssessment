import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, Phone, ChevronRight, ChevronLeft, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartProvider";

interface SidebarItem {
  name: string;
  to: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
const items: SidebarItem[] = [
  { name: "Home", to: "/", icon: <Home className="w-5 h-5" /> },
  { name: "About", to: "/about", icon: <Info className="w-5 h-5" /> },
  { name: "Contact", to: "/contact", icon: <Phone className="w-5 h-5" /> },
    { name: "Cart", to: "/cart", icon: <ShoppingCart className="w-5 h-5" /> },
];

const Sidebar: React.FC<SidebarProps> = React.memo(({collapsed ,setCollapsed }) => {
  const location = useLocation();
  const [isSmall, setIsSmall] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsSmall(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => {
      mq.removeEventListener?.("change", update);
    };
  }, []);

  useEffect(() => {
    if (isSmall) setCollapsed(true);
  }, [isSmall]);

  return (
    <aside
     className={`
    fixed left-0 top-0 bottom-0 flex flex-col bg-gray-900 text-white h-full p-4 overflow-y-auto
    transition-all duration-300 z-20 flex-shrink-0 mt-8 pt-10
    ${collapsed ? "w-16" : "w-64"}
  `}
    >
      <div
        className={`
          mb-6 flex items-center
          ${collapsed ? "justify-center" : "justify-between"}
        `}
      >
        {!collapsed && <h2 className="text-2xl font-bold">Hipster</h2>}
        {!isSmall && (
          <button
            aria-label="Collapse sidebar"
            onClick={() => setCollapsed((c) => !c)}
            className="p-1 rounded hover:bg-gray-800 focus:outline-none"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <li key={item.name}>
             <Link
  to={item.to}
  aria-current={isActive ? "page" : undefined}
  className={`
    flex items-center gap-3 px-3 py-2 rounded-lg text-xl font-medium transition-all relative
    ${
      isActive
        ? "bg-white text-gray-900 shadow-inner"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }
    ${collapsed ? "justify-center" : ""}
    focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white
  `}
>
  <div className="relative flex-shrink-0">
    {item.icon}
    {(totalItems > 0 && item.name == "Cart") && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {totalItems}
      </span>
    )}
  </div>

  {!collapsed && <span className="flex-1">{item.name}</span>}
</Link>

            </li>
          );
        })}
      </ul>
    </aside>
  );
});

export default Sidebar;
