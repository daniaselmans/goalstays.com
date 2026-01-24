import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
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

interface DateRangePickerProps {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  onCheckInChange: (date: Date | undefined) => void;
  onCheckOutChange: (date: Date | undefined) => void;
}

const DateRangePicker = ({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: DateRangePickerProps) => {
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
    onCheckInChange(date);
    if (date && (!checkOut || date >= checkOut)) {
      // Clear check-out if check-in is after or same as check-out
      onCheckOutChange(undefined);
    }
    setCheckInOpen(false);
    // Automatically open check-out picker
    if (date) {
      setTimeout(() => setCheckOutOpen(true), 100);
    }
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    onCheckOutChange(date);
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
            <SelectContent>
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
            <SelectContent>
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
    <div className="flex gap-4">
      {/* Check-in */}
      <div className="relative flex-1">
        <label className="text-xs font-medium text-muted-foreground mb-2 block text-left">
          Check-in
        </label>
        <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full h-12 justify-start text-left font-normal pl-11',
                !checkIn && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              {checkIn ? format(checkIn, 'MMM dd, yyyy') : 'Add date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="start">
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

      {/* Check-out */}
      <div className="relative flex-1">
        <label className="text-xs font-medium text-muted-foreground mb-2 block text-left">
          Check-out
        </label>
        <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full h-12 justify-start text-left font-normal pl-11',
                !checkOut && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              {checkOut ? format(checkOut, 'MMM dd, yyyy') : 'Add date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="start">
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
    </div>
  );
};

export default DateRangePicker;
