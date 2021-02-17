import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Followers from './Followers'
import Subscribe from './Subscribe'
import { Button } from './UI/index'

const Subs = () => {
  const history = useHistory()

  const path = useParams()

  return (
    <div className='subs-component content'>
      <Button
        className='btn-primary'
        onClick={() => history.goBack()}
        name='Назад'
      />
      {path.path === 'subscribes' ? <Subscribe /> : <Followers />}
    </div>
  )
}

export default Subs
