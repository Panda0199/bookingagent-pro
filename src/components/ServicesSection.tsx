import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  { title: "Swedish Massage", price: "$120", duration: "60 min", description: "Classic full-body relaxation with long, flowing strokes." },
  { title: "Hot Stone Therapy", price: "$150", duration: "75 min", description: "Heated basalt stones melt away deep muscle tension." },
  { title: "Aromatherapy Facial", price: "$95", duration: "45 min", description: "Revitalizing facial with essential oils and gentle exfoliation." },
  { title: "Deep Tissue Massage", price: "$140", duration: "60 min", description: "Targeted pressure to release chronic muscle knots." },
  { title: "Body Scrub & Wrap", price: "$180", duration: "90 min", description: "Full-body exfoliation followed by a nourishing wrap." },
  { title: "Couples Retreat", price: "$280", duration: "120 min", description: "Side-by-side massages in our private couples suite." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold-dark font-medium tracking-widest uppercase text-sm mb-3">
            What We Offer
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Each treatment is tailored to your needs by our certified therapists.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-gold/50 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Sparkles className="h-5 w-5 text-gold-dark" />
                    <span className="font-display text-2xl font-bold text-primary">
                      {service.price}
                    </span>
                  </div>
                  <CardTitle className="font-display text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {service.duration}
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
