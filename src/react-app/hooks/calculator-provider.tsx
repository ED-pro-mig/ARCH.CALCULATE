import { useState, ReactNode, useEffect } from 'react';
import { ServiceId, SelectedService } from '@/react-app/types/calculator';
import { getServiceById } from '@/react-app/data/services';
import { CalculatorContext } from './calculator-context';

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [selectedServices, setSelectedServices] = useState<Map<ServiceId, SelectedService>>(
    () => {
      if (typeof window === 'undefined') return new Map();
      const saved = localStorage.getItem('detkovs-calculator');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          return new Map(Object.entries(data.selectedServices ?? {}));
        } catch {
          return new Map();
        }
      }
      return new Map();
    }
  );

  const [complectationBase, setComplectationBaseState] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem('detkovs-calculator');
    try {
      return saved ? JSON.parse(saved).complectationBase || 0 : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const data = {
      selectedServices: Object.fromEntries(selectedServices),
      complectationBase,
    };
    localStorage.setItem('detkovs-calculator', JSON.stringify(data));
  }, [selectedServices, complectationBase]);

  const isSelected = (id: ServiceId): boolean => {
    return selectedServices.has(id);
  };

  const getPackageDescendants = (packageId: ServiceId): ServiceId[] => {
    const service = getServiceById(packageId);
    if (!service?.isPackage || !service.children) return [];
    const result: ServiceId[] = [];
    for (const childId of service.children) {
      result.push(childId as ServiceId);
      result.push(...getPackageDescendants(childId as ServiceId));
    }
    return result;
  };

  const isBlocked = (id: ServiceId): boolean => {
    for (const serviceId of selectedServices.keys()) {
      const service = getServiceById(serviceId);
      if (!service?.isPackage || !service.children) continue;
      if (getPackageDescendants(serviceId).includes(id)) return true;
    }
    return false;
  };

  const addService = (id: ServiceId, quantity: number) => {
    const service = getServiceById(id);
    if (!service || isBlocked(id)) return;

    const newSelected = new Map(selectedServices);

    if (service.isPackage && service.children) {
      service.children.forEach(childId => {
        newSelected.delete(childId);
      });
    }

    let total = 0;
    if (service.id === 'complectation') {
      total = quantity * 0.1;
      setComplectationBaseState(quantity);
    } else {
      total = service.price * quantity;
    }

    newSelected.set(id, { id, quantity, total });
    setSelectedServices(newSelected);
  };

  const removeService = (id: ServiceId) => {
    const newSelected = new Map(selectedServices);
    newSelected.delete(id);
    setSelectedServices(newSelected);
  };

  const updateQuantity = (id: ServiceId, quantity: number) => {
    const service = getServiceById(id);
    if (!service) return;

    const newSelected = new Map(selectedServices);
    const existing = newSelected.get(id);

    if (existing) {
      let total = 0;
      if (service.id === 'complectation') {
        total = quantity * 0.1;
        setComplectationBaseState(quantity);
      } else {
        total = service.price * quantity;
      }

      newSelected.set(id, { ...existing, quantity, total });
      setSelectedServices(newSelected);
    }
  };

  const getTotal = (): number => {
    let total = 0;
    for (const service of selectedServices.values()) {
      total += service.total;
    }
    return total;
  };

  const setComplectationBase = (amount: number) => {
    setComplectationBaseState(amount);

    if (selectedServices.has('complectation')) {
      const newSelected = new Map(selectedServices);
      const existing = newSelected.get('complectation');
      if (existing) {
        newSelected.set('complectation', {
          ...existing,
          quantity: amount,
          total: amount * 0.1,
        });
        setSelectedServices(newSelected);
      }
    }
  };

  return (
    <CalculatorContext.Provider
      value={{
        selectedServices,
        complectationBase,
        addService,
        removeService,
        updateQuantity,
        isBlocked,
        isSelected,
        getTotal,
        setComplectationBase,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}
