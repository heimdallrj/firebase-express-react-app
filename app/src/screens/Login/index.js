import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { login as acLogin } from 'store/reducers/authSlice';

import TextInput from 'components/core/TextInput';
import Button from 'components/core/Button';

export default function Login() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();

  const login = (user, cb) => dispatch(acLogin(user, cb));

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
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
          login(values, (err, user) => {
            setSubmitting(false);
            history.push('/');
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
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              errors={errors.email}
              touched={touched.email}
            />

            <TextInput
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              errors={errors.password}
              touched={touched.password}
            />

            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
