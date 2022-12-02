import { GoogleApiWrapper } from 'google-maps-react';
import LocationAddressField from './index';

export const WrappedLocationAddressField = GoogleApiWrapper(
  props => ({
    apiKey: 'AIzaSyAl5_cHrQgCPbnJOPR82PY2gXf5H6eOlhQ',
    ...props,
  }),
)(LocationAddressField);
