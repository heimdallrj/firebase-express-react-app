import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { createOrder as acCreateOrder } from 'store/reducers/ordersSlice';

import TextInput from 'components/core/TextInput';
import Button from 'components/core/Button';

import { Page, Heading, ErrorLabel } from 'providers/ThemeProvider/styled';

export default function OrderCreate() {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const createOrder = (data, cb) => dispatch(acCreateOrder(data, cb));

  return (
    <Page>
      <Link to="/">&#8592; Back</Link>
      <Heading>Create New Order</Heading>

      {error && <ErrorLabel>Oops! Something went wrong.</ErrorLabel>}

      <Formik
        initialValues={{
          title: '',
          bookingDate: '',
          name: '',
          email: '',
          phone: '',
          city: '',
          country: '',
          street: '',
          zip: '',
        }}
        validate={(values) => {
          const errors = {};

          if (!values.title) {
            errors.title = 'Required';
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
        onSubmit={(
          {
            title,
            bookingDate,
            city,
            country,
            street,
            zip,
            name,
            email,
            phone,
          },
          { setSubmitting }
        ) => {
          const newOrder = {
            title,
            bookingDate: new Date(bookingDate).getTime(),
            address: {
              city,
              country,
              street,
              zip,
            },
            customer: { name, email, phone },
          };

          createOrder(newOrder, (err) => {
            setSubmitting(false);
            if (err) {
              setError(err);
            } else {
              history.push('/orders');
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
              name="title"
              label="Title"
              placeholder="eg. New Order"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              error={errors.title}
              touched={touched.title}
            />

            <TextInput
              name="bookingDate"
              label="Booking Date"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.bookingDate}
              error={errors.bookingDate}
              touched={touched.bookingDate}
            />

            <TextInput
              name="name"
              label="Customer name"
              placeholder="eg. John Doe"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={errors.name}
              touched={touched.name}
            />

            <TextInput
              type="email"
              name="email"
              label="E-mail"
              placeholder="eg. john@example.com"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />

            <TextInput
              type="phone"
              name="phone"
              label="Phone"
              placeholder="eg. +94123456789"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              error={errors.phone}
              touched={touched.phone}
            />

            <TextInput
              name="street"
              label="Street"
              placeholder="eg. Edmonton road"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.street}
              error={errors.street}
              touched={touched.street}
            />

            <TextInput
              name="city"
              label="City"
              placeholder="eg. Colombo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
              error={errors.city}
              touched={touched.city}
            />

            <TextInput
              name="zip"
              label="Zip"
              placeholder="eg. 0005"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.zip}
              error={errors.zip}
              touched={touched.zip}
            />

            <TextInput
              name="country"
              label="Country"
              placeholder="eg. Sri Lanka"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.country}
              error={errors.country}
              touched={touched.country}
            />

            <Button type="submit" disabled={isSubmitting}>
              Create
            </Button>
          </form>
        )}
      </Formik>
    </Page>
  );
}
