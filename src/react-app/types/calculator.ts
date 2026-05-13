export type ServiceId = 
  | 'architectural-package'
  | 'plans'
  | '3d-visualization'
  | 'landscaping'
  | 'design-package'
  | 'sketch-package'
  | 'planning'
  | 'concept'
  | 'drawings'
  | 'working-docs'
  | 'complectation'
  | 'consultation'
  | 'author-supervision';

export interface Service {
  id: ServiceId;
  name: string;
  price: number;
  unit: '₽/м²' | '₽/лист' | '₽/3 часа' | '₽/месяц' | '%';
  isPackage?: boolean;
  children?: ServiceId[];
  requiresInput?: boolean;
}

export interface SelectedService {
  id: ServiceId;
  quantity: number;
  total: number;
}

export interface CalculatorState {
  selectedServices: Map<ServiceId, SelectedService>;
  complectationBase: number;
}
