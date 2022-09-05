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

const logosBySymbol: { [title: string]: string } = {
  USDC: USDCLogo,
  IRON: DOLLARLogo,
  LITH: SHARELogo,
  ETH: ETHLogo,
  ADA: ADALogo,
  MATIC: MATICLogo,
  DOT: DOTLogo,
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
};

type TokenSymbolProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<TokenSymbolProps> = ({ symbol, size = 64 }) => {
  if (!symbol) {
    return <></>;
  }
  if (!logosBySymbol[symbol.toUpperCase()]) {
    throw new Error(`Invalid Token Symbol symbol: ${symbol}`);
  }
  return (
    <img
      src={logosBySymbol[symbol.toUpperCase()]}
      alt={`${symbol} Logo`}
      width={size}
      height={size}
    />
  );
};

export default TokenSymbol;
