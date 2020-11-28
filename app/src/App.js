import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ProtectedRoute from 'components/ProtectedRoute';

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

      <ProtectedRoute exact path="/" component={Home} />

      <ProtectedRoute exact path="/orders" component={Orders} />

      <ProtectedRoute exact path="/orders/create" component={OrderCreate} />

      <ProtectedRoute exact path="/orders/:id" component={OrderSingle} />

      <Route exact path="/logout">
        <p>Logout</p>
      </Route>
    </Router>
  );
}

export default App;
