
import { composeWithDevTools } from '@redux-devtools/extension';
import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { countWatcher } from '../saga/countSaga.js';
import { rootWatcher } from '../saga/index.js';
import { cashReducer } from './cashReducer.js';
import { customerReducer } from './customerReducer.js';

const rootReducer = combineReducers({
	cash: cashReducer,
	customers: customerReducer,
})

const sagaMiddleware = createSagaMiddleware()

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) // thunk
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware))) // saga

sagaMiddleware.run(rootWatcher)