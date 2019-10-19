import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Reboot from 'material-ui/es/Reboot/Reboot';

import NavigationBar from './components/NavigationBar/NavigationBar';
import Root from './components/Root/Root';

const App = () => (
  <div>
    <Reboot />
    <NavigationBar />
    <Route path="/" exact component={Root} />
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
);
