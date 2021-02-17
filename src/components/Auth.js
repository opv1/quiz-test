import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useStorage } from '../hooks/useStorage'
import { setState } from '../store/reducers/appReducer'
import { Label, Input, Button } from './UI/index'

const Auth = () => {
  const [value, setValue] = useState('')

  const dispatch = useDispatch()

  const state = useSelector((state) => state.app)

  const { setItem } = useStorage()

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const onLogin = (e) => {
    e.preventDefault()

    let candidate = null

    for (let userId in state.user.entities) {
      if (state.user.entities[userId].name === value) {
        candidate = state.user.entities[userId]
      }
    }

    if (candidate) {
      state.currentUser = candidate
      state.isAuth = true

      setItem(state.storageName, state)
      dispatch(setState(state))
    } else {
      const newUser = {
        id: uuidv4(),
        name: value,
      }

      state.user.entities[newUser.id] = newUser
      state.currentUser = newUser
      state.isAuth = true

      setItem(state.storageName, state)
      dispatch(setState(state))
    }
  }

  return (
    <div className='auth-component'>
      <form>
        <div className='mb-3'>
          <Label name='Введите имя' />
          <Input
            onChange={handleChange}
            value={value}
            name='name'
            maxLength='12'
          />
        </div>
        <Button
          className='btn-primary'
          onClick={onLogin}
          disabled={value.length <= 3}
          name='Продолжить'
        />
      </form>
    </div>
  )
}

export default Auth
