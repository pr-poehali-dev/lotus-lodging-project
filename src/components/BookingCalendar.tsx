import { useState } from 'react';
import Icon from '@/components/ui/icon';

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];
const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const ROOMS = ['Лотос Делюкс', 'Сад Дзен', 'Панорама'];

function seededBooked(year: number, month: number, room: number): Set<number> {
  const set = new Set<number>();
  const seed = (year + month * 7 + room * 13) % 9 + 3;
  for (let i = 0; i < 31; i++) {
    if ((i * seed + room * 5) % 7 === 0) set.add(i + 1);
  }
  return set;
}

const BookingCalendar = () => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [room, setRoom] = useState(0);
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);

  const booked = seededBooked(viewYear, viewMonth, room);
  const firstDay = new Date(viewYear, viewMonth, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const key = (d: number) => `${viewYear}-${viewMonth}-${d}`;

  const changeMonth = (delta: number) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setViewMonth(m);
    setViewYear(y);
  };

  const isPast = (d: number) => {
    const date = new Date(viewYear, viewMonth, d);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < t;
  };

  const handleSelect = (d: number) => {
    if (booked.has(d) || isPast(d)) return;
    const k = key(d);
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(k);
      setCheckOut(null);
    } else {
      const inDay = Number(checkIn.split('-')[2]);
      if (d <= inDay) setCheckIn(k);
      else setCheckOut(k);
    }
  };

  const inRange = (d: number) => {
    if (!checkIn || !checkOut) return false;
    const inD = Number(checkIn.split('-')[2]);
    const outD = Number(checkOut.split('-')[2]);
    return d > inD && d < outD;
  };

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(<div key={`e${i}`} />);
  for (let d = 1; d <= daysInMonth; d++) {
    const k = key(d);
    const isBooked = booked.has(d);
    const past = isPast(d);
    const selectedIn = checkIn === k;
    const selectedOut = checkOut === k;
    const between = inRange(d);
    const disabled = isBooked || past;

    cells.push(
      <button
        key={d}
        onClick={() => handleSelect(d)}
        disabled={disabled}
        className={[
          'relative h-11 text-sm transition-all duration-300 font-sans',
          disabled ? 'text-muted-foreground/40 line-through cursor-not-allowed' : 'hover:bg-secondary cursor-pointer',
          selectedIn || selectedOut ? 'bg-foreground text-background font-medium' : '',
          between ? 'bg-secondary text-foreground' : '',
        ].join(' ')}
      >
        {d}
        {isBooked && !past && (
          <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-gold" />
        )}
      </button>
    );
  }

  const nights = checkIn && checkOut
    ? Number(checkOut.split('-')[2]) - Number(checkIn.split('-')[2])
    : 0;

  return (
    <div className="mx-auto max-w-2xl border border-border bg-card p-6 sm:p-10">
      <div className="mb-8 flex flex-wrap gap-2">
        {ROOMS.map((r, i) => (
          <button
            key={r}
            onClick={() => { setRoom(i); setCheckIn(null); setCheckOut(null); }}
            className={[
              'border px-4 py-2 text-xs uppercase tracking-luxe transition-all duration-300',
              room === i ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground',
            ].join(' ')}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mb-6 flex items-center justify-between">
        <button onClick={() => changeMonth(-1)} className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-foreground">
          <Icon name="ChevronLeft" size={18} />
        </button>
        <h3 className="font-serif text-2xl font-light tracking-wide">
          {MONTHS[viewMonth]} {viewYear}
        </h3>
        <button onClick={() => changeMonth(1)} className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-foreground">
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 border-b border-border pb-3">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center text-[10px] uppercase tracking-luxe text-muted-foreground">{w}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 pt-2">{cells}</div>

      <div className="mt-6 flex items-center gap-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-foreground" /> Выбрано</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" /> Занято</span>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        {checkIn ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-sans text-sm">
              <span className="text-muted-foreground">Заезд:</span>{' '}
              <span className="font-medium">{checkIn.split('-')[2]} {MONTHS[viewMonth].slice(0, 3).toLowerCase()}</span>
              {checkOut && (
                <>
                  {' — '}<span className="text-muted-foreground">Выезд:</span>{' '}
                  <span className="font-medium">{checkOut.split('-')[2]} {MONTHS[viewMonth].slice(0, 3).toLowerCase()}</span>
                  <span className="ml-2 text-gold">· {nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'}</span>
                </>
              )}
            </div>
            <button className="bg-foreground px-7 py-3 text-xs uppercase tracking-luxe text-background transition-opacity hover:opacity-85">
              Забронировать
            </button>
          </div>
        ) : (
          <p className="text-center font-sans text-sm text-muted-foreground">
            Выберите даты заезда и выезда
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
