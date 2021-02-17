import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from './hooks/useRoutes'
import { useStorage } from './hooks/useStorage'
import { setState } from './store/reducers/appReducer'

const App = () => {
  const state = useSelector((state) => state.app)

  const dispatch = useDispatch()

  const { setItem, getItem } = useStorage()

  const routes = useRoutes(state.isAuth)

  useEffect(() => {
    const existingState = getItem(state.storageName)

    if (existingState) {
      dispatch(setState(existingState))
    } else {
      setItem(state.storageName, state)
    }
    // eslint-disable-next-line
  }, [])

  return <div className='app'>{routes}</div>
}

export default App
