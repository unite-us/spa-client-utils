import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from '@unite-us/ui';
import { hideAddButton, hideRemoveButton } from './utils';

class AddRemoveButtons extends Component {
  constructor(props) {
    super(props);
    this.onAddClick = this.onAddClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  onAddClick() {
    this.props.onAddClick(this.props.index);
  }

  onRemoveClick() {
    this.props.onRemoveClick(this.props.index);
  }

  render() {
    const { className, iconSize, index, length, customHideRemoveButton } = this.props;

    return (
      <div className={classnames('ui-add-remove-buttons', className)}>
        {
          !hideRemoveButton(length, index, customHideRemoveButton) &&
            <div className="ui-add-remove-buttons__remove mr-quarter">
              <a
                onClick={this.onRemoveClick}
                role="button"
                tabIndex={0}
                title="Remove"
              >
                <Icon icon="IconMinusCircle" size={iconSize} />
              </a>
            </div>
        }
        {
          !hideAddButton(length, index) &&
            <div className="ui-add-remove-buttons__add">
              <a
                onClick={this.onAddClick}
                role="button"
                tabIndex={0}
                title="Add"
              >
                <Icon icon="IconPlusCircle" size={iconSize} />
              </a>
            </div>
        }
      </div>
    );
  }
}

AddRemoveButtons.propTypes = {
  className: PropTypes.string,
  /** Custom function defaults to undefined */
  customHideRemoveButton: PropTypes.func,
  /** Called when add (+) icon button is clicked. */
  onAddClick: PropTypes.func.isRequired,
  /**
   * Called when remove (-) icon button is clicked.
   * @param {number} indexToRemove the index of item to remove
   */
  onRemoveClick: PropTypes.func.isRequired,
  /** Size in px of icons, defaults to 18px */
  iconSize: PropTypes.number,
  /** Current index in list of items. */
  index: PropTypes.number.isRequired,
  /** Current length of items. */
  length: PropTypes.number.isRequired,
};

AddRemoveButtons.defaultProps = {
  className: '',
  customHideRemoveButton: undefined,
  iconSize: 18,
};

export default AddRemoveButtons;
