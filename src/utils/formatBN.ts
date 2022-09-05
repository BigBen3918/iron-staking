import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits, parseUnits } from '@ethersproject/units';

export const numberWithCommas = (x: string) => {
  if (!x) {
    return '';
  }
  const parts = x.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const getDisplayNumber = (
  value: BigNumber,
  decimals = 18,
  fractionDigits = 0,
  percentage = false,
  keepTrailingZeros = false,
  roundDown = false,
  keepCommas = true,
) => {
  if (!value) {
    return;
  }
  const a = formatUnits(value.toString(), decimals);
  let b = percentage ? +a * 100 : +a;
  if (roundDown) {
    b = b - 5 / 10 ** (fractionDigits + 1);
  }
  const mimimum = 1 / 10 ** fractionDigits;
  if (b < mimimum && b > 0) {
    return `<${mimimum}`;
  } else {
    let c = b.toFixed(fractionDigits);
    c = keepCommas ? numberWithCommas(c) : c;
    return keepTrailingZeros
      ? c
      : c.replace(/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/, '$1$2$3');
  }
};

export const getDisplayAmount = (
  value: BigNumber,
  decimals = 18,
  fractionDigits = 0,
  keepTrailingZeros = true,
) => {
  if (!value) {
    return;
  }
  const a = formatUnits(value.toString(), decimals);
  const c = (+a).toFixed(fractionDigits);
  const converted = +(keepTrailingZeros
    ? c
    : c.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1'));
  let displayValue = '';
  let displayUnit = '';
  if (!isNaN(converted)) {
    displayValue = converted.toFixed(fractionDigits);
    if (converted >= 1e9) {
      displayValue = `${(converted / 1e9).toFixed(fractionDigits)}`;
      displayUnit = 'B';
    } else if (converted >= 1e6) {
      displayValue = `${(converted / 1e6).toFixed(fractionDigits)}`;
      displayUnit = 'M';
    } else if (converted >= 1e3) {
      displayValue = `${(converted / 1e3).toFixed(fractionDigits)}`;
      displayUnit = 'K';
    }
  }
  return { value: displayValue, unit: displayUnit };
};

export const parseNumber = (value: number | string, decimals = 18, fractionDigits = 0) => {
  if (value == null) {
    return;
  }
  const convert = +(+value).toFixed(fractionDigits);
  const numberVal = convert * 10 ** fractionDigits;
  return parseUnits(numberVal.toString(), decimals - fractionDigits);
};
