import React from 'react';

export default function TextInput({
  type = 'text',
  name,
  touched,
  ...restProps
}) {
  return <input {...restProps} type={type} id={name} name={name} />;
}
