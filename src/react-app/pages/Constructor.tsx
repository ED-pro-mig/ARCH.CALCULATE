import ServiceCard from '@/react-app/components/ServiceCard';
import EstimatePanel from '@/react-app/components/EstimatePanel';
import ScrollReveal from '@/react-app/components/ScrollReveal';
import { services } from '@/react-app/data/services';

export default function Constructor() {
  // Group services by category
  const architecturalPackage = services.find(s => s.id === 'architectural-package');
  const architecturalServices = services.filter(s => 
    ['plans', '3d-visualization'].includes(s.id)
  );
  
  const sketchPackage = services.find(s => s.id === 'sketch-package');
  const sketchServices = services.filter(s => 
    ['planning', 'concept'].includes(s.id)
  );

  const designPackage = services.find(s => s.id === 'design-package');
  const designServices = services.filter(s => 
    ['drawings', 'working-docs', 'complectation'].includes(s.id)
  );

  const independentServices = services.filter(s => 
    ['landscaping', 'consultation', 'author-supervision'].includes(s.id)
  );

  return (
    <div className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
        {/* Left column - Constructor */}
        <div className="space-y-10">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground tracking-tight">Услуги и цены</h2>
          </ScrollReveal>

          {/* Architectural Project */}
          <ScrollReveal delay={80}>
            <div className="space-y-5">
              <h3 className="font-heading text-xl font-medium text-foreground">Архитектурное проектирование</h3>
              {architecturalPackage && <ServiceCard service={architecturalPackage} />}
              
              <div className="pl-4 space-y-4 border-l-2 border-border">
                {architecturalServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
                
                {/* Sketch Package (nested under Architectural) */}
                <div className="space-y-3">
                  {sketchPackage && <ServiceCard service={sketchPackage} />}
                  <div className="pl-4 space-y-3 border-l-2 border-border">
                    {sketchServices.map(service => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Design Project */}
          <ScrollReveal delay={160}>
            <div className="space-y-5">
              <h3 className="font-heading text-xl font-medium text-foreground">Дизайн интерьера</h3>
              {designPackage && <ServiceCard service={designPackage} />}
              
              <div className="pl-4 space-y-3 border-l-2 border-border">
                {designServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Independent Services */}
          <ScrollReveal delay={240}>
            <div className="space-y-5">
              <h3 className="font-heading text-xl font-medium text-foreground">Дополнительные услуги</h3>
              <div className="space-y-3">
                {independentServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Right column - Estimate panel */}
        <ScrollReveal delay={120}>
          <EstimatePanel />
        </ScrollReveal>
      </div>
    </div>
  );
}
