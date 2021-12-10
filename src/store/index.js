import { compose, combineReducers, createStore, applyMiddleware } from 'redux';

import session from './reducer';

const middleware = applyMiddleware();
const composeEnhancers = (
    typeof window !== 'undefined' &&
    process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;
const rootReducer = combineReducers({ session });

export default createStore(rootReducer, undefined, composeEnhancers(middleware));
