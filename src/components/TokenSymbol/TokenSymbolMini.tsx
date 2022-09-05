import React from 'react';

import USDCLogo from '../../assets/img/USDC.png';
import DOLLARLogo from '../../assets/img/IRON.png';
import SHARELogo from '../../assets/img/TITAN.png';
import ETHLogo from '../../assets/img/ETH.png';
import BTCBLogo from '../../assets/img/BTCB.png';
import DNDLogo from '../../assets/img/DND.png';
import ADALogo from '../../assets/img/ADA.png';
import DOTLogo from '../../assets/img/DOT.png';
import DBTCLogo from '../../assets/img/DBTC.png';
import DBNBLogo from '../../assets/img/DBNB.png';
import DETHLogo from '../../assets/img/DETH.png';
import DADALogo from '../../assets/img/DADA.png';
import DDOTLogo from '../../assets/img/DDOT.png';
import MATICLogo from '../../assets/img/matic.png';
import DFYNLogo from '../../assets/img/DFYN.png';
import SUSHISWAPLogo from '../../assets/img/SUSHISWAP.png';
import QUICKSWAPLogo from '../../assets/img/QUICKSWAP_LOGO.png';
import FIREBIRDLogo from '../../assets/img/FIREBIRD.svg';
import IRONFINANCELogo from '../../assets/img/IRON-logo.png';
import styled from 'styled-components';

const logosBySymbol: { [title: string]: string } = {
  USDC: USDCLogo,
  IRON: DOLLARLogo,
  ADA: ADALogo,
  DOT: DOTLogo,
  LITH: SHARELogo,
  MATIC: MATICLogo,
  ETH: ETHLogo,
  BTCB: BTCBLogo,
  DND: DNDLogo,
  DBTC: DBTCLogo,
  DBNB: DBNBLogo,
  DETH: DETHLogo,
  DADA: DADALogo,
  DDOT: DDOTLogo,
  DFYN: DFYNLogo,
  QUICK: QUICKSWAPLogo,
  SUSHISWAP: SUSHISWAPLogo,
  QUICKSWAP: QUICKSWAPLogo,
  FIREBIRD: FIREBIRDLogo,
  IRONFINANCE: IRONFINANCELogo,
  TEST0: DBTCLogo,
  TEST1: DBNBLogo,
  TEST2: DETHLogo,
  TEST3: DADALogo,
  TEST4: DDOTLogo,
};

type TokenSymbolProps = {
  symbol: string;
  size?: string;
};

const TokenSymbolMini: React.FC<TokenSymbolProps> = ({ symbol, size }) => {
  if (!symbol || !logosBySymbol[symbol.toUpperCase()]) {
    return null;
  }
  return (
    <StyledBankIconWrapper size={size}>
      <img src={logosBySymbol[symbol.toUpperCase()]} alt={`${symbol} Logo`} />
    </StyledBankIconWrapper>
  );
};

interface StyledBankIconWrapperProps {
  size?: string;
}

const StyledBankIconWrapper = styled.div<StyledBankIconWrapperProps>`
  background-color: transparent;
  border-radius: 100%;
  width: ${(props) => props.size || '40px'};
  height: ${(props) => props.size || '40px'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    img {
      width: 28px;
      height: auto;
    }
  }
`;

export default TokenSymbolMini;
