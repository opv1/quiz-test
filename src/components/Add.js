import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useStorage } from '../hooks/useStorage'
import { setState } from '../store/reducers/appReducer'
import { Input, Button } from './UI/index'

const Add = () => {
  const [value, setValue] = useState('')

  const dispatch = useDispatch()

  const state = useSelector((state) => state.app)

  const { setItem } = useStorage()

  const onAddPost = (e, value) => {
    e.preventDefault()

    const newPost = {
      id: uuidv4(),
      text: value,
      userId: state.currentUser.id,
    }

    state.post.allEntities.unshift(newPost.id)
    state.post.entities[newPost.id] = newPost

    setItem(state.storageName, state)
    dispatch(setState(state))
  }

  return (
    <form className='d-flex flex-column align-items-center mb-3'>
      <div className='mb-3'>
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name='text'
        />
      </div>
      <Button
        className='btn-success'
        onClick={(e) => onAddPost(e, value)}
        disabled={value.length === 0}
        name='Опубликовать'
      />
    </form>
  )
}

export default Add
