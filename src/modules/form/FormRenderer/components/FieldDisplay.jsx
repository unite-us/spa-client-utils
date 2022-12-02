import React from 'react';
import PropTypes from 'prop-types';
import { indexOf } from 'lodash';
import { getQuestionDisplay } from '../utils';

const FieldDisplay = (props) => {
  const {
    question,
    hiddenFields,
  } = props;

  if (indexOf(hiddenFields, question.id) >= 0) {
    return null;
  }
  return (
    <div className="ui-form-renderer-question-display">
      <div className="ui-form-renderer-question-display__label">
        {question.label_text}
      </div>
      <div className="ui-form-renderer-question-display__value">
        {getQuestionDisplay(question)}
      </div>
    </div>
  );
};

FieldDisplay.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    input_type: PropTypes.string,
    label_text: PropTypes.string,
  }).isRequired,
  hiddenFields: PropTypes.array.isRequired,
};

export default FieldDisplay;
