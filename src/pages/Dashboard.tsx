import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { signOutUser } from "@/lib/auth";

import ServicesManager from "@/components/dashboard/ServicesManager";
import AgentSettingsManager from "@/components/dashboard/AgentSettingsManager";
import BookingsManager from "@/components/dashboard/BookingsManager";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await signOutUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {t("dashboard_title")}
            </h1>

            <p className="text-gray-600">
              {t("dashboard_desc")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <button
              onClick={handleLogout}
              className="rounded-xl bg-black text-white px-4 py-2"
            >
              {t("logout")}
            </button>
          </div>
        </div>

        <div className="grid gap-8">
          <ServicesManager />
          <AgentSettingsManager />
          <BookingsManager />
        </div>

        <footer className="py-8 text-sm text-center mt-10 border-t">
          {t("footer")} {import.meta.env.VITE_STUDENT_NAME},{" "}
          {t("team")} {import.meta.env.VITE_TEAM_SLUG}
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;