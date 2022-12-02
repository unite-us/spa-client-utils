import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { ICONS } from './constants';

const UULogoWithText = (props) => {
  const {
    color,
    id,
    height,
    width,
    style,
  } = props;

  const icon = ICONS.LogoShieldText;
  const iconImage = get(icon, 'markup', null);
  const viewBox = get(icon, 'viewBox', null);

  return (
    <div
      className="ui-logo-with-text"
      id={id}
      style={style}
    >
      <svg
        className="ui-logo-with-text__icon"
        height={height}
        width={width}
        viewBox={viewBox}
        fill={color}
      >
        {iconImage}
      </svg>
    </div>
  );
};

UULogoWithText.propTypes = {
  /** color of logo */
  color: PropTypes.string,
  /** id for reference */
  id: PropTypes.string,
  /** height of UULogoWithText image.<br/>
   * **NOTE:** if both height and width are supplied,
   * the smaller number of the two will take precedence.
   * The image will automatically calculate aspect ratio.
  */
  height: PropTypes.number,
  /** width of UULogoWithText image.<br/>
   * **NOTE:** if both height and width are supplied,
   * the smaller number of the two will take precedence.
   * The image will automatically calculate aspect ratio.
  */
  width: PropTypes.number,
  /** Override the inline-styles of the UULogoWithText || **Not Recommended** */
  style: PropTypes.object,
};

UULogoWithText.defaultProps = {
  color: '#2C405A',
  id: '',
  height: null,
  width: null,
  style: {},
};

export default UULogoWithText;
