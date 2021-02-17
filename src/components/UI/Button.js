import React from 'react'

const Button = ({ className, onClick, disabled, name }) => {
  const cls = ['btn']

  if (className) {
    cls.push(className)
  }

  return (
    <button className={cls.join(' ')} onClick={onClick} disabled={disabled}>
      {name}
    </button>
  )
}

export default Button
