import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...restProps }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Route
      {...restProps}
      render={(props) => {
        if (!user) {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }

        // Authorised so render the component
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
