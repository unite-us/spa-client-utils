import { buildOptions } from './';
import { isMultiLevel } from '../../Filter/utils';

export default function formatDropdownOptions(options) {
  if (isMultiLevel(options)) {
    return buildOptions({ options });
  }
  return options;
}
