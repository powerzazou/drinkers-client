import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import UsersListView from './views/UsersListView'
import UserDetailsView from './views/UserDetailsView'
import UserUpdateView from './views/UserUpdateView'

class App extends Component {
  render () {
    return (
      <BrowserRouter basename='/' forceRefresh>
        <div className='app'>
          <Header />
          <Switch>
            <Route path='/' exact component={UsersListView} />
            <Route strict exact path='/users/update/:id' component={UserUpdateView} />
            <Route strict exact path='/users/:id' component={UserDetailsView} />
            <Route path='*' component={UsersListView} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
