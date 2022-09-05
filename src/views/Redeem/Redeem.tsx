import { BigNumber } from '@ethersproject/bignumber';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SlippageControlButton from 'src/components/SlippageControl';
import Spacer from 'src/components/Spacer';
import useQuery from 'src/hooks/useQuery';
import ButtonSelectCollateral from '../../components/ButtonSelectCollateral';
import Card from '../../components/Card/Card';
import CardBody from '../../components/CardBody';
import {
  FormAction,
  FormButtonsContainer,
  FormHeader,
  FormHeaderContainer,
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
import useModalWithFC from '../../hooks/useModalWithFC';
import { useGetSlippageTolerance } from '../../state/application/hooks';
import theme from '../../theme';
import ButtonRedeem from './components/ButtonRedeem';
import CollectionRedemption from './components/CollectionRedemption';
import { RedeemContentLoader } from './components/RedeemContentLoader';
import RedeemFooter from './components/RedeemFooter';
import TransactionConfirmationModal from './components/TransactionConfirmationModal';

const Redeem: React.FC = () => {
  const info = useIronBankInfo();
  const [collateralPrice, setCollateralPrice] = useState<BigNumber>();
  const [poolCollateralBalance, setPoolCollateralBalance] = useState(BigNumber.from(0));

  const [dollarAmount, setDollarAmount] = useState(BigNumber.from(0));
  const [minOutputCollateralAmount, setMinOutputCollateralAmount] = useState(BigNumber.from(0));
  const [minOutputShareAmount, setMinOutputShareAmount] = useState(BigNumber.from(0));
  const [redemptionFeeValue, setRedemptionFeeValue] = useState(BigNumber.from(0));

  const slippage = useGetSlippageTolerance();
  const dollarBalance = BigNumber.from(0);
  const shareBalance = BigNumber.from(0);
  const collateralBalance = BigNumber.from(0);
  const refInputDollar = useRef(null);
  const { showModal, hideModal } = useModalWithFC();
  const history = useHistory();
  const query = useQuery();

  const isFullCollateralized = useMemo(
    () => info?.effectiveCollateralRatio.gte(10 ** 6),
    [info?.effectiveCollateralRatio],
  );

  const isExceededBalance = useMemo(() => {
    if (dollarBalance && dollarAmount) {
      return dollarAmount.gt(dollarBalance);
    }
    return false;
  }, [dollarBalance, dollarAmount]);

  const onRedeem = useCallback(() => {
    showModal(TransactionConfirmationModal, {
      dollarAmount,
      minOutputCollateralAmount,
      minOutputShareAmount,
      collateralPrice,
      sharePrice: info?.sharePrice,
      redemptionFee: info?.redemptionFee,
      slippage,
      onDismiss: hideModal,
      onConfirmed: () => {
        hideModal();
      },
    });
  }, [
    showModal,
    dollarAmount,
    minOutputCollateralAmount,
    minOutputShareAmount,
    collateralPrice,
    info?.sharePrice,
    info?.redemptionFee,
    slippage,
    hideModal,
  ]);

  const onPoolSelected = useCallback(
    (_pool?: string) => {
      if (_pool) {
        history.push(`/bank?action=redeem&pool=${_pool}`);
      }
    },
    [history],
  );

  const updateInputAmount = useCallback((amount: BigNumber) => {
    console.log('Todo...', amount);
  }, []);

  return !info ? (
    <RedeemContentLoader />
  ) : (
    <>
      <CollectionRedemption />
      <Spacer />
      <Card
        width="450px"
        animationDuration={0.3}
        background={'linear-gradient(to right,rgb(34 59 231 / 9%),rgb(52 67 249 / 15%))'}
      >
        <CardBody>
          <FormHeader>
            <FormHeaderContainer>
              <FormTitle>Redeem</FormTitle>
              <FormAction>
                <SlippageControlButton />
              </FormAction>
            </FormHeaderContainer>
          </FormHeader>

          <FormRow>
            <div className="row-header">
              <h6>Input</h6>
              {dollarBalance && (
                <div style={{ marginLeft: 'auto ' }}>
                  Balance:{' '}
                  <Number value={dollarBalance} decimals={18} precision={2} keepZeros={false} />
                </div>
              )}
            </div>
            <div className="row-input">
              <TokenInput
                ref={refInputDollar}
                token={'IRON'}
                hasError={isExceededBalance}
                decimals={18}
                precision={6}
                onChange={updateInputAmount}
              />
              <FormToken>
                <TokenSymbol size={32} symbol="IRON"></TokenSymbol>
                <span>IRON</span>
              </FormToken>
            </div>
          </FormRow>

          <FormSeparator>
            <i className="fas fa-arrow-down" color={theme.color.primary.main} />
          </FormSeparator>

          <FormRow>
            <div className="row-header">
              <h6>
                Output USDC &middot;{' '}
                <Number
                  percentage={true}
                  value={info?.effectiveCollateralRatio}
                  decimals={6}
                  precision={2}
                  keepZeros={false}
                />
                %
              </h6>
              <div style={{ marginLeft: 'auto ' }}>
                Balance: <Number value={collateralBalance} decimals={6} precision={6} />
              </div>
            </div>
            <div className="row-input">
              <FormOutput>
                <Number value={minOutputCollateralAmount} decimals={6} precision={6} />
              </FormOutput>
              <FormToken>
                <ButtonSelectCollateral
                  poolAddress={query?.get('pool')}
                  onSelected={onPoolSelected}
                />
              </FormToken>
            </div>
          </FormRow>

          {!isFullCollateralized && (
            <FormSeparator>
              <i className="fas fa-plus" color={theme.color.grey[500]}></i>
            </FormSeparator>
          )}

          {!isFullCollateralized && (
            <FormRow>
              <div className="row-header">
                <h6>
                  Output LITH &middot;{' '}
                  <Number
                    percentage={true}
                    value={BigNumber.from(1e6).sub(info?.effectiveCollateralRatio)}
                    decimals={6}
                    precision={6}
                  />
                  %
                </h6>
                <div style={{ marginLeft: 'auto ' }}>
                  Balance: <Number value={shareBalance} decimals={18} precision={6} />
                </div>
              </div>
              <div className="row-input">
                <FormOutput>
                  <Number value={minOutputShareAmount} decimals={18} precision={6} />
                </FormOutput>
                <FormToken>
                  <TokenSymbol size={32} symbol={'LITH'}></TokenSymbol>
                  <span>LITH</span>
                </FormToken>
              </div>
            </FormRow>
          )}
          <FormButtonsContainer>
            <ButtonRedeem
              collateralBalance={poolCollateralBalance}
              dollarAmount={dollarAmount}
              isExceededDollarBalance={isExceededBalance}
              paused={false}
              redeem={onRedeem}
              minOutputAmount={minOutputCollateralAmount}
            />
          </FormButtonsContainer>
        </CardBody>
      </Card>
      <RedeemFooter
        collateralPrice={collateralPrice}
        collateralBalance={poolCollateralBalance}
        redeemFeeValue={redemptionFeeValue}
      />
    </>
  );
};

export default Redeem;
