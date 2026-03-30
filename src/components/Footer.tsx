import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-gold" />
              <span className="font-display text-lg font-bold">BookingAgent Pro</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Premium spa experiences powered by intelligent booking. Relax — we handle the rest.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#services" className="hover:text-primary-foreground transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li>123 Serenity Blvd, Suite 100</li>
              <li>hello@bookingagentpro.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} BookingAgent Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
