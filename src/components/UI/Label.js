import React from 'react'

const Label = ({ className, name }) => {
  const cls = ['form-label']

  if (className) {
    cls.push(className)
  }

  return <label className={cls.join(' ')}>{name}</label>
}

export default Label
