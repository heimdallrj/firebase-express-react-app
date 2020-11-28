import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from 'screens/Login';
import Home from 'screens/Home';
import Orders from 'screens/Orders';
import OrderSingle from 'screens/Orders/Single';
import OrderCreate from 'screens/Orders/Create';

function App() {
  return (
    <Router>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/orders">
        <Orders />
      </Route>
      <Route exact path="/orders/:id">
        <OrderSingle />
      </Route>
      <Route exact path="/orders/create">
        <OrderCreate />
      </Route>
      <Route exact path="/logout">
        <p>Logout</p>
      </Route>
    </Router>
  );
}

export default App;
