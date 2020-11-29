import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import moment from 'moment';

import { updateOrder as acUpdateOrder } from 'store/reducers/ordersSlice';

import TextInput from 'components/core/TextInput';
import Button from 'components/core/Button';
import Spinner from 'components/Spinner';

import {
  Page,
  Heading,
  ErrorLabel,
  ButtonWrap,
} from 'providers/ThemeProvider/styled';

export default function OrderEdit() {
  const { orders } = useSelector((state) => state.orders);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const updateOrder = (id, data, cb) => dispatch(acUpdateOrder(id, data, cb));

  useEffect(() => {
    const selected = orders.find((o) => o.uid === id);
    setSelectedOrder(selected);
  }, [id, orders]);

  const { title, bookingDate } = selectedOrder || {};

  if (!selectedOrder) return null;

  return (
    <Page>
      <Link to={`/orders/${id}`}>&#8592; Back</Link>
      <Heading>Edit: {title}</Heading>

      {error && <ErrorLabel>Oops! Something went wrong.</ErrorLabel>}

      {!selectedOrder && <p>loading...</p>}

      <Formik
        initialValues={{
          title,
          bookingDate: moment(bookingDate).format('YYYY-MM-DD'),
        }}
        validate={(values) => {
          const errors = {};

          if (!values.title) {
            errors.title = 'Required';
          }

          if (!values.bookingDate) {
            errors.bookingDate = 'Required';
          }

          return errors;
        }}
        onSubmit={({ title, bookingDate }, { setSubmitting }) => {
          const updatedOrder = {
            title,
            bookingDate: new Date(bookingDate).getTime(),
          };

          updateOrder(id, updatedOrder, (err) => {
            setSubmitting(false);
            if (err) {
              setError(err);
            } else {
              history.push(`/orders`);
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
              placeholder="eg. YYYY-MM-DD"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.bookingDate}
              error={errors.bookingDate}
              touched={touched.bookingDate}
            />

            <ButtonWrap>
              <Button type="submit" disabled={isSubmitting}>
                Update
              </Button>
              {isSubmitting && <Spinner />}
            </ButtonWrap>
          </form>
        )}
      </Formik>
    </Page>
  );
}
