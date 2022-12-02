import React from 'react';
import PropTypes from 'prop-types';
import './sandbox-form-results.scss';

const SandboxFormResults = ({ formResult }) =>
  formResult &&
    <div className="sandbox-form-results">
      <hr />
      <h5>Result</h5>

      <div>
        <pre>{ JSON.stringify(formResult, null, 2) }</pre>
      </div>
    </div>;

SandboxFormResults.propTypes = {
  formResult: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

SandboxFormResults.defaultProps = {
  formResult: null,
};

export default SandboxFormResults;
