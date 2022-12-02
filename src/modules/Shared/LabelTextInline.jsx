import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, get } from 'lodash';
import classNames from 'classnames';

export default function LabelTextInline(props) {
  const { className, label, content } = props;
  let contentModified;

  if (typeof content !== 'string') {
    if (isEmpty(content)) {
      return null;
    }

    if (Array.isArray(content)) {
      contentModified = content.map(item => (
        get(item, 'displayName', '') || get(item, 'name', '') || item
      )).join(', ');
    }

    if (isEmpty(contentModified)) {
      return null;
    }
  }

  return (
    <div className={classNames('label-text-inline', className)}>
      <h4 className="label-text-inline__label">{label}:</h4>&nbsp;
      <span>
        {contentModified || content}
      </span>
    </div>
  );
}

LabelTextInline.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  /** Array or String, Object in array should be formatted like { name: value }, string is value, value, value */
  content: PropTypes.any.isRequired,
};

LabelTextInline.defaultProps = {
  className: '',
};

