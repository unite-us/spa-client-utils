import React from 'react';
import PropTypes from 'prop-types';
import InfoPanel from 'modules/InfoPanel/InfoPanel';

// eslint-disable-next-line max-len
const NOTE_DISCLOSURE_MESSAGE = 'Only include personally identifiable information (PII), protected health information (PHI), or other sensitive information if it is necessary to provide services to the client.';

const NoteDisclosure = ({ className }) => <InfoPanel className={className} message={NOTE_DISCLOSURE_MESSAGE} />;

NoteDisclosure.propTypes = {
  /* Class name */
  className: PropTypes.string,
};

NoteDisclosure.defaultProps = {
  className: '',
};

export default NoteDisclosure;
