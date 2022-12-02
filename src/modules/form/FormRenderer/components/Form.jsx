import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { orderBy } from 'lodash';
import FormSection from './FormSection';
import { getInitialValues } from '../utils';

export class Form extends PureComponent {
  render() {
    const {
      editMode,
      formData,
      hiddenFields,
    } = this.props;

    return (
      <form
        id={formData.id}
      >
        {
          orderBy(formData.sections, 'display_order', 'asc').map(section => (
            <FormSection
              editMode={editMode}
              key={section.id}
              section={section}
              hiddenFields={hiddenFields}
            />
          ))
        }
      </form>
    );
  }
}

Form.propTypes = {
  editMode: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    id: PropTypes.string,
    sections: PropTypes.array,
  }).isRequired,
  hiddenFields: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    form: ownProps.formData.id,
    initialValues: getInitialValues(ownProps.formData),
  };
}

export default connect(
  mapStateToProps,
)(reduxForm()(Form));
