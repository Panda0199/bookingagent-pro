import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useServices } from "../hooks/useServices";
import { useTranslation } from "react-i18next";

const ServicesSection = () => {
  const { data: services, isLoading, error } = useServices();
  const { t } = useTranslation();

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
            {t("nav_services")}
          </p>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("services_title")}
          </h2>

          <p className="text-muted-foreground max-w-md mx-auto">
            {t("services_subtitle")}
          </p>
        </motion.div>

        {isLoading && (
          <p className="text-center text-muted-foreground">
            {t("loading_services")}
          </p>
        )}

        {error && (
          <p className="text-center text-red-500">
            Failed to load services.
          </p>
        )}

        {!isLoading && !error && services?.length === 0 && (
          <p className="text-center text-muted-foreground">
            {t("no_services")}
          </p>
        )}

        {!isLoading && !error && services && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
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
                        €{service.price}
                      </span>
                    </div>

                    <CardTitle className="font-display text-xl">
                      {service.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {service.description ||
                        "Professional spa treatment."}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {service.duration_minutes} {t("duration")}
                      </span>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary"
                      >
                        {t("book_now")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;