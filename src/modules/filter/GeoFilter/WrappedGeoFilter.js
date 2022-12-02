import { GoogleApiWrapper } from 'google-maps-react';
import GeoFilter from './index';

export const WrappedGeoFilter = GoogleApiWrapper(
  props => ({
    apiKey: 'AIzaSyAl5_cHrQgCPbnJOPR82PY2gXf5H6eOlhQ',
    ...props,
  }),
)(GeoFilter);
