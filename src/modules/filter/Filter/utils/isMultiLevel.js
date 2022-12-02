const isMultiLevel = opts => opts.some(({ children }) => children && children.length);

export default isMultiLevel;
