import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrders as acFetchOrders } from 'store/reducers/ordersSlice';

import TextInput from 'components/core/TextInput';
import {
  Page,
  Heading,
  Tabel,
  TabelRow,
  TabelHead,
  TabelBody,
  TabelCell,
} from 'providers/ThemeProvider/styled';

export default function Orders() {
  const { orders, loading } = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  const fetchOrders = () => dispatch(acFetchOrders());

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Page>
      <Link to="/">&#8592; Back</Link>
      <Heading>List all the orders</Heading>

      {loading && <p>loading...</p>}

      {!loading && orders.length > 0 && (
        <>
          <TextInput label="Filter:" />

          <Tabel>
            <TabelRow>
              <TabelHead>Title</TabelHead>
              <TabelHead>Booking Date</TabelHead>
              <TabelHead>Address</TabelHead>
              <TabelHead>Customer</TabelHead>
            </TabelRow>
            <TabelBody>
              {orders.map(({ uid, title }) => (
                <TabelRow key={uid}>
                  <TabelCell>{title}</TabelCell>
                  <TabelCell>Date</TabelCell>
                  <TabelCell>Address</TabelCell>
                  <TabelCell>Customer</TabelCell>
                </TabelRow>
              ))}
            </TabelBody>
          </Tabel>
        </>
      )}

      {!loading && orders.length === 0 && <p>No order(s) available.</p>}
    </Page>
  );
}
