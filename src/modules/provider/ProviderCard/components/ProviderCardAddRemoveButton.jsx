import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from 'lodash';
import AddRemoveButtons from 'modules/AddRemoveButtons';

class ProviderCardAddRemoveButton extends Component {
  constructor(props) {
    super(props);

    this.providerCardAdd = this.providerCardAdd.bind(this);
  }

  providerCardAdd() {
    const { destinationLatLng, onAddClick } = this.props;

    onAddClick(destinationLatLng);
  }

  render() {
    const {
      className,
      onRemoveClick,
      selected,
    } = this.props;

    return (
      <div
        className={
          classnames('provider-card-add-remove-button', className)
        }
      >
        <AddRemoveButtons
          index={selected ? 2 : 0}
          length={selected ? 2 : 1}
          onAddClick={this.providerCardAdd}
          onRemoveClick={onRemoveClick}
        />
      </div>
    );
  }
}

ProviderCardAddRemoveButton.propTypes = {
  className: PropTypes.string,
  destinationLatLng: PropTypes.array,
  onAddClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  selected: PropTypes.bool,
};

ProviderCardAddRemoveButton.defaultProps = {
  className: '',
  destinationLatLng: [],
  onAddClick: noop,
  onRemoveClick: noop,
  selected: false,
};

export default ProviderCardAddRemoveButton;
