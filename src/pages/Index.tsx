import { useReveal } from '@/hooks/use-reveal';
import BookingCalendar from '@/components/BookingCalendar';
import Icon from '@/components/ui/icon';
import { useEffect, useRef, useState } from 'react';

const HERO_IMG = 'https://cdn.poehali.dev/projects/230d2293-57f8-461e-b891-d63a4444b678/bucket/90dc3204-e47e-49cf-a3a1-47371bf34314.png';
const ABOUT_IMG = 'https://cdn.poehali.dev/projects/230d2293-57f8-461e-b891-d63a4444b678/bucket/15454d2d-4b2e-4440-9bc6-88e0ee9375ba.png';
const DAY_IMG = 'https://cdn.poehali.dev/projects/230d2293-57f8-461e-b891-d63a4444b678/bucket/6ff3cc90-6424-4020-a024-ae7115c4c571.png';
const FOOD_IMG = 'https://cdn.poehali.dev/projects/230d2293-57f8-461e-b891-d63a4444b678/bucket/5f4d7775-581d-4f9f-8920-4ce3a7405e47.png';
const ISLAND_IMG = 'https://cdn.poehali.dev/projects/230d2293-57f8-461e-b891-d63a4444b678/files/fcc198a3-33c9-40a7-af53-0bc6cd216562.jpg';
const VERANDAH_IMG = 'https://cdn.poehali.dev/projects/230d2293-57f8-461e-b891-d63a4444b678/bucket/780ed35d-6087-4dc3-b0d3-c29a5bd2995c.png';

const ROOMS = [
  { name: 'Мансарда', img: HERO_IMG, desc: 'Уютный номер под скатной крышей с панорамным окном и видом на сад.', price: '4 900 ₽' },
  { name: 'Веранда', img: ABOUT_IMG, desc: 'Комната с выходом на тёплую веранду с гирляндами и зоной отдыха.', price: '5 800 ₽' },
  { name: 'Семейный', img: DAY_IMG, desc: 'Просторный номер для компании или семьи рядом с общей беседкой.', price: '6 700 ₽' },
];

const AMENITIES = [
  { icon: 'Wifi', label: 'Wi-Fi' },
  { icon: 'Car', label: 'Парковка' },
  { icon: 'Flame', label: 'Мангал' },
  { icon: 'TreePine', label: 'Беседка' },
  { icon: 'Wind', label: 'Кондиционер' },
  { icon: 'UtensilsCrossed', label: 'Кухня' },
  { icon: 'Sparkles', label: 'Уборка' },
  { icon: 'Lightbulb', label: 'Терраса' },
];

const STATS = [
  { value: '8+', label: 'лет принимаем гостей' },
  { value: '200+', label: 'довольных семей' },
  { value: '3', label: 'уютных номера' },
  { value: '5★', label: 'средний рейтинг' },
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 5 + (i * 5.5) % 90,
  size: 2 + (i * 1.3) % 4,
  duration: 7 + (i * 1.1) % 9,
  delay: (i * 0.7) % 8,
  opacity: 0.15 + (i * 0.02) % 0.3,
}));

function useParallax(factor = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * factor;
      const img = el.querySelector('.parallax-img') as HTMLElement;
      if (img) img.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [factor]);
  return ref;
}

function Counter({ target }: { target: string }) {
  const [val, setVal] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const num = parseInt(target.replace(/\D/g, ''), 10);
      if (!num) { setVal(target); return; }
      const suffix = target.replace(/[\d]/g, '');
      let start = 0;
      const step = Math.ceil(num / 40);
      const timer = setInterval(() => {
        start += step;
        if (start >= num) { setVal(target); clearInterval(timer); }
        else setVal(start + suffix);
      }, 40);
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}</span>;
}

