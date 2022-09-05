import React, { useMemo } from 'react';
import { ReactText } from 'react';

export type HashProps = {
  children: ReactText;
  maxLength: number;
};

export const Hash: React.FC<HashProps> = ({ maxLength, children }) => {
  const text = useMemo(() => {
    const str = children.toString();
    if (maxLength < str.length) {
      const half = Math.floor(maxLength / 2);
      return str.substr(0, half) + '...' + str.substr(half - maxLength);
    }
  }, [children, maxLength]);
  return <>{text}</>;
};
