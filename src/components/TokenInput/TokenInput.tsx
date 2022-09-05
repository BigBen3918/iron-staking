import { BigNumber } from '@ethersproject/bignumber';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import { getDisplayNumber, parseNumber } from '../../utils/formatBN';

interface TokenInputProps {
  token: string;
  decimals?: number;
  precision?: number;
  disabled?: boolean;
  hasError?: boolean;
  onMax?: () => void;
  maxBalance?: BigNumber;
  onChange?: (value: BigNumber) => void;
  max?: number;
}

const TokenInput: React.ForwardRefRenderFunction<unknown, TokenInputProps> = (
  { hasError, disabled, decimals, precision, onChange, max = 1e9, maxBalance },
  ref,
) => {
  const [input, setInput] = useState<string>('');
  const balance = BigNumber.from(0);

  const patchInputValue = useCallback(
    (newValue: BigNumber) => {
      let newInput = '';
      try {
        newInput = getDisplayNumber(newValue, decimals, precision, false, false, false, false);
      } catch (e) {
        newInput = '';
      }
      setInput(newInput || '');
      return newInput;
    },
    [decimals, precision],
  );

  useImperativeHandle(
    ref,
    () => ({
      resetInput: patchInputValue,
    }),
    [patchInputValue],
  );

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const _value = (event.target as HTMLInputElement).value;
    broadcast(_value);
  };

  const broadcast = (_value: string) => {
    if (!isInputValid(_value)) {
      return false;
    }
    if (!isNaN(+_value)) {
      setInput(_value);
      const parsedValue = parseNumber(_value, decimals, precision);
      onChange(parsedValue);
    }
  };

  const isInputValid = (inputValue: string) => {
    if (isNaN(+inputValue)) {
      return false;
    }
    if (inputValue === undefined) {
      return false;
    }
    const splits = inputValue.split('.');
    const countDecimals = splits[1]?.length || 0;
    if (countDecimals > precision) {
      return false;
    }
    if (+inputValue > max) {
      return false;
    }
    return true;
  };

  const onMax = () => {
    patchInputValue(maxBalance || balance);
    onChange(maxBalance || balance);
  };

  return (
    <StyledTokenInputWrapper>
      <StyledTokenInput
        hasError={hasError}
        disabled={disabled}
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder={disabled ? '-' : '0.0'}
        minLength={1}
        maxLength={79}
        spellCheck={false}
        inputMode="decimal"
        onChange={(e) => onInputChange(e)}
        value={input}
      ></StyledTokenInput>
      {!disabled && <StyledButtonMax onClick={onMax}>MAX</StyledButtonMax>}
    </StyledTokenInputWrapper>
  );
};

const StyledTokenInputWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-right: 10px;
  flex: 1;
`;

const StyledTokenInput = styled.input<{ hasError?: boolean }>`
  color: ${({ theme, hasError }) => (hasError ? theme.color.red[500] : theme.color.white)};
  width: 0px;
  position: relative;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  appearance: textfield;
  font-family: Gordita;
  font-weight: 500;
`;

const StyledButtonMax = styled.button`
  appearance: none;
  border: solid 1px transparent;
  background-color: ${(props) => `${props.theme.color.primary.main}22`};
  color: ${(props) => props.theme.color.primary.main};
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 3px 7px;
  cursor: pointer;
  transition: ease-in-out 100ms;
  &:hover {
    border-color: ${(props) => `${props.theme.color.primary.main}99`};
  }
`;

export default forwardRef(TokenInput);