const Index = () => {
  useReveal();
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxAbout = useParallax(0.25);
  const parallaxGastro = useParallax(0.2);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const img = heroRef.current?.querySelector('.hero-bg') as HTMLElement;
      if (img) img.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAV */}
      <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
          <a href="#hero" className="font-serif text-2xl tracking-luxe">ОЛИМП</a>
          <nav className="hidden gap-9 text-[11px] uppercase tracking-luxe text-muted-foreground md:flex">
            {['#about|О нас','#rooms|Номера','#booking|Брони','#location|Где','#contacts|Контакты'].map(item => {
              const [href, label] = item.split('|');
              return <a key={href} href={href} className="transition-colors hover:text-foreground">{label}</a>;
            })}
          </nav>
          <div className="flex items-center gap-4">
            <a href="#booking" className="hidden border border-foreground px-5 py-2 text-[11px] uppercase tracking-luxe transition-all hover:bg-foreground hover:text-background sm:block">
              Забронировать
            </a>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-6 flex flex-col gap-5 text-sm uppercase tracking-luxe">
            {['#about|О нас','#rooms|Номера','#booking|Брони','#location|Где','#contacts|Контакты'].map(item => {
              const [href, label] = item.split('|');
              return <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">{label}</a>;
            })}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" ref={heroRef} className="relative flex min-h-screen items-end overflow-hidden">
        <img src={HERO_IMG} alt="Гостевой дом Олимп" className="hero-bg absolute inset-0 h-[130%] w-full object-cover origin-top will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/15" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {PARTICLES.map(p => (
            <div key={p.id} className="absolute rounded-full bg-gold" style={{
              left: `${p.x}%`, bottom: '-20px',
              width: p.size, height: p.size, opacity: p.opacity,
              animation: `heroFloat ${p.duration}s ${p.delay}s ease-in-out infinite`,
            }} />
          ))}
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 sm:px-10">
          <div className="mb-8 flex items-center gap-3 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="h-px w-12 bg-gold" />
            <p className="text-[11px] uppercase tracking-luxe text-gold">Гостевой дом · Волгоградская область</p>
          </div>
          <h1 className="max-w-3xl font-serif text-5xl font-light leading-[1.05] text-white sm:text-7xl lg:text-[88px] opacity-0 animate-fade-up" style={{ animationDelay: '0.45s' }}>
            Дом тепла<br />и гостеприимства
          </h1>
          <p className="mt-8 max-w-md font-sans text-base font-light leading-relaxed text-white/80 opacity-0 animate-fade-up" style={{ animationDelay: '0.65s' }}>
            Уютный гостевой дом на острове Крит — с тёплой верандой, мангалом и душевной атмосферой для отдыха в любое время года.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.85s' }}>
            <a href="#booking" className="group inline-flex items-center gap-3 bg-gold px-9 py-4 text-xs uppercase tracking-luxe text-foreground transition-all hover:opacity-90">
              Забронировать
              <Icon name="ArrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#about" className="inline-flex items-center gap-3 border border-white/40 px-9 py-4 text-xs uppercase tracking-luxe text-white/90 transition-all hover:border-white hover:text-white">
              Узнать больше
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-up" style={{ animationDelay: '1.3s' }}>
          <span className="text-[10px] uppercase tracking-luxe text-white/40">Листать</span>
          <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border bg-foreground py-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className="reveal text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="font-serif text-4xl font-light text-gold sm:text-5xl">
                  <Counter target={s.value} />
                </div>
                <p className="mt-2 text-[11px] uppercase tracking-luxe text-background/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={parallaxAbout} className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10 overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-gold/8" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[280px] w-[280px] rounded-full border border-gold/6" />
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="reveal">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-gold" />
              <p className="text-[11px] uppercase tracking-luxe text-gold">О нас</p>
            </div>
            <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl">
              Уют, который<br />хочется вернуться
            </h2>
            <p className="mt-8 font-sans text-base font-light leading-relaxed text-muted-foreground">
              «Олимп» — тёплый гостевой дом на живописном острове Крит в Среднеахтубинском районе. Деревянная веранда, уютные гирлянды и большой стол, за которым собираются гости.
            </p>
            <p className="mt-4 font-sans text-base font-light leading-relaxed text-muted-foreground">
              Мангал, беседка, зелёный двор — всё, чтобы отдых был настоящим.
            </p>
            <div className="mt-10 flex gap-6">
              <div className="border-l-2 border-gold pl-4">
                <p className="font-serif text-2xl">Природа</p>
                <p className="text-xs text-muted-foreground mt-1">остров среди воды</p>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <p className="font-serif text-2xl">Тишина</p>
                <p className="text-xs text-muted-foreground mt-1">вдали от суеты</p>
              </div>
            </div>
          </div>
          <div className="reveal relative overflow-hidden" style={{ height: '560px' }}>
            <img src={ABOUT_IMG} alt="Веранда" className="parallax-img absolute inset-0 h-[130%] w-full object-cover will-change-transform" style={{ top: '-15%' }} />
            <div className="absolute -bottom-4 -right-4 h-40 w-40 border-2 border-gold/25 pointer-events-none" />
            <div className="absolute -top-4 -left-4 h-20 w-20 border-2 border-gold/15 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ISLAND BANNER */}
      <section className="relative overflow-hidden" style={{ height: '460px' }}>
        <img src={ISLAND_IMG} alt="Остров Крит" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
        <div className="reveal relative flex h-full flex-col justify-center px-6 sm:px-16 max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-gold" />
            <p className="text-[11px] uppercase tracking-luxe text-gold">Остров Крит · Волгоградская обл.</p>
          </div>
          <h2 className="font-serif text-4xl font-light text-white sm:text-5xl leading-tight">
            Природа<br />у самой воды
          </h2>
          <p className="mt-6 font-sans text-sm font-light leading-relaxed text-white/80 max-w-sm">
            Среднеахтубинский район — край пойменных лесов, рыбалки и чистого воздуха. Мы в самом сердце этих мест.
          </p>
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" className="relative bg-secondary/40 py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.025]">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="absolute h-px w-full bg-foreground" style={{ top: `${i * 90 + 40}px` }} />
          ))}
        </div>
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
          <div className="reveal mb-16 text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gold" />
              <p className="text-[11px] uppercase tracking-luxe text-gold">Номера</p>
              <div className="h-px w-12 bg-gold" />
            </div>
            <h2 className="font-serif text-4xl font-light sm:text-5xl">Выберите своё пространство</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {ROOMS.map((r, i) => (
              <div key={r.name} className="reveal group bg-card shadow-sm transition-shadow duration-500 hover:shadow-xl" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="overflow-hidden relative">
                  <img src={r.img} alt={r.name} className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-white text-xs uppercase tracking-luxe">{r.price} / ночь</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-light">{r.name}</h3>
                  <p className="mt-3 min-h-[60px] font-sans text-sm font-light leading-relaxed text-muted-foreground">{r.desc}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
                    <span className="font-serif text-2xl">{r.price}<span className="text-sm text-muted-foreground"> / ночь</span></span>
                    <a href="#booking" className="flex items-center gap-1 text-[11px] uppercase tracking-luxe text-gold transition-all hover:opacity-70 hover:gap-2">
                      Подробнее <Icon name="ArrowRight" size={12} />
                    </a>
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
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold" />
            <p className="text-[11px] uppercase tracking-luxe text-gold">Удобства</p>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="font-serif text-4xl font-light sm:text-5xl">Всё для комфорта</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {AMENITIES.map((a, i) => (
            <div key={a.label} className="reveal group relative overflow-hidden bg-card p-8 text-center transition-all duration-500 hover:shadow-md border border-border -mt-px -ml-px" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/6 transition-colors duration-500" />
              <Icon name={a.icon} size={30} className="text-gold mb-4 mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" />
              <span className="text-xs uppercase tracking-luxe text-muted-foreground">{a.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* GASTRO */}
      <section ref={parallaxGastro} className="relative overflow-hidden" style={{ height: '560px' }}>
        <img src={FOOD_IMG} alt="Угощения" className="parallax-img absolute inset-0 h-[130%] w-full object-cover will-change-transform" style={{ top: '-15%' }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="reveal relative flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold" />
            <p className="text-[11px] uppercase tracking-luxe text-gold">Гостеприимство</p>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="font-serif text-4xl font-light text-white sm:text-5xl max-w-2xl leading-tight">Стол, за которым тепло</h2>
          <p className="mx-auto mt-6 max-w-md font-sans text-base font-light leading-relaxed text-white/85">
            Шашлык на мангале, домашние закуски и большой стол на веранде — атмосфера настоящего застолья.
          </p>
          <a href="#booking" className="mt-10 inline-flex items-center gap-3 border border-gold/60 px-8 py-3 text-xs uppercase tracking-luxe text-gold transition-all hover:bg-gold hover:text-foreground">
            Забронировать
          </a>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="relative py-28 overflow-hidden">
        <img src={VERANDAH_IMG} alt="Веранда" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/68" />
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-gold/8 blur-3xl" />
        <div className="pointer-events-none absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-gold/6 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
          <div className="reveal mb-16 text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gold" />
              <p className="text-[11px] uppercase tracking-luxe text-gold">Бронирование</p>
              <div className="h-px w-12 bg-gold" />
            </div>
            <h2 className="font-serif text-4xl font-light text-white sm:text-5xl">Календарь доступности</h2>
            <p className="mx-auto mt-6 max-w-md font-sans text-sm font-light text-white/70">
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
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-gold" />
              <p className="text-[11px] uppercase tracking-luxe text-gold">Расположение</p>
            </div>
            <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl">
              Остров Крит,<br />Волгоградская обл.
            </h2>
            <div className="mt-10 space-y-6 font-sans text-sm font-light text-muted-foreground">
              <div className="flex items-start gap-4 group">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 text-gold transition-all group-hover:bg-gold group-hover:text-foreground">
                  <Icon name="MapPin" size={16} />
                </div>
                <div>
                  <p className="font-medium text-foreground">Волгоградская область</p>
                  <p>Среднеахтубинский район, остров Крит</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 text-gold transition-all group-hover:bg-gold group-hover:text-foreground">
                  <Icon name="Clock" size={16} />
                </div>
                <div>
                  <p className="font-medium text-foreground">Заезд / выезд</p>
                  <p>Заезд с 14:00 · Выезд до 12:00</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 text-gold transition-all group-hover:bg-gold group-hover:text-foreground">
                  <Icon name="Navigation" size={16} />
                </div>
                <div>
                  <p className="font-medium text-foreground">Как добраться</p>
                  <p>~40 км от Волгограда, навигатор: Среднеахтубинский р-н, остров Крит</p>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal min-h-[440px] overflow-hidden border border-border relative group">
            <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/20 transition-all duration-700 z-10 pointer-events-none" />
            <iframe
              title="Карта"
              src="https://yandex.ru/map-widget/v1/?ll=44.89%2C48.72&z=12&pt=44.89%2C48.72"
              className="h-full min-h-[440px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="relative border-t border-border bg-foreground py-28 text-background overflow-hidden">
        <div className="pointer-events-none absolute left-1/4 top-0 h-[300px] w-[300px] rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 bottom-0 h-[200px] w-[200px] rounded-full bg-gold/8 blur-2xl" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="reveal">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-gold" />
                <p className="text-[11px] uppercase tracking-luxe text-gold">Контакты</p>
              </div>
              <h2 className="font-serif text-4xl font-light sm:text-5xl">Свяжитесь с нами</h2>
              <div className="mt-10 space-y-5 font-sans text-sm font-light">
                <a href="tel:+78442000000" className="group flex items-center gap-4 transition-opacity hover:opacity-75">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 text-gold transition-all group-hover:bg-gold group-hover:text-foreground">
                    <Icon name="Phone" size={16} />
                  </div>
                  +7 (8442) 00-00-00
                </a>
                <a href="mailto:hello@olimp-vlg.ru" className="group flex items-center gap-4 transition-opacity hover:opacity-75">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 text-gold transition-all group-hover:bg-gold group-hover:text-foreground">
                    <Icon name="Mail" size={16} />
                  </div>
                  hello@olimp-vlg.ru
                </a>
                <div className="pt-2">
                  <a href="https://wa.me/78442000000" className="inline-flex items-center gap-3 bg-gold px-8 py-4 text-xs uppercase tracking-luxe text-foreground transition-opacity hover:opacity-85">
                    <Icon name="MessageCircle" size={16} /> Написать в WhatsApp
                  </a>
                </div>
              </div>
            </div>
            <form className="reveal space-y-5" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Имя" className="w-full border-b border-background/25 bg-transparent py-3 font-sans text-sm text-background placeholder:text-background/40 focus:border-gold focus:outline-none transition-colors" />
              <input type="tel" placeholder="Телефон" className="w-full border-b border-background/25 bg-transparent py-3 font-sans text-sm text-background placeholder:text-background/40 focus:border-gold focus:outline-none transition-colors" />
              <textarea placeholder="Сообщение или вопрос" rows={3} className="w-full resize-none border-b border-background/25 bg-transparent py-3 font-sans text-sm text-background placeholder:text-background/40 focus:border-gold focus:outline-none transition-colors" />
              <button type="submit" className="group w-full bg-gold py-4 text-xs uppercase tracking-luxe text-foreground transition-opacity hover:opacity-85 flex items-center justify-center gap-3">
                Отправить заявку
                <Icon name="Send" size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
          <div className="mt-20 border-t border-background/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-luxe text-background/40">
            <span>ОЛИМП · Гостевой дом</span>
            <span>Волгоградская обл., Среднеахтубинский р-н, о. Крит</span>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes heroFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-55vh) scale(0.4); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Index;