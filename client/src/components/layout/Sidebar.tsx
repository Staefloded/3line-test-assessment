import { Search, LogOut } from "lucide-react";
import promoBanner from "@/assets/promo-banner.png";
import { navItems, NavItem } from "./nav-items";

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-60 min-h-screen border-r border-gray-200 bg-white fixed left-0 top-0 bottom-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-violet-700 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white opacity-80" />
        </div>
        <span className="font-semibold text-gray-900 text-sm">Untitled UI</span>
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-violet-300 bg-violet-50 text-sm text-gray-600">
          <Search className="w-4 h-4 text-gray-400" />
          <span className="text-gray-500">Olivia Rhye</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      {/* Promo banner */}
      <div className="mx-3 mb-3 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
        <div className="p-3">
          <p className="text-xs font-semibold text-gray-900 mb-0.5">New features available!</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Check out the new dashboard view. Pages now load faster.
          </p>
        </div>
        <div className="h-20 overflow-hidden">
          <img src={promoBanner} alt="" className="w-full h-full object-cover object-top" />
        </div>
        <div className="flex items-center gap-3 px-3 py-2 border-t border-gray-100">
          <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
            Dismiss
          </button>
          <button className="text-xs text-violet-600 font-medium hover:text-violet-700 transition-colors">
            What&apos;s new?
          </button>
        </div>
      </div>

      {/* User profile */}
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
    </aside>
  );
}
