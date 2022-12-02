import { join, compact, get } from 'lodash';

const stringifyAddress = (address = {}) => (
  join(compact([
    `${get(address, 'line_1.input.value', '')}`,
    `${get(address, 'city.input.value', '')}`,
    `${get(address, 'state.input.value', '')}${address.state?.input?.value ? ' ' : ''}${get(address, 'postal_code.input.value', '')}`,
  ]), ', ')
);

export default stringifyAddress;
