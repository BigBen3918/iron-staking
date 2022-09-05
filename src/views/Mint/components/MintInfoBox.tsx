import React from 'react';
import InfoBox from '../../../components/InfoBox';
import { ExternalLinks } from '../../../constants';

const MintInfoBox: React.FC = () => {
  return (
    <InfoBox
      width="640px"
      boxKey="info-mint"
      content="Minting is the process of creating new IRON tokens. Depending on the Collateral Ratio, minting might require an amount of collateral tokens (BUSD) and an amount of the protocol’s share token (TITAN)."
      title="What is Mint?"
      icon="far fa-bullseye"
      linkText="Read more about Minting"
      linkUrl={`${ExternalLinks.documentations}/mechanism/minting`}
    />
  );
};

export default MintInfoBox;
