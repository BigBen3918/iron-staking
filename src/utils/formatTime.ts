import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';

export const pad = (num: number) => {
  return ('0' + num).slice(-2);
};

export const hhmmss = (secs: number) => {
  let minutes = Math.floor(secs / 60);
  secs = secs % 60;
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};

export const formatSecs = (secs: number, formatter?: string) => {
  if (!secs) {
    return;
  }
  return format(fromUnixTime(secs), formatter ? formatter : 'dd/MM/yyyy HH:mm:ss');
};
