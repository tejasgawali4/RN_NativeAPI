import React from 'react';
import PlacesNavigator from './navigation/PlacesNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import placeReducer from './store/places-reducer';

export default function App() {

  const rootReducer = combineReducers({
      places : placeReducer
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <PlacesNavigator/>
    </Provider>
  );
}

