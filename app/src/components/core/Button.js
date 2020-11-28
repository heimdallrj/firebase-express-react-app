import React from 'react';

export default function Button({
  name,
  type,
  disabled,
  children,
  ...restProps
}) {
  return (
    <button {...restProps} disabled={disabled} name={name} type={type}>
      {children}
    </button>
  );
}
