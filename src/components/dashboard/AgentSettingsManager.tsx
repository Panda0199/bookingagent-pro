import { useEffect, useState } from "react";
import {
  useAgentSettings,
  useUpdateAgentSettings,
} from "@/hooks/useAgentSettings";

const AgentSettingsManager = () => {
  const { data, isLoading, error } = useAgentSettings();
  const updateMutation = useUpdateAgentSettings();

  const [businessName, setBusinessName] = useState("");
  const [businessNiche, setBusinessNiche] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [bookingMode, setBookingMode] = useState("full_booking");
  const [faqContent, setFaqContent] = useState("");
  const [localeDefault, setLocaleDefault] = useState("en");
  const [secondLanguage, setSecondLanguage] = useState("et");

  useEffect(() => {
    if (data) {
      setBusinessName(data.business_name || "");
      setBusinessNiche(data.business_niche || "");
      setSystemPrompt(data.system_prompt || "");
      setBookingMode(data.booking_mode || "full_booking");
      setFaqContent(data.faq_content || "");
      setLocaleDefault(data.locale_default || "en");
      setSecondLanguage(data.second_language || "et");
    }
  }, [data]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.id) return;

    await updateMutation.mutateAsync({
      id: data.id,
      data: {
        business_name: businessName,
        business_niche: businessNiche,
        system_prompt: systemPrompt,
        booking_mode: bookingMode,
        faq_content: faqContent,
        locale_default: localeDefault,
        second_language: secondLanguage,
      },
    });
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-2">Agent Settings</h2>
      <p className="text-gray-600 mb-6">
        Control the AI assistant’s tone, behavior, and business information.
      </p>

      {isLoading && <p>Loading settings...</p>}
      {error && <p className="text-red-500">Failed to load settings.</p>}

      {!isLoading && !error && data && (
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Business Name
            </label>
            <input
              type="text"
              className="w-full rounded-xl border px-4 py-3"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Business Niche
            </label>
            <input
              type="text"
              className="w-full rounded-xl border px-4 py-3"
              value={businessNiche}
              onChange={(e) => setBusinessNiche(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Booking Mode
            </label>
            <select
              className="w-full rounded-xl border px-4 py-3"
              value={bookingMode}
              onChange={(e) => setBookingMode(e.target.value)}
            >
              <option value="information_only">Information Only</option>
              <option value="full_booking">Full Booking</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              System Prompt
            </label>
            <textarea
              className="w-full rounded-xl border px-4 py-3 min-h-[180px]"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              FAQ / Business Info
            </label>
            <textarea
              className="w-full rounded-xl border px-4 py-3 min-h-[140px]"
              value={faqContent}
              onChange={(e) => setFaqContent(e.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">
                Default Language
              </label>
              <select
                className="w-full rounded-xl border px-4 py-3"
                value={localeDefault}
                onChange={(e) => setLocaleDefault(e.target.value)}
              >
                <option value="en">English</option>
                <option value="et">Estonian</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Second Language
              </label>
              <select
                className="w-full rounded-xl border px-4 py-3"
                value={secondLanguage}
                onChange={(e) => setSecondLanguage(e.target.value)}
              >
                <option value="et">Estonian</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="rounded-xl bg-black text-white px-5 py-3"
          >
            {updateMutation.isPending ? "Saving..." : "Save Settings"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AgentSettingsManager;