import { Service } from '@/react-app/types/calculator';

export const services: Service[] = [
  // Architectural Package
  {
    id: 'architectural-package',
    name: 'Архитектурный проект',
    price: 4000,
    unit: '₽/м²',
    isPackage: true,
    requiresInput: true,
    children: ['plans', '3d-visualization', 'sketch-package'],
  },
  {
    id: 'plans',
    name: 'Планы, разрезы, фасады, генплан',
    price: 1500,
    unit: '₽/м²',
    requiresInput: true,
  },
  {
    id: '3d-visualization',
    name: '3D-визуализация',
    price: 1000,
    unit: '₽/м²',
    requiresInput: true,
  },

  // Sketch Package (moved to Architectural Project)
  {
    id: 'sketch-package',
    name: 'Эскизный проект',
    price: 3000,
    unit: '₽/м²',
    isPackage: true,
    requiresInput: true,
    children: ['planning', 'concept'],
  },
  {
    id: 'planning',
    name: 'Планировка',
    price: 1500,
    unit: '₽/м²',
    requiresInput: true,
  },
  {
    id: 'concept',
    name: 'Концепция',
    price: 1500,
    unit: '₽/м²',
    requiresInput: true,
  },

  // Design Package
  {
    id: 'design-package',
    name: 'Дизайн-проект',
    price: 8000,
    unit: '₽/м²',
    isPackage: true,
    requiresInput: true,
    children: ['drawings', 'working-docs', 'complectation'],
  },

  // Design Project Elements
  {
    id: 'drawings',
    name: 'Чертежи (полы, электрика и т.д.)',
    price: 1000,
    unit: '₽/лист',
    requiresInput: true,
  },
  {
    id: 'working-docs',
    name: 'Рабочая документация',
    price: 3000,
    unit: '₽/м²',
    requiresInput: true,
  },
  {
    id: 'complectation',
    name: 'Комплектация',
    price: 10,
    unit: '%',
    requiresInput: true,
  },

  // Independent Services
  {
    id: 'landscaping',
    name: 'Благоустройство территории',
    price: 1500,
    unit: '₽/м²',
    requiresInput: true,
  },
  {
    id: 'consultation',
    name: 'Консультация',
    price: 20000,
    unit: '₽/3 часа',
    requiresInput: true,
  },
  {
    id: 'author-supervision',
    name: 'Авторский надзор',
    price: 35000,
    unit: '₽/месяц',
    requiresInput: true,
  },
];

export function getServiceById(id: string) {
  return services.find(s => s.id === id);
}
