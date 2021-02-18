import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useStorage } from '../hooks/useStorage'
import { setState } from '../store/reducers/appReducer'
import Add from './Add'
import Post from './Post'
import { Button } from './UI/index'

const Profile = () => {
  const [userPosts, setUserPosts] = useState([])
  const [displayFrom, setDisplayForm] = useState(false)
  const [subscribe, setSubscribe] = useState({ id: null, active: false })
  const [userData, setUserData] = useState({
    subscriptions: [],
    subscribers: [],
  })

  const dispatch = useDispatch()

  const state = useSelector((state) => state.app)

  const history = useHistory()

  const { setItem } = useStorage()

  const onChangeName = () => {
    const newName = window.prompt('Новое имя')

    if (newName === state.user.entities[state.currentUser.id].name) {
      window.alert('Такое имя уже существует')
      return false
    }

    if (!newName) {
      return false
    }

    state.user.entities[state.currentUser.id].name = newName

    setItem(state.storageName, state)
    dispatch(setState(state))
  }

  const onSubscribe = () => {
    const newSubscription = {
      fromUserId: state.currentUser.id,
      id: uuidv4(),
      toUserId: state.selectedUser.id,
    }

    state.subscription.allEntities.push(newSubscription.id)
    state.subscription.entities[newSubscription.id] = newSubscription

    setSubscribe({ id: newSubscription.id, active: true })
    setItem(state.storageName, state)
    dispatch(setState(state))
  }

  const onUnsubscribe = (subscribeId) => {
    state.subscription.allEntities = state.subscription.allEntities.filter(
      (id) => id !== subscribeId
    )

    delete state.subscription.entities[subscribeId]

    setSubscribe({ id: null, active: false })
    setItem(state.storageName, state)
    dispatch(setState(state))
  }

  const onGoToSubscriptions = (userData) => {
    history.push('/subs/subscriptions')
  }

  const onGoToSubscribers = (userData) => {
    history.push('/subs/subscribers')
  }

  const onLogout = () => {
    state.currentUser = null
    state.selectedUser = null
    state.isAuth = false

    setItem(state.storageName, state)
    dispatch(setState(state))
  }

  useEffect(() => {
    const posts = []

    state.post.allEntities.forEach((postId) => {
      if (state.post.entities[postId].userId === state.selectedUser.id) {
        posts.push(state.post.entities[postId])
      }
    })

    setUserPosts(posts)
  }, [state])

  useEffect(() => {
    state.subscription.allEntities.forEach((subscriptionId) => {
      if (
        state.subscription.entities[subscriptionId].fromUserId ===
          state.currentUser.id &&
        state.subscription.entities[subscriptionId].toUserId ===
          state.selectedUser.id
      ) {
        setSubscribe({
          id: state.subscription.entities[subscriptionId].id,
          active: true,
        })
      }
    })
  }, [state])

  useEffect(() => {
    const subscriptions = []
    const subscribers = []

    state.subscription.allEntities.forEach((subscriptionId) => {
      if (
        state.subscription.entities[subscriptionId].fromUserId ===
        state.selectedUser.id
      ) {
        subscriptions.push(state.subscription.entities[subscriptionId])
      }

      if (
        state.subscription.entities[subscriptionId].toUserId ===
        state.selectedUser.id
      ) {
        subscribers.push(state.subscription.entities[subscriptionId])
      }
    })

    state.userData = { subscriptions, subscribers }

    setItem(state.storageName, state)
    setUserData({ subscriptions, subscribers })
  }, [state])

  return (
    <div className='profile-component content'>
      <div className='profile-block'>
        <span
          onClick={
            state.currentUser.id === state.selectedUser.id ? onChangeName : null
          }
        >
          {state.selectedUser.name},
        </span>
        <span onClick={() => onGoToSubscriptions(userData.subscriptions)}>
          {' '}
          {userData.subscriptions.length} подписки,
        </span>
        <span onClick={() => onGoToSubscribers(userData.subscribers)}>
          {' '}
          {userData.subscribers.length} подписчиков
        </span>
      </div>
      <div className='mt-3 mb-3'>
        {state.currentUser.id === state.selectedUser.id ? (
          <Button className='btn-danger' onClick={onLogout} name='Выход' />
        ) : (
          <>
            {subscribe.active ? (
              <Button
                className='btn-info'
                onClick={() => onUnsubscribe(subscribe.id)}
                name='Отписаться'
              />
            ) : (
              <Button
                className='btn-info'
                onClick={() => onSubscribe()}
                name='Подписаться'
              />
            )}
          </>
        )}
        <Button
          className='btn-primary ms-3 me-3'
          onClick={() => history.push('/')}
          name='В ленту'
        />
        {state.currentUser.id === state.selectedUser.id ? (
          <i
            className='fas fa-plus'
            onClick={() => setDisplayForm(!displayFrom)}
          ></i>
        ) : null}
      </div>
      {displayFrom ? <Add /> : null}
      {userPosts.length !== 0 ? (
        userPosts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <div>Нет постов</div>
      )}
    </div>
  )
}

export default Profile
