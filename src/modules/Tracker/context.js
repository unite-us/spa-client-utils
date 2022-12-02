import { createContext } from 'react';

const noop = () => null;
const TrackerContext = createContext(noop);

export default TrackerContext;
