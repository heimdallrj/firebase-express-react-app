import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import {
  Page,
  Heading,
  ErrorLabel,
  Tabel,
  TabelRow,
  TabelBody,
  TabelCell,
} from 'providers/ThemeProvider/styled';

export default function OrderSingle() {
  const { orders } = useSelector((state) => state.orders);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const selected = orders.find((o) => o.uid === id);
    setSelectedOrder(selected);
  }, [id, orders]);

  const { title, bookingDate, address, customer } = selectedOrder || {};
  const { street, city, zip, country } = address || {};
  const { name, email, phone } = customer || {};

  return (
    <Page>
      <Link to="/orders">&#8592; Back</Link>
      <Heading>
        Order: {!selectedOrder ? <span>loading..</span> : <span>{title}</span>}
      </Heading>

      {error && <ErrorLabel>Oops! Something went wrong.</ErrorLabel>}

      <Tabel>
        <TabelBody>
          <TabelRow>
            <TabelCell>Title</TabelCell> <TabelCell>{title}</TabelCell>
          </TabelRow>

          <TabelRow>
            <TabelCell>Booking Date</TabelCell>
            <TabelCell>{`${moment(bookingDate).format(
              'DD.MM.YYYY'
            )}`}</TabelCell>
          </TabelRow>

          <TabelRow>
            <TabelCell>Address</TabelCell>
            <TabelCell>
              {street} <br />
              {city} <br />
              {zip} <br />
              {country}
            </TabelCell>
          </TabelRow>

          <TabelRow>
            <TabelCell>Customer</TabelCell>
            <TabelCell>
              {name} <br />
              {email} <br />
              {phone}
            </TabelCell>
          </TabelRow>

          <TabelRow>
            <TabelCell></TabelCell>
            <TabelCell>
              <Link to={`/orders/${id}/edit`}>EDIT THIS ORDER</Link>
            </TabelCell>
          </TabelRow>
        </TabelBody>
      </Tabel>
    </Page>
  );
}
