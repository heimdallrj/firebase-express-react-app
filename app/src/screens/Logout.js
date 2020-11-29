import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logOut as acLogout } from 'store/reducers/authSlice';

export default function Logout() {
  const dispatch = useDispatch();

  const logOut = () => dispatch(acLogout());

  useEffect(() => {
    logOut();
  }, []);

  return <Redirect to="/login" />;
}
