import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setState } from '../store/reducers/appReducer'
import { useStorage } from '../hooks/useStorage'

const Subscribe = () => {
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
    <div className='subscribe-component'>
      <ul className='list-group mt-3'>
        {state.selectedUser.subscribes.length !== 0 ? (
          state.selectedUser.subscribes.map((subscribe) => {
            return (
              <li
                className='list-group-item'
                onClick={() =>
                  onGoToProfile(state.subscribes.byId[subscribe].owner)
                }
                key={state.subscribes.byId[subscribe].id}
              >
                {state.subscribes.byId[subscribe].owner}
              </li>
            )
          })
        ) : (
          <div>Нет подписок</div>
        )}
      </ul>
    </div>
  )
}

export default Subscribe
