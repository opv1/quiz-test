import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Subscriptions from './Subscriptions'
import Subscribers from './Subscribers'
import { Button } from './UI/index'

const Subs = () => {
  const history = useHistory()

  const content = useParams()

  return (
    <div className='subs-component content'>
      <Button
        className='btn-primary'
        onClick={() => history.goBack()}
        name='Назад'
      />
      {content.content === 'subscriptions' ? (
        <Subscriptions />
      ) : (
        <Subscribers />
      )}
    </div>
  )
}

export default Subs
