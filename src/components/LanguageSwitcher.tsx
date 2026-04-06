import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const isActive = (lang: string) =>
    i18n.language === lang
      ? "bg-green-700"
      : "bg-green-600 hover:bg-green-700";

  return (
    <div className="flex gap-2">
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={`rounded-lg text-white px-3 py-1 text-sm transition ${isActive("en")}`}
      >
        EN
      </button>

      <button
        onClick={() => i18n.changeLanguage("et")}
        className={`rounded-lg text-white px-3 py-1 text-sm transition ${isActive("et")}`}
      >
        ET
      </button>
    </div>
  );
};

export default LanguageSwitcher;