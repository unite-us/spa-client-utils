import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Icon } from '@unite-us/ui';

class Search extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.resetValue = this.resetValue.bind(this);

    this.state = {
      value: '',
    };
  }

  onChange(event) {
    this.setState({ value: event.target.value });
    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(event.target.value);
    }
  }

  resetValue() {
    this.setState({ value: '' });
    if (_.isFunction(this.props.onChange)) {
      this.props.onChange('');
    }
  }

  render() {
    return (
      <div className="ui-filter-search">
        <label
          htmlFor={this.props.id}
          className="sr-only"
        >
          {this.props.label}
        </label>

        <input
          id={this.props.id}
          className="ui-filter-search__input choices__input"
          type="text"
          onChange={this.onChange}
          value={this.state.value}
          placeholder={this.props.placeholder}
        />

        <div className="ui-filter-search__buttons">
          {
            _.isEmpty(this.state.value) ?
              <Icon icon="IconSearch" size={16} color={'#67859E'} /> :
              <Icon icon="IconCross" size={12} color={'#67859E'} onClick={this.resetValue} />
          }
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Search;
