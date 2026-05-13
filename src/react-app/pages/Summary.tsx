import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/react-app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/react-app/components/ui/dialog';
import { Input } from '@/react-app/components/ui/input';
import { Textarea } from '@/react-app/components/ui/textarea';
import { Label } from '@/react-app/components/ui/label';
import { useCalculator } from '@/react-app/hooks/useCalculator';
import { getServiceById } from '@/react-app/data/services';

export default function Summary() {
  const navigate = useNavigate();
  const { selectedServices, getTotal } = useCalculator();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    comment: '',
  });

  const total = getTotal();

  const getUnitLabel = (serviceId: string, quantity: number) => {
    const service = getServiceById(serviceId);
    if (!service) return '';
    
    if (service.unit === '₽/м²') return `${quantity} м²`;
    if (service.unit === '₽/лист') return `${quantity} ${quantity === 1 ? 'лист' : 'листов'}`;
    if (service.id === 'complectation') return '';
    if (service.unit === '₽/3 часа') return `${quantity} ${quantity === 1 ? 'консультация' : 'консультаций'}`;
    if (service.unit === '₽/месяц') return `${quantity} ${quantity === 1 ? 'месяц' : quantity > 1 && quantity < 5 ? 'месяца' : 'месяцев'}`;
    return `${quantity}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare estimate data
    const estimateData = {
      ...formData,
      total,
      services: Array.from(selectedServices.values()).map(s => {
        const service = getServiceById(s.id);
        return {
          name: service?.name,
          quantity: s.quantity,
          total: s.total,
        };
      }),
      timestamp: new Date().toISOString(),
    };

    console.log('Submitting estimate:', estimateData);
    
    // Here you would send to backend
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    setShowModal(false);
    
    // Optionally clear form
    setFormData({ name: '', phone: '', email: '', comment: '' });
  };

  if (selectedServices.size === 0) {
    return (
      <div className="pt-20 px-6 max-w-3xl mx-auto">
          <div className="text-center space-y-8 py-20">
            <h2 className="font-heading text-3xl font-semibold text-foreground">Нет выбранных услуг</h2>
            <p className="text-muted-foreground">Вернитесь в конструктор и выберите услуги</p>
            <Button onClick={() => navigate('/constructor')} size="lg" className="rounded-full font-body">
              Вернуться в конструктор
            </Button>
          </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12 px-6 max-w-3xl mx-auto">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground text-center tracking-tight">Итоговая смета</h2>
          
          {/* Total Amount */}
          <div className="text-center space-y-1">
            <div className="text-sm text-muted-foreground">Итого к оплате:</div>
            <div className="font-heading text-5xl md:text-6xl font-semibold text-foreground">
              {total.toLocaleString('ru-RU')} ₽
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
            <h3 className="font-heading text-lg font-medium text-foreground">Детализация</h3>
            
            <div className="space-y-3">
              {Array.from(selectedServices.values()).map((selected) => {
                const service = getServiceById(selected.id);
                if (!service) return null;
                
                return (
                  <div
                    key={selected.id}
                    className="flex justify-between items-start gap-4 py-2 border-b border-border last:border-0"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{service.name}</div>
                      {selected.quantity > 0 && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {getUnitLabel(selected.id, selected.quantity)}
                        </div>
                      )}
                    </div>
                    <div className="font-semibold text-foreground whitespace-nowrap">
                      {selected.total.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-muted/40 rounded-xl p-5 text-center border border-border/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Это предварительный расчёт. Для точной цены свяжитесь с нами или оставьте заявку.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => setShowModal(true)}
              size="lg"
              className="flex-1 rounded-full border border-foreground/20 bg-foreground text-background hover:bg-foreground/90 font-body tracking-wide"
            >
              Оставить заявку
            </Button>
            <Button
              onClick={() => navigate('/constructor')}
              variant="outline"
              size="lg"
              className="flex-1 rounded-full border-border font-body"
            >
              Вернуться в конструктор
            </Button>
          </div>
        </div>

      {/* Modal Form */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl font-semibold">Оставить заявку</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Введите ваше имя"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (___) ___-__-__"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Комментарий</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Расскажите подробнее о вашем проекте..."
                rows={4}
              />
            </div>

            <div className="bg-muted/50 rounded p-3 text-sm text-muted-foreground">
              Ваш расчет будет прикреплен автоматически
            </div>

            <Button type="submit" className="w-full rounded-full border border-foreground/20 bg-foreground text-background hover:bg-foreground/90 font-body" size="lg">
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
