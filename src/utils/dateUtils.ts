import { format } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

const TAIWAN_TIMEZONE = 'Asia/Taipei';

const toChineseNumber = (num: number): string => {
  const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  
  if (num <= 10) {
    return chineseNumbers[num];
  }
  
  const tens = Math.floor(num / 10);
  const ones = num % 10;
  
  if (tens === 1) {
    return ones === 0 ? '十' : `十${chineseNumbers[ones]}`;
  }
  
  return ones === 0
    ? `${chineseNumbers[tens]}十`
    : `${chineseNumbers[tens]}十${chineseNumbers[ones]}`;
};

const toChineseYear = (year: number): string => {
  return year.toString()
    .split('')
    .map(digit => toChineseNumber(parseInt(digit)))
    .join('');
};

export const getTaiwanDate = (): string => {
  // 使用 date-fns-tz 來確保我們總是取得台灣時間
  const taiwanDate = utcToZonedTime(new Date(), TAIWAN_TIMEZONE);
  return format(taiwanDate, 'yyyy-MM-dd');
};

export const formatTaiwanDate = (dateStr: string): FormattedDatePart[] => {
  if (!dateStr) return [];
  
  // 將日期字串轉換為台灣時間
  const date = utcToZonedTime(new Date(dateStr), TAIWAN_TIMEZONE);
  const year = date.getFullYear() - 1911;
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return [
    { text: '中華民國 ', highlight: false },
    { text: year.toString(), highlight: true },
    { text: ' 年 ', highlight: false },
    { text: month, highlight: true },
    { text: ' 月 ', highlight: false },
    { text: day, highlight: true },
    { text: ' 日', highlight: false }
  ];
};

export const getInvoicePeriod = (date: string): string => {
  const invoiceDate = utcToZonedTime(new Date(date), TAIWAN_TIMEZONE);
  const year = invoiceDate.getFullYear() - 1911;
  const month = invoiceDate.getMonth() + 1;
  
  const periodStart = Math.floor((month - 1) / 2) * 2 + 1;
  const periodEnd = periodStart + 1;
  
  return `${toChineseYear(year)}年${toChineseNumber(periodStart)}、${toChineseNumber(periodEnd)}月份`;
};