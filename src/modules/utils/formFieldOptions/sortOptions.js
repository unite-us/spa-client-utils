import moveOptionToEnd from './moveOptionToEnd';
import sortByKey from './sortByKey';

const sortOptions = ({
  moveToEndValue,
  moveToEndValueKey = 'value',
  options = [],
  sortKey = 'label',
  sortDirection = 'asc',
}) => (
  moveOptionToEnd({
    options: sortByKey({ options, sortKey, sortDirection }),
    value: moveToEndValue,
    valueKey: moveToEndValueKey,
  })
);

export default sortOptions;
