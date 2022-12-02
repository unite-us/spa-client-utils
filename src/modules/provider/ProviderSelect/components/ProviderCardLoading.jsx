import React from 'react';
import { BarLoader } from '@unite-us/ui';

const ProviderCardLoading = () => (
  <div className="ui-provider-card">
    <div className="ui-provider-card__info">
      <div className="ui-provider-card__detail">
        <BarLoader className="mb-half" tall size="semi-full" />
        <BarLoader className="mb-half" size="quarter" />
        <BarLoader className="mb-half" size="half" />
        <BarLoader className="mb-half" size="half" />
      </div>
    </div>
  </div>
);

export default ProviderCardLoading;
