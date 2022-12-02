import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@unite-us/ui';
import getFileIconByContentType from './utils/getFileIconByContentType';

const FileThumbnail = (props) => {
  const {
    id,
    className,
    color,
    contentType,
    onThumbnailClick,
    size,
    style,
  } = props;

  const icon = getFileIconByContentType(contentType);

  return (
    <div className={`ui-file-thumbnail ${className}`}>
      {
        onThumbnailClick ?
          <a
            id={id}
            onClick={onThumbnailClick}
            role="button"
            tabIndex={0}
          >
            <Icon
              color={color}
              icon={icon}
              size={size}
              style={style}
            />
          </a> :

          <Icon
            color={color}
            icon={icon}
            size={size}
            style={style}
          />
      }
    </div>
  );
};

FileThumbnail.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Color of icon */
  color: PropTypes.string,
  /** Type of file (i.e.: `'image/png'`) */
  contentType: PropTypes.string.isRequired,
  /** clickable functionality. */
  onThumbnailClick: PropTypes.func,
  /** Size of FileThumbnail Icon */
  size: PropTypes.number,
  /** Override the inline-styles of the FileThumbnail Icon || **Not Recommended** */
  style: PropTypes.object,
};

FileThumbnail.defaultProps = {
  id: '',
  className: '',
  color: '',
  contentType: '',
  onThumbnailClick: null,
  size: 60,
  style: {},
};

export default FileThumbnail;
