import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Checkbox } from '@/react-app/components/ui/checkbox';
import { Input } from '@/react-app/components/ui/input';
import { Button } from '@/react-app/components/ui/button';
import { Service } from '@/react-app/types/calculator';
import { useCalculator } from '@/react-app/hooks/useCalculator';
import { cn } from '@/react-app/lib/utils';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { addService, removeService, isBlocked, isSelected, selectedServices } = useCalculator();
  const selectedData = selectedServices.get(service.id);
  
  // Track if checkbox is checked (separate from being in selected services)
  const [isChecked, setIsChecked] = useState(false);
  const [quantity, setQuantity] = useState<string>('');
  
  const blocked = isBlocked(service.id);
  const selected = isSelected(service.id);

  // Sync checkbox state with selected state
  useEffect(() => {
    setIsChecked(selected);
    if (selected && selectedData) {
      setQuantity(selectedData.quantity.toString());
    } else if (!selected) {
      setQuantity('');
    }
  }, [selected, selectedData]);

  const handleCheckboxChange = (checked: boolean) => {
    if (blocked) return;
    
    setIsChecked(checked);
    
    if (!checked) {
      // Unchecking - remove from services and clear quantity
      removeService(service.id);
      setQuantity('');
    } else if (!service.requiresInput) {
      // Services without input add immediately with quantity 1
      addService(service.id, 1);
    }
    // For services with input, just check the box and show the input field
  };

  const handleAdd = () => {
    const qty = service.id === 'complectation' ? parseFloat(quantity) : parseInt(quantity, 10);
    if (!isNaN(qty) && qty > 0) {
      addService(service.id, qty);
    }
  };

  const getUnitLabel = () => {
    if (service.unit === '₽/м²') return 'м²';
    if (service.unit === '₽/лист') return 'листов';
    if (service.unit === '₽/3 часа') return 'консультаций';
    if (service.unit === '₽/месяц') return 'месяцев';
    if (service.id === 'complectation') return '₽ (сумма для расчета)';
    return '';
  };

  const showInputField = service.requiresInput && isChecked && !blocked;

  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl p-5 shadow-sm transition-all duration-300',
        !blocked && 'hover:shadow-md hover:border-foreground/10',
        blocked && 'opacity-60 cursor-not-allowed',
        selected && !blocked && 'ring-1 ring-foreground/15 bg-muted/30'
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isChecked}
          onCheckedChange={handleCheckboxChange}
          disabled={blocked}
          className="mt-1"
        />
        
        <div className="flex-1 space-y-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className={cn(
                'font-medium text-foreground',
                blocked && 'text-muted-foreground'
              )}>
                {service.name}
              </h3>
              {selected && !blocked && (
                <Check className="w-4 h-4 text-accent" />
              )}
            </div>
            
            <div className={cn(
              'text-sm mt-1',
              blocked ? 'text-muted-foreground' : 'text-muted-foreground'
            )}>
              {service.id === 'complectation' 
                ? `Цена: ${service.price}% от сметы`
                : `Цена: ${service.price.toLocaleString('ru-RU')} ${service.unit}`
              }
            </div>
          </div>

          {showInputField && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="1"
                  step={service.id === 'complectation' ? '1' : '1'}
                  placeholder={service.id === 'complectation' ? 'Введите сумму' : `кол-во ${getUnitLabel()}`}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="flex-1"
                  disabled={blocked}
                />
                <span className="text-sm text-muted-foreground self-center whitespace-nowrap">
                  {getUnitLabel()}
                </span>
              </div>
              
              <Button
                onClick={handleAdd}
                disabled={!quantity || isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0}
                size="sm"
                className="w-full"
              >
                {selectedData ? 'Обновить' : 'Добавить'}
              </Button>
            </div>
          )}

          {selectedData && (
            <div className="text-sm text-muted-foreground">
              {service.id === 'complectation' 
                ? `Сумма: ${selectedData.quantity.toLocaleString('ru-RU')} ₽`
                : `Количество: ${selectedData.quantity} ${getUnitLabel()}`
              }
              {' • '}
              <span className="font-medium text-foreground">
                {selectedData.total.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
