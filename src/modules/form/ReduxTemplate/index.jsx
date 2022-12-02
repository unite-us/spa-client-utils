import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import {
  Button,
} from '@unite-us/ui';

class ReduxTemplate extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    console.log(values, this); // eslint-disable-line no-console
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          {this.props.children}
          <Button
            type="submit"
            label="Submit"
          />
        </form>
      </div>
    );
  }
}


ReduxTemplate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

function mapStateToProps(state, props) {
  return {
    form: props.formId,
  };
}

export default connect(mapStateToProps)(reduxForm({ enableReinitialize: true })(ReduxTemplate));
