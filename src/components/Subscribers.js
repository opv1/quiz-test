import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setState } from '../store/reducers/appReducer'
import { useStorage } from '../hooks/useStorage'

const Subscribers = () => {
  const state = useSelector((state) => state.app)

  const dispatch = useDispatch()

  const history = useHistory()

  const { setItem } = useStorage()

  const onGoToProfile = (user) => {
    state.selectedUser = user

    setItem(state.storageName, state)
    dispatch(setState(state))

    history.push(`/profile/${user.name}`)
  }

  return (
    <div className='subscribers-component'>
      <ul className='list-group mt-3'>
        {state.userData.subscribers !== 0 ? (
          state.userData.subscribers.map((subscriber) => (
            <li key={state.user.entities[subscriber.fromUserId].id}>
              {state.user.entities[subscriber.fromUserId].name}
            </li>
          ))
        ) : (
          <li>Подписчиков нет</li>
        )}
      </ul>
    </div>
  )
}

export default Subscribers
