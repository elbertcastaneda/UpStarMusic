import React from 'react';

import { createStore, applyMiddleware } from 'redux';

import { MongoClient } from 'mongodb';

import mongoose from 'mongoose';

import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import Routes from './router';
import './seeds';

mongoose.Promise = Promise;

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

client.connect(() => {
  const db = client.db('upstar_music');

  window.db = db;
  mongoose.connect('mongodb://localhost/upstar_music', { useNewUrlParser: true });
    mongoose.connection
      .once('open', () => {
        ReactDOM.render(<App />, document.getElementById('root'));
      })
      .on('error', (error) => {
        console.warn('Warning', error);
      });
});
