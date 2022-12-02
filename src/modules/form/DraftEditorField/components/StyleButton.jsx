import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class StyleButton extends PureComponent {
  constructor() {
    super();
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e) {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    const btnClasses = () => classNames({
      'RichEditor-styleButton': true,
      'RichEditor-activeButton': this.props.active,
      bold: this.props.style === 'BOLD',
      italic: this.props.style === 'ITALIC',
      underline: this.props.style === 'UNDERLINE',
    });

    return (
      <span
        className={btnClasses()}
        onMouseDown={this.onToggle}
        role="button"
        tabIndex={0}
      >
        {this.props.label}
      </span>
    );
  }
}

StyleButton.propTypes = {
  active: PropTypes.bool.isRequired,
  label: PropTypes.node.isRequired,
  onToggle: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired,
};

export default StyleButton;
