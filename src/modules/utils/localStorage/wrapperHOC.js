import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return { userId: state.user.id };
}

function storageAvailable() {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

const wrapperHOC = (key, Comp) => {
  const LSHOC = class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        key,
        isAvailable: storageAvailable(),
      };

      this.setItem = this.setItem.bind(this);
      this.getItem = this.getItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
    }

    setItem(data) {
      if (!this.state.isAvailable) {
        return null;
      }
      if (!this.props.userId) {
        throw new Error('User not in state');
      }
      return localStorage.setItem(
        this.props.userId.concat(this.state.key),
        JSON.stringify(data),
      );
    }

    getItem() {
      if (!this.state.isAvailable) {
        return null;
      }
      if (!this.props.userId) {
        throw new Error('User not in state');
      }
      return JSON.parse(localStorage.getItem(this.props.userId.concat(this.state.key)));
    }

    removeItem() {
      if (!this.state.isAvailable) {
        return null;
      }
      if (!this.props.userId) {
        throw new Error('User not in state');
      }
      return localStorage.removeItem(this.props.userId.concat(this.state.key));
    }

    render() {
      if (!this.props.userId) {
        return (
          <p className="text-center">Loading...</p>
        );
      }
      return (
        <Comp
          {...this.props}
          {...this.state}
          setItem={this.setItem}
          getItem={this.getItem}
          removeItem={this.removeItem}
        />
      );
    }
  };

  LSHOC.propTypes = {
    userId: PropTypes.string,
  };

  LSHOC.defaultProps = {
    userId: '',
  };

  return connect(mapStateToProps)(LSHOC);
};

export default wrapperHOC;
