import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setState } from '../store/reducers/appReducer'
import { useStorage } from '../hooks/useStorage'

const Subscriptions = () => {
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
    <div className='subscriptions-component'>
      <ul className='list-group mt-3'>
        {state.userData.subscriptions !== 0 ? (
          state.userData.subscriptions.map((subscription) => (
            <li key={state.user.entities[subscription.toUserId].id}>
              {state.user.entities[subscription.toUserId].name}
            </li>
          ))
        ) : (
          <li>Подписок нет</li>
        )}
      </ul>
    </div>
  )
}

export default Subscriptions
