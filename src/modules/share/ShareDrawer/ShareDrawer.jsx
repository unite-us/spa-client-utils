import React from 'react';
import { PropTypes } from 'prop-types';
import { Drawer } from '@unite-us/ui';
import { pluralize } from 'humanize-plus';
import classNames from 'classnames';
import { noop } from 'lodash';
import ShareDrawerList from '../ShareDrawerList';
import ShareForm from '../ShareForm';

const ShareDrawer = ({ className, groups, shareFormProps, open, ...props }) => (
  <Drawer
    className={classNames('share-drawer', className)}
    secondary
    open={open}
    {...props}
  >
    <h4 className="share-drawer__header">
      {`Share ${groups.length} ${pluralize(groups.length, 'Organization')}`}
    </h4>
    <ShareForm
      className={classNames('share-drawer__share-form', shareFormProps.className)}
      hideCancelButton
      initialValues={{
        messageType: 'sms',
      }}
      open={open}
      sharedGroups={groups}
      {...shareFormProps}
    />
    <ShareDrawerList listItems={groups} />
  </Drawer>
);

ShareDrawer.propTypes = {
  /** class name */
  className: PropTypes.string,
  /** groups to display in list */
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  /** controls drawer open/close, defaults to false */
  open: PropTypes.bool,
  /** override default ShareForm prop values. */
  shareFormProps: PropTypes.shape({
    ...ShareForm.propTypes,
    className: PropTypes.string,
    /** redux form method to connect to redux state, defaults to state => state.form */
    getFormStore: PropTypes.func,
    /** ShareForm id */
    id: PropTypes.string.isRequired,
    /** called on send email/phone */
    onSend: PropTypes.func,
    /** tracking call made sharing group data */
    onTrackShare: PropTypes.func,
    /** base url for shares app */
    sharesUrl: PropTypes.string.isRequired,
  }).isRequired,
  /** drawer width, defaults to 380px */
  width: PropTypes.string,
};

ShareDrawer.defaultProps = {
  className: '',
  groups: [],
  open: false,
  shareFormProps: {
    onSend: noop,
    onTrackShare: noop,
  },
  width: '380px',
};

export default ShareDrawer;
