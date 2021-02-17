import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useStorage } from '../hooks/useStorage'
import { setState } from '../store/reducers/appReducer'
import Post from './Post'
import { Button } from './UI/index'

const Posts = () => {
  const state = useSelector((state) => state.app)

  const dispatch = useDispatch()

  const history = useHistory()

  const { setItem } = useStorage()

  const onGoToProfile = (userId) => {
    state.selectedUser = state.user.entities[userId]

    setItem(state.storageName, state)
    dispatch(setState(state))

    history.push(`/profile/${userId}`)
  }

  return (
    <div className='posts-component content'>
      <ul className='list-group list-group-horizontal'>
        <li className='list-group-item active'>Все посты</li>
        <li className='list-group-item'>Подписки</li>
      </ul>
      <div className='mt-3 mb-3'>
        <Button
          className='btn-warning'
          onClick={() => onGoToProfile(state.currentUser.id)}
          name='В профиль'
        />
      </div>
      <ul className='list-group'>
        {state.post.allEntities.length !== 0 ? (
          state.post.allEntities.map((postId) => (
            <Post
              key={state.post.entities[postId].id}
              post={state.post.entities[postId]}
            />
          ))
        ) : (
          <div>Нет постов</div>
        )}
      </ul>
    </div>
  )
}

export default Posts
