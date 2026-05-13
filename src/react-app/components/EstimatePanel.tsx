import { useNavigate } from 'react-router';
import { Button } from '@/react-app/components/ui/button';
import { useCalculator } from '@/react-app/hooks/useCalculator';
import { getServiceById } from '@/react-app/data/services';
import { cn } from '@/react-app/lib/utils';

export default function EstimatePanel() {
  const navigate = useNavigate();
  const { selectedServices, getTotal } = useCalculator();
  const total = getTotal();

  const handleNavigate = () => {
    if (total > 0) {
      navigate('/summary');
    }
  };

  const getUnitLabel = (serviceId: string, quantity: number) => {
    const service = getServiceById(serviceId);
    if (!service) return '';
    
    if (service.unit === '₽/м²') return `${quantity} м²`;
    if (service.unit === '₽/лист') return `${quantity} листов`;
    if (service.id === 'complectation') return '';
    return `${quantity}`;
  };

  return (
    <div className="lg:sticky lg:top-20 h-fit">
      <div className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-sm">
        <h3 className="font-heading text-xl font-medium text-foreground">Ваша смета</h3>
        
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Итого к оплате:</div>
          <div className="font-heading text-3xl font-semibold text-foreground">
            {total.toLocaleString('ru-RU')} ₽
          </div>
        </div>
        
        <div className="border-t border-border pt-4 space-y-3">
          <div className="text-sm font-medium text-foreground">Детализация:</div>
          
          {selectedServices.size === 0 ? (
            <div className="text-sm text-muted-foreground">Услуги не выбраны</div>
          ) : (
            <div className="space-y-2">
              {Array.from(selectedServices.values()).map((selected) => {
                const service = getServiceById(selected.id);
                if (!service) return null;
                
                return (
                  <div
                    key={selected.id}
                    className={cn(
                      'text-sm p-2 rounded transition-colors',
                      'hover:bg-muted/40 cursor-default'
                    )}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{service.name}</div>
                        {selected.quantity > 0 && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {getUnitLabel(selected.id, selected.quantity)}
                          </div>
                        )}
                      </div>
                      <div className="font-medium text-foreground whitespace-nowrap">
                        {selected.total.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Button
          onClick={handleNavigate}
          disabled={total === 0}
          className="w-full rounded-full border border-foreground/20 bg-foreground text-background hover:bg-foreground/90 font-body tracking-wide"
          size="lg"
        >
          Перейти к итогу
        </Button>
      </div>
    </div>
  );
}
