import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { getDisplayNumber } from 'src/utils/formatBN';
import { BigNumber } from '@ethersproject/bignumber';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { parseUnits } from '@ethersproject/units';

interface TokenSliderInputProps {
  token: string;
  decimals?: number;
  precision?: number;
  disabled?: boolean;
  hasError?: boolean;
  onMax?: () => void;
  maxBalance?: BigNumber;
  onChange?: (value: BigNumber) => void;
  max?: number;
  token0?: string;
  token1?: string;
  hideMax?: boolean;
}

const TokenSliderInput: React.ForwardRefRenderFunction<unknown, TokenSliderInputProps> = (
  {
    token,
    hasError,
    disabled,
    decimals,
    precision,
    onChange,
    max = 1e9,
    maxBalance,
    token0,
    token1,
    hideMax,
  },
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

  const onMax = useCallback(() => {
    patchInputValue(maxBalance || balance);
    onChange(maxBalance || balance);
  }, [balance, maxBalance, onChange, patchInputValue]);

  useImperativeHandle(
    ref,
    () => ({
      resetInput: patchInputValue,
      onMax: onMax,
    }),
    [patchInputValue, onMax],
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
      if (_value) {
        const parsedValue = parseUnits(
          _value.substr(0, _value.lastIndexOf('.') + decimals + 1),
          decimals,
        );
        onChange(parsedValue);
      }
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

  const onSliderChange = useCallback(
    (value) => {
      const selectedBalance = maxBalance || balance;
      if (!selectedBalance || selectedBalance.eq(BigNumber.from(0))) return;
      const newInput = selectedBalance.mul(BigNumber.from(value)).div(BigNumber.from(100));
      patchInputValue(newInput);
      onChange(newInput);
    },
    [maxBalance, balance, patchInputValue, onChange],
  );

  const sliderValue = useMemo(() => {
    const selectedBalance = maxBalance || balance;
    if (!selectedBalance || selectedBalance.eq(BigNumber.from(0))) return 0;
    const parseBalance = getDisplayNumber(
      selectedBalance,
      decimals,
      precision,
      false,
      false,
      false,
      false,
    );
    return (+input / +parseBalance) * 100;
  }, [maxBalance, balance, decimals, input, precision]);

  return (
    <StyledContainer>
      <InputContainer>
        <StyledTokenSliderInputWrapper>
          <StyledTokenSliderInput
            hasError={hasError}
            disabled={disabled}
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder={disabled ? '-' : '0.0'}
            minLength={1}
            // maxLength={10}
            spellCheck={false}
            inputMode="decimal"
            onChange={(e) => onInputChange(e)}
            value={input}
          ></StyledTokenSliderInput>
          {!disabled && !hideMax && <StyledButtonMax onClick={onMax}>MAX</StyledButtonMax>}
        </StyledTokenSliderInputWrapper>
        <span className="tokenName">
          {token0}
          {token1 ? '/' + token1 : ''}
        </span>
      </InputContainer>
      <Slider
        className="slider"
        onChange={onSliderChange}
        // dots
        tabIndex={10}
        step={1}
        value={sliderValue}
        ariaLabelForHandle="1"
        ariaLabelledByForHandle="2"
        trackStyle={{ backgroundColor: '#ffffff' }}
        railStyle={{ backgroundColor: '#20254d' }}
        handleStyle={{ backgroundColor: '#ffffff', border: 'none' }}
        dotStyle={{ backgroundColor: '#20254d', border: 'none' }}
        activeDotStyle={{ backgroundColor: '#ffffff', border: 'none' }}
        marks={{
          0: <StyledLabel active={sliderValue >= 0}>0%</StyledLabel>,
          25: <StyledLabel active={sliderValue >= 25}>25%</StyledLabel>,
          50: <StyledLabel active={sliderValue >= 50}>50%</StyledLabel>,
          75: <StyledLabel active={sliderValue >= 75}>75%</StyledLabel>,
          100: <StyledLabel active={sliderValue >= 100}>100%</StyledLabel>,
        }}
      />
    </StyledContainer>
  );
};

const StyledLabel = styled.div<{ active?: boolean }>`
  margin-top: 4px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ active }) => (active ? '#ffffff' : '#91908f')};
  :hover {
    color: #ffffff;
  }
`;

const InputContainer = styled.div`
  background: #181d4c;
  display: flex;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  margin-top: 5px;
  border: 1px solid #254da7;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
`;

const StyledContainer = styled.div<{ marginTop?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  .slider {
    margin-top: ${({ marginTop }) => marginTop || '18px'};
    width: 96%;
    align-self: center;
  }
  .tokenName {
    font-weight: 500;
  }
`;

const StyledTokenSliderInputWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-right: 10px;
  flex: 1;
`;

const StyledTokenSliderInput = styled.input<{ hasError?: boolean }>`
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
export default forwardRef(TokenSliderInput);
