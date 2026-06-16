import { useReveal } from '@/hooks/use-reveal';
import BookingCalendar from '@/components/BookingCalendar';
import Icon from '@/components/ui/icon';

const HERO_3D = 'https://cdn.poehali.dev/projects/230d2293-57f8-461e-b891-d63a4444b678/files/828b0d3f-073b-4ca7-a27a-db13a0bf7894.jpg';
const ABOUT_IMG = 'https://cdn.poehali.dev/projects/230d2293-57f8-461e-b891-d63a4444b678/files/39ed86c1-6e34-47a7-92e3-e7e1651b03e9.jpg';
const ROOM_IMG = 'https://cdn.poehali.dev/projects/230d2293-57f8-461e-b891-d63a4444b678/files/69ef26f1-825c-45ba-8142-e09f307694b2.jpg';

const ROOMS = [
  { name: 'Лотос Делюкс', desc: 'Просторный номер с панорамным окном и видом на тихий внутренний сад.', price: '6 900 ₽' },
  { name: 'Сад Дзен', desc: 'Уединение и натуральные материалы. Идеален для спокойного отдыха.', price: '5 400 ₽' },
  { name: 'Панорама', desc: 'Светлый номер на верхнем этаже с видом на город и Волгу.', price: '8 200 ₽' },
];

const AMENITIES = [
  { icon: 'Wifi', label: 'Скоростной Wi-Fi' },
  { icon: 'Car', label: 'Парковка' },
  { icon: 'Coffee', label: 'Завтрак' },
  { icon: 'BellRing', label: 'Трансфер' },
  { icon: 'Wind', label: 'Кондиционер' },
  { icon: 'Sparkles', label: 'Уборка' },
  { icon: 'Bath', label: 'Спа-ванная' },
  { icon: 'Leaf', label: 'Зелёный двор' },
];

