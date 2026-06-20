import { cn } from "@/lib/utils";

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  "My details",
  "Profile",
  "Password",
  "Team",
  "Plan",
  "Roles",
  "Notifications",
  "Integrations",
  "API",
];

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex w-max border border-gray-200 rounded-lg">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "shrink-0 px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap",
              i < tabs.length - 1 && "border-r border-gray-200",
              i === 0 && "rounded-l-lg",
              i === tabs.length - 1 && "rounded-r-lg",
              activeTab === tab
                ? "text-gray-900 font-semibold bg-[#F9FAFB]"
                : "text-gray-500 bg-white hover:text-gray-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
