import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ProtectedRoute from 'components/ProtectedRoute';

import Login from 'screens/Login';
import Home from 'screens/Home';
import Orders from 'screens/Orders';
import OrderSingle from 'screens/Orders/Single';
import OrderCreate from 'screens/Orders/Create';
import Logout from 'screens/Logout';

import { Container } from 'providers/ThemeProvider/styled';

function App() {
  return (
    <Container>
      <Router>
        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/logout">
          <Logout />
        </Route>

        <ProtectedRoute exact path="/" component={Home} />

        <ProtectedRoute exact path="/orders" component={Orders} />

        <ProtectedRoute exact path="/orders/:id" component={OrderSingle} />

        <ProtectedRoute exact path="/create-order" component={OrderCreate} />
      </Router>
    </Container>
  );
}

export default App;
