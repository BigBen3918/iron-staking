import { BigNumber } from '@ethersproject/bignumber';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Switch from 'react-switch';
import ButtonSelectCollateral from 'src/components/ButtonSelectCollateral';
import SlippageControlButton from 'src/components/SlippageControl';
import useModalWithFC from 'src/hooks/useModalWithFC';
import useQuery from 'src/hooks/useQuery';
import styled from 'styled-components';
import Card from '../../components/Card';
import CardBody from '../../components/CardBody';
import {
  FormAction,
  FormButtonsContainer,
  FormHeader,
  FormOutput,
  FormRow,
  FormSeparator,
  FormTitle,
  FormToken,
} from '../../components/Form';
import Number from '../../components/Number';
import TokenInput from '../../components/TokenInput';
import TokenSymbol from '../../components/TokenSymbol';
import useIronBankInfo from '../../hooks/useIronBankInfo';
import { useGetIsZap, useGetSlippageTolerance, useSetZap } from '../../state/application/hooks';
import theme from '../../theme';
import ButtonMint from './components/ButtonMint';
import { MintContentLoader } from './components/MintContentLoader';
import MintFooter from './components/MintFooter';
import TransactionConfirmationModal from './components/TransactionConfirmationModal';

const Mint: React.FC = () => {
  const { showModal, hideModal } = useModalWithFC();
  const slippage = useGetSlippageTolerance();
  const history = useHistory();
  const info = useIronBankInfo();
  const [collateralPrice] = useState<BigNumber>();
  const [collateralAmount] = useState<BigNumber>(BigNumber.from(0));
  const [shareAmount] = useState<BigNumber>(BigNumber.from(0));
  const [minOutputAmount] = useState<BigNumber>();
  const [mintFeeValue] = useState<BigNumber>();
  const collateralBalance = BigNumber.from(0);
  const dollarBalance = BigNumber.from(0);
  const shareBalance = BigNumber.from(0);
  const isZap = useGetIsZap();
  const setIsZap = useSetZap();

  const refInputCollateral = useRef(null);
  const refInputShare = useRef(null);

  const query = useQuery();

  const isFullCollaterallized = useMemo(() => info?.targetCollateralRatio.gte(10 ** 6), [info]);

  const updateCollateralAmount = useCallback((collateralAmount: BigNumber) => {
    console.log('Todo...', collateralAmount);
  }, []);

  const updateShareAmount = useCallback((shareAmount: BigNumber) => {
    console.log('Todo...', shareAmount);
  }, []);

  const onMint = useCallback(() => {
    showModal(TransactionConfirmationModal, {
      dollarAmount: minOutputAmount,
      collateralAmount,
      collateralPrice,
      shareAmount,
      sharePrice: info?.sharePrice,
      mintFee: info?.mintingFee,
      slippage,
      onDismiss: hideModal,
      onConfirmed: () => {
        hideModal();
      },
    });
  }, [
    showModal,
    minOutputAmount,
    collateralAmount,
    collateralPrice,
    shareAmount,
    info?.sharePrice,
    info?.mintingFee,
    slippage,
    hideModal,
  ]);

  const onPoolSelected = useCallback(
    (pool?: string) => {
      if (pool) {
        history.push(`/bank?action=mint&pool=${pool}`);
      }
    },
    [history],
  );

  return !info ? (
    <MintContentLoader />
  ) : (
    <>
      <Card
        width="450px"
        animationDuration={0.3}
        background={'linear-gradient(to right,rgb(34 59 231 / 9%),rgb(52 67 249 / 15%))'}
      >
        <CardBody>
          <FormHeader>
            <FormTitle>Mint</FormTitle>
            <FormAction>
              <SlippageControlButton />
            </FormAction>
          </FormHeader>
          <SwitchContainer>
            <Switch
              checked={isZap}
              onChange={setIsZap}
              onColor={theme.color.primary.light}
              onHandleColor={theme.color.primary.main}
              handleDiameter={18}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={12}
              width={28}
            />
            <SwitchDesc>Use only USDC to mint</SwitchDesc>
          </SwitchContainer>
          <FormRow>
            <div className="row-header">
              <h6>
                Input
                {!isZap && (
                  <>
                    &middot;{' '}
                    <Number
                      percentage={true}
                      value={info.targetCollateralRatio}
                      decimals={6}
                      keepZeros={true}
                      precision={2}
                    />
                    %
                  </>
                )}
              </h6>
              {collateralBalance && (
                <div style={{ marginLeft: 'auto ' }}>
                  Balance: <Number value={collateralBalance} decimals={6} precision={6} />
                </div>
              )}
            </div>
            <div className="row-input">
              <TokenInput
                ref={refInputCollateral}
                token={'USDC'}
                decimals={6}
                precision={6}
                onChange={updateCollateralAmount}
              />
              <FormToken>
                <ButtonSelectCollateral
                  poolAddress={query?.get('pool')}
                  onSelected={onPoolSelected}
                />
              </FormToken>
            </div>
          </FormRow>

          {!isFullCollaterallized && !isZap && (
            <FormSeparator>
              <i className="fas fa-plus" color={theme.color.grey[500]}></i>
            </FormSeparator>
          )}

          {!isFullCollaterallized && !isZap && (
            <FormRow>
              <div className="row-header">
                <h6>
                  LITH &middot;{' '}
                  <Number
                    percentage={true}
                    value={BigNumber.from(1e6).sub(info.targetCollateralRatio)}
                    decimals={6}
                    keepZeros={true}
                    precision={2}
                  />
                  %
                </h6>
                {shareBalance && (
                  <div style={{ marginLeft: 'auto ' }}>
                    Balance: <Number value={shareBalance} decimals={6} precision={6} />
                  </div>
                )}
              </div>
              <div className="row-input">
                <TokenInput
                  ref={refInputShare}
                  token={'LITH'}
                  decimals={18}
                  precision={6}
                  onChange={updateShareAmount}
                />
                <FormToken>
                  <TokenSymbol size={32} symbol={'LITH'}></TokenSymbol>
                  <span>{'LITH'}</span>
                </FormToken>
              </div>
            </FormRow>
          )}

          <FormSeparator>
            <i className="fas fa-arrow-down" color={theme.color.primary.main} />
          </FormSeparator>

          <FormRow>
            <div className="row-header">
              <h6>Output (estimated)</h6>
              {dollarBalance && (
                <div style={{ marginLeft: 'auto ' }}>
                  Balance: <Number value={dollarBalance} decimals={18} precision={6} />
                </div>
              )}
            </div>
            <div className="row-input">
              <FormOutput>
                <Number value={minOutputAmount} decimals={18} precision={6} />
              </FormOutput>
              <FormToken>
                <TokenSymbol size={32} symbol="IRON"></TokenSymbol>
                <span>IRON</span>
              </FormToken>
            </div>
          </FormRow>
          <FormButtonsContainer>
            <ButtonMint
              isZap={isZap}
              mint={onMint}
              collateralRatio={info?.targetCollateralRatio}
              paused={false}
              collateralAmount={collateralAmount}
              shareAmount={shareAmount}
              isExceededCollateralBalance={false}
              isExceededShareBalance={false}
            />
          </FormButtonsContainer>
        </CardBody>
      </Card>
      <MintFooter collateralPrice={collateralPrice} mintFeeValue={mintFeeValue} />
    </>
  );
};

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  margin-top: -5px;
`;

const SwitchDesc = styled.span`
  margin-left: 10px;
  margin-bottom: 2px;
`;

export default Mint;
