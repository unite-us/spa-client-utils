import React from 'react';

const ProviderCardEmpty = () => (
  <div className="ui-provider-card">
    <div className="ui-provider-card__info">
      <div className="ui-provider-card__detail">
        <h4 className="ui-provider-card__name">No matches</h4>
        <p className="ui-provider-card__message">There are no organizations which match your criteria</p>
      </div>
    </div>
  </div>
);

export default ProviderCardEmpty;
