import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioField } from '@unite-us/ui';
import classNames from 'classnames';
import { get } from 'lodash';

const SHORT_LABEL_MAX_LENGTH = 40;

const columnClass = (label, isLabelColumn) => {
  const longLabel = get(label, 'length', 0) > SHORT_LABEL_MAX_LENGTH;

  if (!longLabel) {
    return classNames({
      'radio-column': isLabelColumn,
      'col-sm-4': isLabelColumn,
      'col-sm-8': !isLabelColumn,
    });
  }

  return classNames({
    'radio-column': isLabelColumn,
    'col-sm-6': true,
  });
};

class ConsentTypeChoice extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect() {
    this.props.onSelect(this.props.type);
  }

  render() {
    const { children, dropzone, label, selectedType, type } = this.props;
    const isSelected = type === selectedType;

    return (
      <div className="consent-type-choice">
        <div className="row">
          <div className={columnClass(label, true)}>
            <RadioField
              id={type}
              name={type}
              value={isSelected ? type : ''}
              onChange={this.onSelect}
              options={[{ label, value: type }]}
            />
          </div>
          <div className={columnClass(label, false)}>
            {
              isSelected ? (
                <div className="consent-type-choice__children">
                  {children}
                </div>
              ) : null
            }
          </div>
        </div>
        {
          isSelected && dropzone ? (
            <div className="row consent-type-choice__dropzone">
              <div className="col-sm-12">
                {dropzone}
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
}

ConsentTypeChoice.propTypes = {
  /** Children content shown on the right side of the radio field */
  children: PropTypes.node.isRequired,
  /** Represents the dropzone file transfer if addeded */
  dropzone: PropTypes.any,
  /** Label of the RadioField */
  label: PropTypes.node.isRequired,
  /** Function when radio is selected */
  onSelect: PropTypes.func.isRequired,
  /** Value of what is currently selected via parent component */
  selectedType: PropTypes.string.isRequired,
  /** Value of ConsentTypeChoice component */
  type: PropTypes.string.isRequired,
};

ConsentTypeChoice.defaultProps = {
  dropzone: null,
};

export default ConsentTypeChoice;
