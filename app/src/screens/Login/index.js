import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { login as acLogin } from 'store/reducers/authSlice';

import TextInput from 'components/core/TextInput';
import Button from 'components/core/Button';
import Spinner from 'components/Spinner';

import {
  Page,
  Heading,
  ErrorLabel,
  ButtonWrap,
} from 'providers/ThemeProvider/styled';

export default function Login() {
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const login = (user, cb) => dispatch(acLogin(user, cb));

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <Heading>Login</Heading>

      {error && <ErrorLabel>Oops! Something went wrong.</ErrorLabel>}

      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};

          if (!values.password) {
            errors.password = 'Required';
          }

          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          login(values, (err) => {
            setSubmitting(false);
            if (err) {
              setError(err);
            } else {
              history.push('/');
            }
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextInput
              type="email"
              name="email"
              label="E-mail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />

            <TextInput
              type="password"
              name="password"
              label="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />

            <ButtonWrap>
              <Button type="submit" disabled={isSubmitting}>
                Login
              </Button>
              {isSubmitting && <Spinner />}
            </ButtonWrap>
          </form>
        )}
      </Formik>
    </Page>
  );
}
