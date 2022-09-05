import { Configuration } from 'src/iron-bank/config';
import config from '../../config';

export const useConfiguration = (): Configuration => {
  return config;
};
