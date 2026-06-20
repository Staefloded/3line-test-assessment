import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { navItems, NavItem } from "./nav-items";

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-violet-700 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white opacity-80" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">Untitled UI</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-violet-700 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white opacity-80" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Untitled UI</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
              {navItems.map((item) => (
                <NavItem key={item.label} {...item} onClick={() => setOpen(false)} />
              ))}
            </nav>
            <div className="flex items-center gap-3 px-4 py-4 border-t border-gray-100">
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-violet-700">OR</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Olivia Rhye</p>
                <p className="text-xs text-gray-500 truncate">olivia@untitledui.com</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
