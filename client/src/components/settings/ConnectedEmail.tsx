import { useState } from "react";
import { Mail } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Input } from "@/components/ui/Input";

export function ConnectedEmail() {
  const [selected, setSelected] = useState<"account" | "alternative">("alternative");
  const [altEmail, setAltEmail] = useState("billing@untitledui.com");

  return (
    <div className="py-6 border-b border-gray-200">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        <div className="mb-4 lg:mb-0 lg:w-64 shrink-0">
          <h3 className="text-sm font-medium text-gray-700">Connected email</h3>
          <p className="text-sm text-gray-500 mt-0.5">Select role account</p>
        </div>

        <RadioGroup
          value={selected}
          onValueChange={(v) => setSelected(v as "account" | "alternative")}
          className="flex-1"
        >
          {/* My account email */}
          <label className="flex items-start gap-3 cursor-pointer">
            <RadioGroupItem value="account" className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">My account email</p>
              <p className="text-sm text-gray-500">olivia@untitledui.com</p>
            </div>
          </label>

          {/* Alternative email */}
          <label className="flex items-start gap-3 cursor-pointer">
            <RadioGroupItem value="alternative" className="mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">An alternative email</p>
              {selected === "alternative" && (
                <div className="mt-2 max-w-sm">
                  <Input
                    icon={<Mail className="w-4 h-4" />}
                    type="email"
                    value={altEmail}
                    onChange={(e) => setAltEmail(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Enter alternative email"
                  />
                </div>
              )}
            </div>
          </label>
        </RadioGroup>
      </div>
    </div>
  );
}