const Index = () => {
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
          <a href="#hero" className="font-serif text-xl tracking-luxe">ЛОТОС</a>
          <nav className="hidden gap-9 text-[11px] uppercase tracking-luxe text-muted-foreground md:flex">
            <a href="#about" className="transition-colors hover:text-foreground">О нас</a>
            <a href="#rooms" className="transition-colors hover:text-foreground">Номера</a>
            <a href="#booking" className="transition-colors hover:text-foreground">Брони</a>
            <a href="#location" className="transition-colors hover:text-foreground">Где</a>
            <a href="#contacts" className="transition-colors hover:text-foreground">Контакты</a>
          </nav>
          <a href="#booking" className="border border-foreground px-5 py-2 text-[11px] uppercase tracking-luxe transition-all hover:bg-foreground hover:text-background">
            Забронировать
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={HERO_3D}
            alt="3D Лотос"
            className="h-[88vh] w-auto max-w-none object-contain opacity-90 animate-reveal-in"
            style={{ animationDelay: '0.1s' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10">
          <p className="mb-6 text-[11px] uppercase tracking-luxe text-gold opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Гостевой дом · Волгоград
          </p>
          <h1 className="max-w-2xl font-serif text-5xl font-light leading-[1.05] sm:text-7xl lg:text-8xl opacity-0 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            Тишина<br />в сердце города
          </h1>
          <p className="mt-8 max-w-md font-sans text-base font-light leading-relaxed text-muted-foreground opacity-0 animate-fade-up" style={{ animationDelay: '0.7s' }}>
            Бутик-пространство для тех, кто ценит покой, чистоту линий и внимание к деталям.
          </p>
          <div className="mt-10 opacity-0 animate-fade-up" style={{ animationDelay: '0.9s' }}>
            <a href="#booking" className="group inline-flex items-center gap-3 bg-foreground px-9 py-4 text-xs uppercase tracking-luxe text-background transition-opacity hover:opacity-85">
              Забронировать
              <Icon name="ArrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-28 sm:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="reveal">
            <p className="mb-6 text-[11px] uppercase tracking-luxe text-gold">О нас</p>
            <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl">
              Дом, где время<br />замедляется
            </h2>
            <p className="mt-8 font-sans text-base font-light leading-relaxed text-muted-foreground">
              «Лотос» — это камерный гостевой дом в центре Волгограда, созданный для тех, кто ищет уединение посреди городской жизни. Натуральные материалы, мягкий свет и тишина в каждой комнате.
            </p>
            <p className="mt-4 font-sans text-base font-light leading-relaxed text-muted-foreground">
              Всего несколько номеров — и максимум заботы о каждом госте.
            </p>
          </div>
          <div className="reveal overflow-hidden">
            <img src={ABOUT_IMG} alt="Интерьер" className="h-[520px] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" className="bg-secondary/40 py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="reveal mb-16 text-center">
            <p className="mb-6 text-[11px] uppercase tracking-luxe text-gold">Номера</p>
            <h2 className="font-serif text-4xl font-light sm:text-5xl">Выберите своё пространство</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {ROOMS.map((r, i) => (
              <div key={r.name} className="reveal group bg-card" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="overflow-hidden">
                  <img src={ROOM_IMG} alt={r.name} className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-light">{r.name}</h3>
                  <p className="mt-3 min-h-[60px] font-sans text-sm font-light leading-relaxed text-muted-foreground">{r.desc}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
                    <span className="font-serif text-2xl">{r.price}<span className="text-sm text-muted-foreground"> / ночь</span></span>
                    <a href="#booking" className="text-[11px] uppercase tracking-luxe text-gold transition-opacity hover:opacity-70">Подробнее →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section id="amenities" className="mx-auto max-w-7xl px-6 py-28 sm:px-10">
        <div className="reveal mb-16 text-center">
          <p className="mb-6 text-[11px] uppercase tracking-luxe text-gold">Удобства</p>
          <h2 className="font-serif text-4xl font-light sm:text-5xl">Всё для комфорта</h2>
        </div>
        <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
          {AMENITIES.map((a, i) => (
            <div key={a.label} className="reveal flex flex-col items-center gap-4 bg-background py-12" style={{ transitionDelay: `${i * 60}ms` }}>
              <Icon name={a.icon} size={28} className="text-gold" />
              <span className="text-xs uppercase tracking-luxe text-muted-foreground">{a.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="bg-secondary/40 py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="reveal mb-16 text-center">
            <p className="mb-6 text-[11px] uppercase tracking-luxe text-gold">Бронирование</p>
            <h2 className="font-serif text-4xl font-light sm:text-5xl">Календарь доступности</h2>
            <p className="mx-auto mt-6 max-w-md font-sans text-sm font-light text-muted-foreground">
              Выберите номер и свободные даты — система покажет доступность в реальном времени.
            </p>
          </div>
          <div className="reveal">
            <BookingCalendar />
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="mx-auto max-w-7xl px-6 py-28 sm:px-10">
        <div className="grid items-stretch gap-12 lg:grid-cols-2">
          <div className="reveal flex flex-col justify-center">
            <p className="mb-6 text-[11px] uppercase tracking-luxe text-gold">Расположение</p>
            <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl">В центре Волгограда</h2>
            <div className="mt-10 space-y-6 font-sans text-sm font-light text-muted-foreground">
              <div className="flex items-start gap-4">
                <Icon name="MapPin" size={20} className="mt-0.5 text-gold" />
                <span>г. Волгоград, ул. Мира, 12<br />Центральный район</span>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Clock" size={20} className="mt-0.5 text-gold" />
                <span>Заезд с 14:00 · Выезд до 12:00</span>
              </div>
            </div>
          </div>
          <div className="reveal min-h-[400px] overflow-hidden border border-border">
            <iframe
              title="Карта"
              src="https://yandex.ru/map-widget/v1/?ll=44.516%2C48.708&z=14&pt=44.516%2C48.708"
              className="h-full min-h-[400px] w-full grayscale"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="border-t border-border bg-foreground py-28 text-background">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="reveal">
              <p className="mb-6 text-[11px] uppercase tracking-luxe text-gold">Контакты</p>
              <h2 className="font-serif text-4xl font-light sm:text-5xl">Свяжитесь с нами</h2>
              <div className="mt-10 space-y-5 font-sans text-sm font-light">
                <a href="tel:+78442000000" className="flex items-center gap-4 transition-opacity hover:opacity-70">
                  <Icon name="Phone" size={18} className="text-gold" /> +7 (8442) 00-00-00
                </a>
                <a href="mailto:hello@lotos-vlg.ru" className="flex items-center gap-4 transition-opacity hover:opacity-70">
                  <Icon name="Mail" size={18} className="text-gold" /> hello@lotos-vlg.ru
                </a>
                <a href="https://wa.me/78442000000" className="mt-4 inline-flex items-center gap-3 bg-gold px-7 py-3 text-xs uppercase tracking-luxe text-foreground transition-opacity hover:opacity-85">
                  <Icon name="MessageCircle" size={16} /> WhatsApp
                </a>
              </div>
            </div>
            <form className="reveal space-y-5" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Имя" className="w-full border-b border-background/30 bg-transparent py-3 font-sans text-sm placeholder:text-background/50 focus:border-gold focus:outline-none" />
              <input type="tel" placeholder="Телефон" className="w-full border-b border-background/30 bg-transparent py-3 font-sans text-sm placeholder:text-background/50 focus:border-gold focus:outline-none" />
              <textarea placeholder="Сообщение" rows={3} className="w-full resize-none border-b border-background/30 bg-transparent py-3 font-sans text-sm placeholder:text-background/50 focus:border-gold focus:outline-none" />
              <button type="submit" className="w-full bg-gold py-4 text-xs uppercase tracking-luxe text-foreground transition-opacity hover:opacity-85">
                Отправить заявку
              </button>
            </form>
          </div>
          <div className="mt-20 border-t border-background/15 pt-8 text-center text-[11px] uppercase tracking-luxe text-background/50">
            ЛОТОС · Гостевой дом · Волгоград
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
