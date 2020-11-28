import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';

import TextInput from 'components/core/TextInput';
import Button from 'components/core/Button';

import { Page, Heading } from 'providers/ThemeProvider/styled';

export default function OrderCreate() {
  return (
    <Page>
      <Link to="/">&#8592; Back</Link>
      <Heading>Create New Order</Heading>

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
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
          }, 400);
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
              type="title"
              name="title"
              label="Title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              error={errors.title}
              touched={touched.title}
            />

            <TextInput
              type="bookingDate"
              name="bookingDate"
              label="Booking Date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.bookingDate}
              error={errors.bookingDate}
              touched={touched.bookingDate}
            />

            <TextInput
              type="name"
              name="name"
              label="Customer name"
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
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              error={errors.phone}
              touched={touched.phone}
            />

            <TextInput
              type="city"
              name="city"
              label="City"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
              error={errors.city}
              touched={touched.city}
            />

            <TextInput
              type="country"
              name="country"
              label="Country"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.country}
              error={errors.country}
              touched={touched.country}
            />

            <TextInput
              type="street"
              name="street"
              label="Street"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.street}
              error={errors.street}
              touched={touched.street}
            />

            <TextInput
              type="zip"
              name="zip"
              label="Zip"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.zip}
              error={errors.zip}
              touched={touched.zip}
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
