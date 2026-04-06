import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Language Switcher */}
      <div className="absolute top-24 right-6 z-50">
        <LanguageSwitcher />
      </div>

      <Navbar />
      <HeroSection />
      <ServicesSection />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;