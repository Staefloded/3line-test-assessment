import {
  Home,
  BarChart2,
  Layers,
  CheckSquare,
  FileText,
  Users,
  LifeBuoy,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItemDef {
  icon: React.ElementType;
  label: string;
  badge?: number;
  active?: boolean;
  href?: string;
}

export const navItems: NavItemDef[] = [
  { icon: Home, label: "Home", href: "#" },
  { icon: BarChart2, label: "Dashboard", href: "#", badge: 10 },
  { icon: Layers, label: "Projects", href: "#" },
  { icon: CheckSquare, label: "Tasks", href: "#" },
  { icon: FileText, label: "Reporting", href: "#" },
  { icon: Users, label: "Users", href: "#" },
  { icon: LifeBuoy, label: "Support", href: "#" },
  { icon: Settings, label: "Settings", href: "#", active: true },
];

interface NavItemProps extends NavItemDef {
  onClick?: () => void;
}

export function NavItem({ icon: Icon, label, badge, active, href, onClick }: NavItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
        active ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </a>
  );
}
