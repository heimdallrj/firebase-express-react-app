import React from 'react';
import styled from 'styled-components';

import { Row, Label, Input, Error } from './styled';

export default function TextInput({
  type = 'text',
  name,
  label,
  error,
  touched,
  ...restProps
}) {
  return (
    <Row>
      {label && <Label>{label}</Label>}
      <Input {...restProps} type={type} id={name} name={name} />

      {error && touched && <Error>{error}</Error>}
    </Row>
  );
}
