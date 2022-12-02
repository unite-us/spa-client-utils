import PropTypes from 'prop-types';

export const paging = PropTypes.shape({
  current_page: PropTypes.number,
  next_page: PropTypes.number,
  prev_page: PropTypes.number,
}).isRequired;
