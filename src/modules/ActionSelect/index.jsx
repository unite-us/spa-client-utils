import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isFunction, find, noop } from 'lodash';
import classNames from 'classnames';
import {
  SelectField,
  Icon,
} from '@unite-us/ui';

class ActionSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selectedAction: undefined,
    };

    this.doAction = this.doAction.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleCancelClick(e) {
    e.preventDefault();
    this.setState({
      loading: false,
      selectedAction: undefined,
    }, this.resetValue);
  }

  doAction(action) {
    if (isFunction(action.action)) {
      this.setState({ loading: true }, () => {
        const p = action.action();
        // Using Promise.all instead of p.then because it will still
        // call the then function even if p is not a promise.
        Promise.all([p])
          .then(() => this.setState({
            selectedAction: undefined,
            loading: false,
          }));
      });
    }
  }

  handleConfirmClick(e, action) {
    e.preventDefault();
    this.doAction(action);
  }

  handleOnChange(val) {
    const action = find(this.props.actions, act => act.value === val);
    const { requireConfirmation } = this.props;
    const selectedAction = isEmpty(action) ? undefined : action;
    this.setState({ selectedAction }, () => {
      if (!requireConfirmation) {
        // It's a mystery why the timeout is needed, but it is...
        // some kind of react-select magic.
        setTimeout(() => this.doAction(action), 400);
      }
    });
    return this.props.onChange(selectedAction);
  }

  resetValue() {
    this.selectField.setValue('');
  }

  render() {
    const {
      actions,
      disabled,
      flat,
      id,
      placeholder,
      primary,
      requireConfirmation,
      searchEnabled,
      styles,
      valueKey,
      labelKey,
    } = this.props;
    const { loading, selectedAction } = this.state;

    const actionSelectClass = () => classNames({
      'ui-action-select': true,
    });

    const confirmationBlockClasses = () => classNames({
      'confirmation-block': true,
      shadow: !flat,
      hidden: isEmpty(selectedAction) || !requireConfirmation,
    });

    const actionSelectContainerClasses = () => classNames({
      'action-select-container': true,
      shadow: !flat,
      primary,
    });

    return (
      <div className={actionSelectClass()}>
        <div className={actionSelectContainerClasses()}>
          <SelectField
            ref={(selectField) => { this.selectField = selectField; }}
            id={id}
            options={actions}
            disabled={loading || disabled}
            style={styles.selectStyle}
            placeholder={placeholder}
            onChange={this.handleOnChange}
            searchEnabled={searchEnabled}
            label="Action Select"
            hideLabel
            valueKey={valueKey}
            labelKey={labelKey}
          />
        </div>
        {
          loading ? null : (
            <div className="confirmation-block-wrapper">
              <div className={confirmationBlockClasses()}>
                <a
                  role="button"
                  tabIndex={0}
                  onClick={e => this.handleConfirmClick(e, selectedAction)}
                  className="confirm-button"
                >
                  <span className="confirm-button__icon">
                    <Icon icon="IconCheck" />
                  </span>
                </a>
                <a
                  role="button"
                  tabIndex={0}
                  onClick={e => this.handleCancelClick(e)}
                  className="cancel-button"
                >
                  <span className="cancel-button__icon">
                    <Icon icon="IconTimes" />
                  </span>
                </a>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

ActionSelect.propTypes = {
  actions: PropTypes.array,
  disabled: PropTypes.bool,
  flat: PropTypes.bool,
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** Key used for the label */
  labelKey: PropTypes.string,
  /** onChange function from props */
  onChange: PropTypes.func,
  /** Placeholder text */
  placeholder: PropTypes.node,
  /** Used to determine background color of Select, primary/#4571BA, default/#ECF5FD */
  primary: PropTypes.bool,
  requireConfirmation: PropTypes.bool,
  /** Override the inline-styles of the elements || **Not Recommended** */
  styles: PropTypes.shape({
    /** Styles passed into the SelectField component || **Not Recommended** */
    selectStyle: PropTypes.object,
  }),
  /** If true, search is enabled */
  searchEnabled: PropTypes.bool,
  /** Key used for the value */
  valueKey: PropTypes.string,
};

ActionSelect.defaultProps = {
  actions: [],
  disabled: false,
  flat: true,
  onChange: noop,
  placeholder: 'Take Action',
  primary: false,
  requireConfirmation: false,
  valueKey: 'value',
  labelKey: 'label',
  searchEnabled: false,
  styles: {
    selectStyle: {},
  },
};

export default ActionSelect;
