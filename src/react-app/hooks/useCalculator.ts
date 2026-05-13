import { useContext } from 'react';
import { CalculatorContext } from './calculator-context';

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within CalculatorProvider');
  }
  return context;
}
