import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-gold-dark" />
            <span className="font-display text-xl font-bold text-foreground">
              BookingAgent <span className="text-gradient-gold">Pro</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <Link to="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button size="sm">Book Now</Button>
            </Link>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a href="#services" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#about" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <div className="flex gap-2 pt-2">
              <Link to="/login"><Button variant="outline" size="sm">Sign In</Button></Link>
              <Link to="/login"><Button size="sm">Book Now</Button></Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
