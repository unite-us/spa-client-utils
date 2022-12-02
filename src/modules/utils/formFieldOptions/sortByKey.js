import { orderBy, toLower } from 'lodash';

const byKey = (option = {}, sortKey) => (
  toLower(option[sortKey])
);

const sortByKey = ({ options = [], sortKey = 'label', sortDirection = 'asc' }) => (
  orderBy(options, option => byKey(option, sortKey), sortDirection)
);

export default sortByKey;
