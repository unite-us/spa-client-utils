import { uuPick } from '../extendLodash';

const KEYS = [
  'value',
  'name',
  'onBlur',
  'onChange',
  'onDragStart',
  'onDrop',
  'onFocus',
];

export default function inputProps(field) {
  return uuPick(field, KEYS);
}
