import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/Redux';
import { ReduxTable } from './src/ReduxTable';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ReduxTable />
        </div>
      </div>
    </Provider>
  );
}

export default App;
