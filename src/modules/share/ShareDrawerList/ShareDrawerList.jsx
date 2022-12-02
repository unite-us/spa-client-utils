import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get } from 'lodash';
import ShareDrawerListItem from '../ShareDrawerListItem';

const ShareDrawerList = ({
  className,
  displayProperty,
  listItems,
  keyProperty,
}) => (
  <ul className={classNames('share-drawer-list', className)}>
    {
      listItems.map(item => (
        <ShareDrawerListItem key={get(item, keyProperty)}>
          {get(item, displayProperty)}
        </ShareDrawerListItem>
      ))
    }
  </ul>
);

ShareDrawerList.propTypes = {
  /** class name */
  className: PropTypes.string,
  /** list item property for display, defaults to 'name' */
  displayProperty: PropTypes.string,
  /** array of list items */
  listItems: PropTypes.arrayOf(PropTypes.object),
  /** list item property used as key, defaults to 'id' */
  keyProperty: PropTypes.string,
};

ShareDrawerList.defaultProps = {
  className: '',
  displayProperty: 'name',
  listItems: [],
  keyProperty: 'id',
};

export default ShareDrawerList;
