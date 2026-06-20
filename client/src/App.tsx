import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { MobileHeader } from "./components/layout/MobileHeader";
import { SettingsTabs } from "./components/settings/SettingsTabs";
import { RolesPage } from "./components/settings/RolesPage";

interface PlaceholderTabProps {
  name: string;
}

function PlaceholderTab({ name }: PlaceholderTabProps) {
  return (
    <div className="py-12 text-center text-gray-400 text-sm">{name} settings coming soon.</div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Roles");

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex-1 min-w-0 lg:ml-60 flex flex-col min-h-screen bg-[#F9FAFB]">
        <MobileHeader />

        <main className="flex-1 px-4 lg:px-8 py-6 w-full">
          <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="mt-6">
            {activeTab === "Roles" ? <RolesPage /> : <PlaceholderTab name={activeTab} />}
          </div>
        </main>
      </div>
    </div>
  );
}
