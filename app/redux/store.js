// @flow
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers/root';
import { soundMiddleware } from '../core/sound/SoundMiddleware';

const middleware = [soundMiddleware];

const store =
  process.env.NODE_ENV === 'production'
    ? createStore(rootReducer, applyMiddleware(...middleware))
    : createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__
          ? compose(
              applyMiddleware(...middleware),
              window.__REDUX_DEVTOOLS_EXTENSION__()
            )
          : applyMiddleware(...middleware)
      );

export default store;
