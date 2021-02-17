import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { setState } from '../store/reducers/appReducer'
import { useStorage } from '../hooks/useStorage'

const Post = ({ post }) => {
  const [like, setLike] = useState({ id: null, active: false })
  const [likes, setLikes] = useState([])

  const state = useSelector((state) => state.app)

  const dispatch = useDispatch()

  const { setItem } = useStorage()

  const history = useHistory()

  const onGoToProfile = (userId) => {
    state.selectedUser = state.user.entities[userId]

    setItem(state.storageName, state)
    dispatch(setState(state))

    history.push(`/profile/${userId}`)
  }

  const onDeletePost = (postId) => {
    state.post.allEntities = state.post.allEntities.filter(
      (id) => id !== postId
    )

    delete state.post.entities[postId]

    setItem(state.storageName, state)
    dispatch(setState(state))
  }

  const onLikePost = () => {
    const newLike = {
      id: uuidv4(),
      postId: post.id,
      userId: state.currentUser.id,
    }

    state.like.allEntities.push(newLike.id)
    state.like.entities[newLike.id] = newLike

    setLike({ id: newLike.id, active: true })
    setItem(state.storageName, state)
    dispatch(setState(state))
  }

  const onUnlikePost = (likeId) => {
    state.like.allEntities = state.like.allEntities.filter(
      (id) => id !== likeId
    )

    delete state.like.entities[likeId]

    setLike({ id: null, active: false })
    setItem(state.storageName, state)
    dispatch(setState(state))
  }

  useEffect(() => {
    const arrayLikes = []

    state.like.allEntities.forEach((likeId) => {
      if (
        state.like.entities[likeId].postId === post.id &&
        state.like.entities[likeId].userId === state.currentUser.id
      ) {
        setLike({ id: state.like.entities[likeId].id, active: true })
      }

      if (state.like.entities[likeId].postId === post.id) {
        arrayLikes.push(state.like.entities[likeId])
      }
    })

    setLikes(arrayLikes)
  }, [state])

  return (
    <div className='post-component'>
      <div className='card'>
        <div className='card-body'>
          <div className='card-block'>
            <h5
              className='card-title'
              onClick={() => onGoToProfile(post.userId)}
            >
              {state.user.entities[post.userId].name}
            </h5>
            <div className='card-icons'>
              {state.currentUser.id === post.userId ? (
                <i
                  className='fas fa-times'
                  onClick={() => onDeletePost(post.id)}
                ></i>
              ) : null}
              {like.active ? (
                <i
                  className='fas fa-heart'
                  onClick={() => onUnlikePost(like.id)}
                ></i>
              ) : (
                <i className='far fa-heart' onClick={() => onLikePost()}></i>
              )}
            </div>
          </div>
          <p className='card-text'>{post.text}</p>
          <p className='card-likes'>
            Понравилось:
            {likes.length !== 0 ? (
              likes.map((like) => (
                <span key={like.id}>
                  {' '}
                  {state.user.entities[like.userId].name}
                </span>
              ))
            ) : (
              <span> никому</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Post
