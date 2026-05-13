import { createContext } from 'react';
import { CalculatorState } from '@/react-app/types/calculator';
import type { ServiceId } from '@/react-app/types/calculator';

export interface CalculatorContextType extends CalculatorState {
  addService: (id: ServiceId, quantity: number) => void;
  removeService: (id: ServiceId) => void;
  updateQuantity: (id: ServiceId, quantity: number) => void;
  isBlocked: (id: ServiceId) => boolean;
  isSelected: (id: ServiceId) => boolean;
  getTotal: () => number;
  setComplectationBase: (amount: number) => void;
}

export const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);
