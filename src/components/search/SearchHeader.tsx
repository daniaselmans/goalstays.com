import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Plane, Users, Search, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CityAutocomplete from '@/components/CityAutocomplete';
import { cn } from '@/lib/utils';

const SearchHeader = () => {
  const [destination, setDestination] = useState('Paris, France');
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date(2026, 0, 25));
  const [checkOut, setCheckOut] = useState<Date | undefined>(new Date(2026, 0, 28));
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [checkInMonth, setCheckInMonth] = useState<Date>(checkIn || new Date());
  const [checkOutMonth, setCheckOutMonth] = useState<Date>(checkOut || new Date());

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckIn(date);
    if (date && (!checkOut || date >= checkOut)) {
      setCheckOut(undefined);
    }
    setCheckInOpen(false);
    if (date) {
      setTimeout(() => setCheckOutOpen(true), 100);
    }
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOut(date);
    setCheckOutOpen(false);
  };

  const CalendarHeader = ({
    month,
    setMonth,
  }: {
    month: Date;
    setMonth: (date: Date) => void;
  }) => {
    const handleYearChange = (year: string) => {
      const newDate = new Date(month);
      newDate.setFullYear(parseInt(year));
      setMonth(newDate);
    };

    const handleMonthChange = (monthIndex: string) => {
      const newDate = new Date(month);
      newDate.setMonth(parseInt(monthIndex));
      setMonth(newDate);
    };

    const goToPrevMonth = () => {
      const newDate = new Date(month);
      newDate.setMonth(newDate.getMonth() - 1);
      setMonth(newDate);
    };

    const goToNextMonth = () => {
      const newDate = new Date(month);
      newDate.setMonth(newDate.getMonth() + 1);
      setMonth(newDate);
    };

    return (
      <div className="flex items-center justify-between gap-2 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevMonth}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Select
            value={month.getMonth().toString()}
            onValueChange={handleMonthChange}
          >
            <SelectTrigger className="h-8 w-[110px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card z-[100]">
              {months.map((m, index) => (
                <SelectItem key={m} value={index.toString()}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={month.getFullYear().toString()}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="h-8 w-[80px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card z-[100]">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextMonth}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center">
              <Plane className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">GoalStays</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">Help</Button>
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="default" size="sm">Get Started</Button>
          </div>
        </div>

        {/* Search bar */}
        <div className="py-4">
          <div className="flex flex-wrap items-center gap-3 p-3 bg-secondary rounded-xl">
            {/* Destination with autocomplete */}
            <div className="flex-1 min-w-[200px]">
              <CityAutocomplete
                value={destination}
                onChange={setDestination}
                placeholder="Where are you going?"
                className="[&_input]:bg-transparent [&_input]:border-0 [&_input]:h-10 [&_input]:focus:ring-0"
              />
            </div>
            
            <div className="h-8 w-px bg-border hidden sm:block" />
            
            {/* Check-in date */}
            <div className="flex-1 min-w-[140px]">
              <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start text-left font-normal h-10 px-3',
                      !checkIn && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground shrink-0" />
                    {checkIn ? format(checkIn, 'MMM dd') : 'Check-in'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4 bg-card z-[100]" align="start">
                  <CalendarHeader month={checkInMonth} setMonth={setCheckInMonth} />
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={handleCheckInSelect}
                    month={checkInMonth}
                    onMonthChange={setCheckInMonth}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                    className={cn('p-0 pointer-events-auto')}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-out date */}
            <div className="flex-1 min-w-[140px]">
              <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start text-left font-normal h-10 px-3',
                      !checkOut && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground shrink-0" />
                    {checkOut ? format(checkOut, 'MMM dd') : 'Check-out'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4 bg-card z-[100]" align="start">
                  <CalendarHeader month={checkOutMonth} setMonth={setCheckOutMonth} />
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={handleCheckOutSelect}
                    month={checkOutMonth}
                    onMonthChange={setCheckOutMonth}
                    disabled={(date) => {
                      const today = new Date(new Date().setHours(0, 0, 0, 0));
                      if (checkIn) {
                        return date <= checkIn;
                      }
                      return date < today;
                    }}
                    initialFocus
                    className={cn('p-0 pointer-events-auto')}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="h-8 w-px bg-border hidden sm:block" />
            
            <div className="flex items-center gap-2 flex-1 min-w-[100px]">
              <Users className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="text-foreground">2 guests</span>
            </div>
            
            <Button variant="hero" size="default" className="shrink-0">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SearchHeader;
