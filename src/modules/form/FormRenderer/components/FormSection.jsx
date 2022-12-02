import React from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import { FormSection } from 'redux-form';
import FormField from './FormField';
import FieldDisplay from './FieldDisplay';
import { isSectionEmpty } from '../utils';

const FormRendererSection = (props) => {
  const {
    editMode,
    section,
    hiddenFields,
  } = props;

  if (isSectionEmpty(section, hiddenFields)) {
    return null;
  }

  return (
    <FormSection name={section.id} className="ui-form-renderer-section">
      {
        section.display_name && (
          <h3>{section.name}</h3>
        )
      }
      {
        orderBy(section.questions, 'display_order', 'asc').map(question => (
          editMode ?
            <FormField
              key={question.id}
              question={question}
              hiddenFields={hiddenFields}
              section={section}
            /> :
            <FieldDisplay
              key={question.id}
              question={question}
              hiddenFields={hiddenFields}
            />
        ))
      }
    </FormSection>
  );
};

FormRendererSection.propTypes = {
  editMode: PropTypes.bool.isRequired,
  section: PropTypes.shape({
    id: PropTypes.string,
    display_name: PropTypes.bool,
    name: PropTypes.string,
    questions: PropTypes.array,
  }).isRequired,
  hiddenFields: PropTypes.array.isRequired,
};

export default FormRendererSection;
