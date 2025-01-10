import { Locale } from "@hassanmojab/react-modern-calendar-datepicker";

export const persianLocale: Locale = {
  months: [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ],
  weekDays: [
    {
      name: 'شنبه',
      short: 'ش',
      isWeekend: false,
    },
    {
      name: 'یکشنبه',
      short: 'ی',
      isWeekend: false,
    },
    {
      name: 'دوشنبه',
      short: 'د',
      isWeekend: false,
    },
    {
      name: 'سه‌شنبه',
      short: 'س',
      isWeekend: false,
    },
    {
      name: 'چهارشنبه',
      short: 'چ',
      isWeekend: false,
    },
    {
      name: 'پنج‌شنبه',
      short: 'پ',
      isWeekend: false,
    },
    {
      name: 'جمعه',
      short: 'ج',
      isWeekend: true,
    },
  ],
  weekStartingIndex: 6,
  getToday: (gregorianTodayObject) => gregorianTodayObject,
  toNativeDate: (date) => {
    return new Date(date.year, date.month - 1, date.day);
  },
  getMonthLength: (date) => {
    return new Date(date.year, date.month, 0).getDate();
  },
  transformDigit: (digit) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return digit.toString().replace(/\d/g, (match) => persianDigits[parseInt(match)]);
  },
  nextMonth: 'ماه بعد',
  previousMonth: 'ماه قبل',
  openMonthSelector: 'انتخاب ماه',
  openYearSelector: 'انتخاب سال',
  closeMonthSelector: 'بستن',
  closeYearSelector: 'بستن',
  from: 'از',
  to: 'تا',
  defaultPlaceholder: 'انتخاب...',
  digitSeparator: ',',
  yearLetterSkip: 0,
  isRtl: true,
};

