import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav_home: "Home",
      nav_services: "Services",
      nav_login: "Login",

      hero_title: "Relax, Refresh, Rebook with Ease",
      hero_text:
        "Professional spa treatments with an AI assistant ready to help you check services and book your next appointment.",
      hero_button: "Explore Services",

      services_title: "Our Services",
      services_subtitle:
        "Each treatment is tailored to your needs by our certified therapists.",
      loading_services: "Loading services...",
      no_services: "No services available right now.",
      price: "Price",
      duration: "Duration",
      book_now: "Book Now",

      login_title: "Welcome back",
      login_desc: "Sign in to manage your appointments",
      email: "Email",
      password: "Password",
      sign_in: "Sign In",
      signing_in: "Signing in...",

      dashboard_title: "BookingAgent Pro Dashboard",
      dashboard_desc: "Manage services, settings, and bookings",
      logout: "Logout",

      footer:
        "Built in AI Web Session 2026, BookingAgent Pro, Student:",
      team: "Team:",
    },
  },
  et: {
    translation: {
      nav_home: "Avaleht",
      nav_services: "Teenused",
      nav_login: "Logi sisse",

      hero_title: "Lõõgastu, värskendu ja broneeri lihtsalt",
      hero_text:
        "Professionaalsed spaahooldused koos AI-assistendiga, kes aitab teenuseid vaadata ja aega broneerida.",
      hero_button: "Vaata teenuseid",

      services_title: "Meie teenused",
      services_subtitle:
        "Iga hooldus kohandatakse vastavalt sinu vajadustele.",
      loading_services: "Teenuste laadimine...",
      no_services: "Praegu pole teenuseid saadaval.",
      price: "Hind",
      duration: "Kestus",
      book_now: "Broneeri",

      login_title: "Tere tulemast tagasi",
      login_desc: "Logi sisse, et hallata broneeringuid",
      email: "E-post",
      password: "Parool",
      sign_in: "Logi sisse",
      signing_in: "Sisselogimine...",

      dashboard_title: "BookingAgent Pro juhtpaneel",
      dashboard_desc: "Halda teenuseid, seadeid ja broneeringuid",
      logout: "Logi välja",

      footer:
        "Built in AI Web Session 2026, BookingAgent Pro, Student:",
      team: "Team:",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;