import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  compact,
  get,
  includes,
  isNull,
  reduce,
} from 'lodash';
import {
  Toggle,
  Header,
  ExpandableContent,
  GradientSvg,
} from './components';

class ExpandableContainer extends Component {
  constructor(props) {
    super(props);
    this.getChildHeight = this.getChildHeight.bind(this);
    this.getContentStyle = this.getContentStyle.bind(this);
    this.init = this.init.bind(this);
    this.onResize = this.onResize.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      canExpand: false,
      childHeight: 0,
      collapsedHeight: 0,
      open: props.isOpen || false,
    };
  }

  componentDidMount() {
    this.init();
    window.addEventListener('resize', this.onResize);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({ open: nextProps.isOpen });
    }

    if (nextProps.forceResize && nextProps.forceResize !== this.props.forceResize) {
      this.onResize();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this.getChildHeight();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.getChildHeight();
  }

  getChildHeight() {
    const { useFirstChildHeight } = this.props;
    const child = this.el.querySelector('.expandable-container__content-children');

    let childHeight = child.clientHeight;

    if (useFirstChildHeight) {
      const list = this.el.getElementsByClassName('expandable-container__content-children');
      childHeight = get(list[0], 'childNodes[0].clientHeight', childHeight);
    }

    this.setState({
      canExpand: childHeight > this.state.collapsedHeight,
      childHeight,
    });
  }

  getContentStyle() {
    return {
      height: this.state.open || !this.state.canExpand ? `${this.state.childHeight}px` : this.props.collapsedHeight,
    };
  }

  init() {
    // create a temporary div to compute the real height of the potentially collapsed container
    const contentEl = document.createElement('div');
    const elStyles = `height: ${this.props.collapsedHeight}; position: absolute;`;
    contentEl.setAttribute('style', elStyles);
    this.el.appendChild(contentEl);
    const elHeight = contentEl.clientHeight;
    this.el.removeChild(contentEl);

    this.setState({
      collapsedHeight: elHeight,
    }, this.getChildHeight);
  }

  toggle(e) {
    e.preventDefault();

    if (!this.props.controlled) {
      this.setState({ open: !this.state.open });
    }

    if (this.props.onToggle) {
      this.props.onToggle(e);
    }
  }

  render() {
    const {
      children,
      readOnlyToggleText,
      header,
      id,
      lessText,
      moreText,
      style,
      togglePosition,
      hideToggle,
      showGradient,
    } = this.props;

    const toggleClass = () => classNames({
      'expandable-container__toggle': true,
      open: this.state.open,
      hidden: !this.state.canExpand,
    }, togglePosition);

    const expandableClass = () => classNames({
      'expandable-container__content': true,
      open: this.state.open,
    });

    const headerEl = (
      header ? <Header key={header} header={header} /> : null
    );

    const expandableContent = children ? (
      <ExpandableContent
        className={expandableClass()}
        key={`${header}-content`}
        style={this.getContentStyle()}
      >
        {children}
      </ExpandableContent>
    ) : null;

    const toggleEl = hideToggle ? null : (
      <Toggle
        className={toggleClass()}
        id={id}
        key={`${header}-toggle`}
        onClick={this.toggle}
        open={this.state.open}
        text={this.state.open ? lessText : moreText}
        readOnly={readOnlyToggleText}
      />
    );

    const gradientColor = reduce(style, (acc, value, key) =>
      (includes(['background', 'backgroundColor'], key) ? value : acc)
      , 'white');

    const gradientEl = showGradient && this.state.canExpand ? (
      <GradientSvg
        key={`${header}-gradient`}
        open={this.state.open}
        color={gradientColor}
        id={id}
      />
    ) : null;

    const items = compact([
      headerEl,
      ...(togglePosition.includes('top') ?
        [toggleEl, expandableContent, gradientEl] :
        [expandableContent, gradientEl, toggleEl]
      ),
    ]);
    return (
      <div
        className="expandable-container"
        id={id}
        ref={(div) => { this.el = div; }}
        style={style}
      >
        {items.map(item => item)}
      </div>
    );
  }
}

ExpandableContainer.propTypes = {
  /** Items that are passed to ExpandableContent */
  children: PropTypes.node,
  /** the height of the container while collapsed */
  collapsedHeight: PropTypes.string.isRequired,
  /** use the height of the first child while collapsed */
  useFirstChildHeight: PropTypes.bool,
  /** boolean that determines if the component toggling is controlled externally */
  controlled: PropTypes.bool,
  /** boolean that resizes the height depending on actions taken (radio, button, etc) */
  forceResize: PropTypes.bool,
  /** header text for component */
  header: PropTypes.string,
  /** id for main component used to build related ids */
  id: PropTypes.string.isRequired,
  /** prop used to determine if the container is open, used in conjunction with onToggle */
  isOpen: function (props, propName, componentName) { // eslint-disable-line consistent-return, func-names, object-shorthand
    if (props.controlled === true && isNull(propName)) {
      return new Error(`When the prop 'controlled' is set to true, the '${propName}' prop for ${componentName} must be set to control toggling`);
    }
  },
  /** boolean to hide the toggle button, used in conjunction with controlled */
  hideToggle: PropTypes.bool,
  /** toggle text for expanded state */
  lessText: PropTypes.string.isRequired,
  /** toggle text for collapsed state */
  moreText: PropTypes.string.isRequired,
  /** function to that is called when the Toggle component is clicked */
  onToggle: PropTypes.func,
  /** boolean to make the toggle text read only or a functional toggle */
  readOnlyToggleText: PropTypes.bool,
  /** styles object, override if feeling adventurous  */
  style: PropTypes.object,
  /** string prop to control where the toggle is rendered in relation to the expanding content */
  togglePosition: PropTypes.oneOf(['left', 'right', 'top-right', 'top-left']),
  /** Boolean value to display or hide gradient */
  showGradient: PropTypes.bool,
};

ExpandableContainer.defaultProps = {
  children: null,
  collapsedHeight: '10em',
  controlled: false,
  forceResize: false,
  header: null,
  isOpen: false,
  lessText: 'Read Less',
  moreText: 'Read More',
  onToggle: null,
  style: {},
  togglePosition: 'left',
  hideToggle: false,
  readOnlyToggleText: false,
  showGradient: true,
  useFirstChildHeight: false,
};

export default ExpandableContainer;
