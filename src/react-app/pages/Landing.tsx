import { useNavigate } from "react-router";
import { Button } from "@/react-app/components/ui/button";
import ScrollReveal from "@/react-app/components/ScrollReveal";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-6 pt-16">
        <div className="text-center space-y-12 max-w-2xl">
          <ScrollReveal>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-tight">
              Архитектура и дизайн интерьера
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed font-body">
              Рассчитайте стоимость проекта от идеи до идеального результата
            </p>
            <p className="text-base text-muted-foreground/90 max-w-lg mx-auto font-body mt-2">
              Проекты любой сложности с индивидуальным подходом и вниманием к деталям
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Button
              onClick={() => navigate("/constructor")}
              size="lg"
              className="mt-4 font-body text-base tracking-wide px-10 py-5 h-auto rounded-full border border-foreground/20 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Рассчитать стоимость
            </Button>
          </ScrollReveal>
        </div>
    </div>
  );
}
