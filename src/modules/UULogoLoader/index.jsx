import React from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { ICONS } from './constants';

const UULogoLoader = (props) => {
  const {
    id,
    description,
    height,
    width,
    style,
  } = props;
  const icon = ICONS.IconUULogoLoader;
  const iconImage = get(icon, 'markup', null);
  const viewBox = get(icon, 'viewBox', null);

  return (
    <div
      className="ui-uu-logo-loader"
      id={id}
      style={style}
    >
      <svg
        height={height}
        width={width}
        viewBox={viewBox}
      >
        {iconImage}
      </svg>
      {
        !isEmpty(description) &&
        <p className="ui-uu-logo-loader__text text-center">{description}</p>
      }
    </div>
  );
};

UULogoLoader.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** text to appear below UULogoLoader image */
  description: PropTypes.string,
  /** height of UULogoLoader image.<br/>
   * **NOTE:** if both height and width are supplied,
   * the smaller number of the two will take precedence.
   * The image will automatically calculate aspect ratio.
  */
  height: PropTypes.number,
  /** width of UULogoLoader image.<br/>
   * **NOTE:** if both height and width are supplied,
   * the smaller number of the two will take precedence.
   * The image will automatically calculate aspect ratio.
  */
  width: PropTypes.number,
  /** Override the inline-styles of the UULogoLoader || **Not Recommended** */
  style: PropTypes.object,
};

UULogoLoader.defaultProps = {
  id: '',
  description: '',
  height: null,
  width: null,
  style: {},
};

export default UULogoLoader;
