import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import UsersListView from './views/UsersListView'

class App extends Component {
  render () {
    return (
      <BrowserRouter basename='/' forceRefresh>
        <div className='app'>
          <h1>Drinkers Manager</h1>
          <Switch>
            <Route path='/' exact component={UsersListView} />
            <Route path='/projects/:id' component={UsersListView} />
            <Route path='/about' component={UsersListView} />
            <Route path='*' component={UsersListView} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
