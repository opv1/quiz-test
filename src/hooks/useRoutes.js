import { Switch, Route, Redirect } from 'react-router-dom'
import { PostsPage, ProfilePage, SubsPage, AuthPage } from '../pages/index'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact component={PostsPage} />
        <Route path='/profile/:id' component={ProfilePage} />
        <Route path='/subs/:content' component={SubsPage} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path='/' exact component={AuthPage} />
      <Redirect to='/' />
    </Switch>
  )
}
