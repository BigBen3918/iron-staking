import React, { useCallback, useMemo } from 'react';
import useUnclaimed from 'src/hooks/useUnclaimed';
import styled from 'styled-components';
import { ButtonOutlineAction } from '../../../components/ButtonAction';
import Card from '../../../components/Card';
import CardBody from '../../../components/CardBody';
import Number from '../../../components/Number';

const CollectionRedemption: React.FC = () => {
  const { unclaimedCollateral, unclaimedShare } = useUnclaimed();
  const onCollectRedemption = useCallback(() => {
    console.log('onCollectRedemption', onCollectRedemption);
  }, []);

  const hasUnclaimedCollateral = useMemo(() => {
    return unclaimedCollateral && unclaimedCollateral.gt(0);
  }, [unclaimedCollateral]);

  const hasUnclaimedShare = useMemo(() => {
    return unclaimedShare && unclaimedShare.gt(0);
  }, [unclaimedShare]);

  return (
    <Card
      width="450px"
      background={'linear-gradient(to right,rgb(34 59 231 / 9%),rgb(52 67 249 / 15%))'}
    >
      <CardBody>
        <Header>
          Collect redemption
          <HeaderAction>
            <ButtonOutlineAction
              disabled={!hasUnclaimedShare && !hasUnclaimedCollateral}
              onClick={onCollectRedemption}
            >
              Collect
            </ButtonOutlineAction>
          </HeaderAction>
        </Header>
        <UnclaimedContainer>
          <UnclaimedItem>
            <UnclaimedValue disabled={!hasUnclaimedCollateral}>
              <Number value={unclaimedCollateral} decimals={6} precision={6} />
            </UnclaimedValue>
            <UnclaimedTitle>USDC</UnclaimedTitle>
          </UnclaimedItem>

          <UnclaimedItem>
            <UnclaimedValue disabled={!hasUnclaimedShare}>
              <Number value={unclaimedShare} decimals={6} precision={6} />
            </UnclaimedValue>
            <UnclaimedTitle>LITH</UnclaimedTitle>
          </UnclaimedItem>
        </UnclaimedContainer>
      </CardBody>
    </Card>
  );
};

const Header = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #8f929a;
  margin-bottom: 10px;
  padding-bottom: 12px;
  border-bottom: dashed 2px #383e4b;
  display: flex;
  align-items: center;
`;

const HeaderAction = styled.div`
  margin-left: auto;
`;

const UnclaimedContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px 0px 0px;
`;

const UnclaimedItem = styled.div`
  flex: 50%;
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const UnclaimedTitle = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: #8f929a;
`;

const UnclaimedValue = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 18px;
  font-weight: 500;
  margin-right: 5px;
  color: ${(props) => (props.disabled ? props.theme.color.grey[500] : '#ffffff')};
`;

export default CollectionRedemption;
