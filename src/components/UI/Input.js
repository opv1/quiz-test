import React from 'react'

const Input = ({
  className,
  onChange,
  type = 'text',
  value,
  name,
  maxLength,
}) => {
  const cls = ['form-control']

  if (className) {
    cls.push(className)
  }

  return (
    <input
      className={cls.join(' ')}
      onChange={onChange}
      type={type}
      value={value}
      name={name}
      maxLength={maxLength}
    />
  )
}

export default Input
