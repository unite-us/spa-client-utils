export const styles = [
  {
    featureType: 'landscape.man_made',
    stylers: [
      { color: '#b2d9fb' },
      { visibility: 'off' },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      { visibility: 'off' },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      { visibility: 'off' },
    ],
  },
  {
    featureType: 'poi.government',
    stylers: [
      { visibility: 'on' },
    ],
  },
  {
    featureType: 'poi.medical',
    stylers: [
      { visibility: 'on' },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      { color: '#d1eafe' },
    ],
  },
];

const printStyles = [
  {
    featureType: 'landscape.man_made',
    stylers: [
      { color: '#b2d9fb' },
      { visibility: 'off' },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      { visibility: 'off' },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [
      { color: '#ffffff' },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      { visibility: 'off' },
    ],
  },
  {
    featureType: 'poi.government',
    stylers: [
      { visibility: 'on' },
    ],
  },
  {
    featureType: 'poi.medical',
    stylers: [
      { visibility: 'on' },
    ],
  },
  {
    featureType: 'poi.park',
    stylers: [
      { visibility: 'on' },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      { color: '#eef0f0' },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      { color: '#000000' },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      { color: '#fdffff' },
      { weight: 4.5 },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      { color: '#7e8080' },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      { color: '#000000' },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      { color: '#e3e5e5' },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      { color: '#e2e5e5' },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      { color: '#000000' },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.stroke',
    stylers: [
      { color: '#ffffff' },
      { weight: 4.5 },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      { visibility: 'off' },
    ],
  },
];

const mapScheme = {
  clickableIcons: false,
  disableDefaultUI: true,
  draggableCursor: 'unset',
  gestureHandling: 'none',
  styles,
  zoom: 17,

  printStyles,
};

export default mapScheme;
