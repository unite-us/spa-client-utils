import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import extendLodash from './modules/utils/extendLodash';
import reducers from './reducers';
import './stylesheets/main.scss';

extendLodash();

const store = createStore(reducers, {}, window.devToolsExtension ? window.devToolsExtension() : f => f);

const Wrapper = ({ children }) => (
  <div className="wrapper">
    <Provider store={store}>
      <IntlProvider locale="en">
        {children}
      </IntlProvider>
    </Provider>
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
