import { ethers } from 'ethers';
import { Store } from 'react-notifications-component';
/**
 * set delay for delayTimes
 * @param {Number} delayTimes - timePeriod for delay
 */
function delay(delayTimes: number | undefined) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayTimes);
  });
}

/**
 * change data type from Number to BigNum
 * @param {Number} value - data that need to be change
 * @param {Number} d - decimals
 */
function toBigNum(value: string | number, d: number | undefined = 18) {
  return ethers.utils.parseUnits(Number(value).toFixed(d), d);
}

/**
 * change data type from BigNum to Number
 * @param {ethers.BigNum} value - data that need to be change
 * @param {Number} d - decimals
 */
function fromBigNum(value: any, d: number | undefined = 18) {
  return parseFloat(ethers.utils.formatUnits(value, d));
}
/**
 * split address.
 * @param {String} address -wallet address
 * @returns {String}
 */
function styledAddress(address: string) {
  return address.slice(0, 4) + '...' + address.slice(-4);
}

type NOTIFICATION_TYPE = 'success' | 'danger' | 'info' | 'default' | 'warning';

const AddNotification = (title: string, message: string, type: NOTIFICATION_TYPE) => {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    container: 'top-right',
    insert: 'top',
    animationIn: ['animate__animated animate__fadeIn'], // `animate.css v4` classes
    animationOut: ['animate__animated animate__fadeOut'], // `animate.css v4` classes
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
};

export { delay, toBigNum, fromBigNum, styledAddress, AddNotification };
