import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Main from './components/main';
import './App.css';

const store = ConfigureStore();

const App = ()=>{

  return(
      <Provider store={store}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
      </Provider>
  )
}


export default App;