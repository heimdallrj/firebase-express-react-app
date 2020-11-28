import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { fetchOrders as acFetchOrders } from 'store/reducers/ordersSlice';

import TextInput from 'components/core/TextInput';
import {
  Page,
  Heading,
  ErrorLabel,
  Tabel,
  TabelRow,
  TabelHead,
  TabelBody,
  TabelCell,
} from 'providers/ThemeProvider/styled';

export default function Orders() {
  const { orders: unsortedOrders, loading } = useSelector(
    (state) => state.orders
  );
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const fetchOrders = () => dispatch(acFetchOrders());

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const sortedOrders = unsortedOrders
      .slice()
      .sort((a, b) => b.bookingDate > a.bookingDate);
    setOrders(sortedOrders);
  }, [unsortedOrders]);

  useEffect(() => {
    if (keyword) {
      const filteredOrders = unsortedOrders.filter(({ title }) =>
        title.includes(keyword)
      );
      setOrders(filteredOrders);
    }
  }, [keyword]);

  return (
    <Page>
      <Link to="/">&#8592; Back</Link>
      <Heading>List all the orders</Heading>

      {error && <ErrorLabel>Oops! Something went wrong.</ErrorLabel>}

      {loading && <p>loading...</p>}

      {!loading && unsortedOrders.length > 0 && (
        <TextInput
          label="Filter by title:"
          onChange={(evt) => setKeyword(evt.target.value)}
        />
      )}

      {!loading && orders.length > 0 && (
        <Tabel>
          <TabelRow>
            <TabelHead>Title</TabelHead>
            <TabelHead>Booking Date</TabelHead>
            <TabelHead>Address</TabelHead>
            <TabelHead>Customer</TabelHead>
          </TabelRow>
          <TabelBody>
            {orders.map(({ uid, title, bookingDate, address, customer }) => {
              const { street, city, zip, country } = address || {};
              const { name } = customer || {};
              return (
                <TabelRow
                  key={uid}
                  onClick={
                    // Due to some invalid data (no uid :/)
                    uid ? () => history.push(`/orders/${uid}`) : () => {}
                  }
                >
                  <TabelCell>{title}</TabelCell>
                  <TabelCell>{`${moment(bookingDate).format(
                    'DD.MM.YYYY'
                  )}`}</TabelCell>
                  <TabelCell>{`${street} ${city} ${zip} ${country}`}</TabelCell>
                  <TabelCell>{name}</TabelCell>
                </TabelRow>
              );
            })}
          </TabelBody>
        </Tabel>
      )}

      {!loading && orders.length === 0 && <p>No order(s) available.</p>}
    </Page>
  );
}
