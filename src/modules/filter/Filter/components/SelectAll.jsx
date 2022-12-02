import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class SelectAll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: props.hide,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.hide && !nextProps.hide) {
      this.setState({ hide: true });
    }
  }

  render() {
    const {
      onSelectAll,
      hide,
    } = this.props;

    const selectAllClass = () => classNames({
      'select-all': true,
      hidden: hide,
    });

    if (hide) {
      return null;
    }

    return (
      <div className={selectAllClass()}>
        <a
          onClick={onSelectAll}
          role="button"
          tabIndex={0}
        >
          Select All
        </a>
      </div>
    );
  }
}

SelectAll.propTypes = {
  hide: PropTypes.bool,
  onSelectAll: PropTypes.func.isRequired,
};

SelectAll.defaultProps = {
  hide: false,
};


export default SelectAll;
