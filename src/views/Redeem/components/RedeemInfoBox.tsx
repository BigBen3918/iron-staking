import React from 'react';
import InfoBox from '../../../components/InfoBox';
import { ExternalLinks } from '../../../constants';

const RedeemInfoBox: React.FC = () => {
  return (
    <InfoBox
      width="640px"
      boxKey="info-redeem"
      content="Redeeming an amount of IRON tokens at a specific Effective Collateral Ratio will produce a portion of collateral tokens and a portion of LITH tokens."
      title="What is Redeem?"
      linkText="Read more about Redeeming"
      linkUrl={`${ExternalLinks.documentations}/mechanism/redeeming`}
    />
  );
};

export default RedeemInfoBox;
