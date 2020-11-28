import React from 'react';
import { Formik } from 'formik';

import TextInput from 'components/core/TextInput';
import Button from 'components/core/Button';

export default function OrderCreate() {
  return (
    <div>
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <TextInput
              type="title"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              errors={errors.title}
              touched={touched.title}
            />

            <TextInput
              type="bookingDate"
              name="bookingDate"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.bookingDate}
              errors={errors.bookingDate}
              touched={touched.bookingDate}
            />

            <TextInput
              type="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              errors={errors.name}
              touched={touched.name}
            />

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
              type="phone"
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              errors={errors.phone}
              touched={touched.phone}
            />

            <TextInput
              type="city"
              name="city"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
              errors={errors.city}
              touched={touched.city}
            />

            <TextInput
              type="country"
              name="country"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.country}
              errors={errors.country}
              touched={touched.country}
            />

            <TextInput
              type="street"
              name="street"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.street}
              errors={errors.street}
              touched={touched.street}
            />

            <TextInput
              type="zip"
              name="zip"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.zip}
              errors={errors.zip}
              touched={touched.zip}
            />

            <Button type="submit" disabled={isSubmitting}>
              Create
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
