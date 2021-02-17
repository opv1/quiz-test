import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setState } from '../store/reducers/appReducer'
import { useStorage } from '../hooks/useStorage'

const Followers = () => {
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
    <div className='followers-component'>
      <ul className='list-group mt-3'>
        {state.selectedUser.followers.length !== 0 ? (
          state.selectedUser.followers.map((follower) => {
            return (
              <li
                className='list-group-item'
                onClick={() =>
                  onGoToProfile(state.followers.byId[follower].owner)
                }
                key={state.followers.byId[follower].id}
              >
                {state.followers.byId[follower].owner}
              </li>
            )
          })
        ) : (
          <div>Нет подписчиков</div>
        )}
      </ul>
    </div>
  )
}

export default Followers
