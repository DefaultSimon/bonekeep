// @flow
import { createStore } from 'redux';
import rootReducer from './reducers/root';

const store =
  process.env.NODE_ENV === 'production'
    ? createStore(rootReducer)
    : createStore(
        rootReducer,
        // eslint-disable-next-line no-underscore-dangle
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          // eslint-disable-next-line no-underscore-dangle
          window.__REDUX_DEVTOOLS_EXTENSION__()
      );

export default store;
