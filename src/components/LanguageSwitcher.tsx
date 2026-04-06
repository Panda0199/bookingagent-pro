import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => i18n.changeLanguage("en")}
        className="rounded-lg border px-3 py-1 text-sm"
      >
        EN
      </button>
      <button
        onClick={() => i18n.changeLanguage("et")}
        className="rounded-lg border px-3 py-1 text-sm"
      >
        ET
      </button>
    </div>
  );
};

export default LanguageSwitcher;