import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, Popover } from '@unite-us/ui';
import { getAnchorId } from './utils';
import InfoPanel from '../InfoPanel/InfoPanel';

class InfoPopover extends Component {
  constructor(props) {
    super(props);
    this.togglePopover = this.togglePopover.bind(this);
    this.isTooltip = this.isTooltip.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);

    this.state = {
      popoverOpen: false,
    };
  }

  handleMouseHover(value) {
    this.setState({
      popoverOpen: this.isTooltip() && !this.props.hiddenTooltip && value,
    });
  }

  togglePopover() {
    this.setState({
      popoverOpen: (!this.isTooltip() || !this.props.hiddenTooltip) && !this.state.popoverOpen,
    });
  }

  isTooltip() {
    return 'tooltipText' in this.props;
  }

  render() {
    const { children, className, id, placement, boundariesElement } = this.props;
    const anchorId = getAnchorId(id);

    return (
      <div
        className={classNames(className, 'info-popover')}
        onMouseOver={() => this.handleMouseHover(true)}
        onFocus={() => this.handleMouseHover(true)}
        onMouseOut={() => this.handleMouseHover(false)}
        onBlur={() => this.handleMouseHover(true)}
      >
        {this.isTooltip() && children
        }

        {!this.isTooltip() && <a
          id={anchorId}
          onClick={this.togglePopover}
          role="presentation"
        >
          <Icon icon="IconInfoCircle" className="info-popover__icon" />
        </a>
        }
        <Popover
          className={className}
          body={(this.isTooltip() && <InfoPanel message={this.props.tooltipText} />) || children}
          isOpen={this.state.popoverOpen}
          placement={placement}
          target={anchorId}
          toggle={this.togglePopover}
          hideArrow={this.isTooltip()}
          boundariesElement={boundariesElement}
        />
      </div>
    );
  }
}

InfoPopover.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** text to show when using the popover as a tooltip */
  // eslint-disable-next-line react/require-default-props
  tooltipText: PropTypes.string,
  id: PropTypes.string.isRequired,
  /** whether the tooltip is hidden or not */
  hiddenTooltip: PropTypes.bool,
  /** Boundaries for popper, can be scrollParent, window, viewport, or any DOM element */
  boundariesElement: PropTypes.string,
  placement: PropTypes.oneOf([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
  ]),
};

InfoPopover.defaultProps = {
  children: '',
  className: '',
  hiddenTooltip: true,
  placement: 'top',
  boundariesElement: '',
};

export default InfoPopover;
