import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class UsersListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: null,
      error: false
    }
  }
  showUserDetails (id) {
    this.props.history.push(`/users/${id}`)
  }
  async createUser () {
    try {
      const requestParams = { method: 'POST', mode: 'cors' }
      const user = await window.fetch('https://cryptic-fjord-69206.herokuapp.com/users', requestParams).then((res) => res.json())
      const newUsersState = this.state.users
      newUsersState.push(user)
      this.setState({users: newUsersState})
    } catch (error) {
      console.log('error :', error)
      this.setState({error: 'Failed to add user'})
    }
  }
  async deleteUser (user) {
    try {
      const requestParams = {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `beer1=${user.beer1}&beer2=${user.beer2}`
      }
      const response = await window.fetch(`https://cryptic-fjord-69206.herokuapp.com/users/${user._id}`, requestParams).then((res) => res)
      console.log(response.status)
      if (response.status !== 200) {
        throw new Error('failed to remove user')
      }
      const newUsersState = this.state.users
      // On enlève l'user de la liste ...
      newUsersState.splice(newUsersState.findIndex((u) => u._id === user._id), 1)
      this.setState({users: newUsersState})
    } catch (error) {
      console.log('error :', error)
      this.setState({error: 'Failed to remove user'})
    }
  }
  render () {
    let content = ''
    const users = this.state.users
    if (this.state.error) {
      content = (<p>{this.state.error}</p>)
    } else if (users) {
      const cellStyle = {border: '1px solid black', padding: '10px'}
      content = (
        <div>
          <table style={{border: '1px solid black', borderCollapse: 'collapse'}}>
            <thead>
              <tr>
                <th style={cellStyle}>ID</th>
                <th style={cellStyle}>Joined at</th>
                <th style={cellStyle}>Details</th>
                <th style={cellStyle}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td style={cellStyle}>{user._id}</td>
                    <td style={cellStyle}>{new Date(user.joinedAt).toLocaleString('fr-FR')}</td>
                    <td style={cellStyle} onClick={(e) => { this.showUserDetails(user._id) }}>View Details</td>
                    <td style={cellStyle} onClick={(e) => { this.deleteUser(user) }}>Delete</td>
                  </tr>)
              })}
            </tbody>
          </table>
          <button type='button' onClick={() => { this.createUser() }}>Add User !</button>
        </div>
      )
    } else {
      content = (<p>Loading ... </p>)
    }
    return (
      <div>
        <h2>Users List</h2>
        {content}
      </div>
    )
  }
  async componentDidMount () {
    try {
      const requestParams = { method: 'GET', mode: 'cors' }
      const users = await window.fetch('https://cryptic-fjord-69206.herokuapp.com/users', requestParams).then((res) => res.json())
      // Un petit tri par date de création pour s'y retrouver...
      users.sort((a, b) => {
        return new Date(a.joinedAt).getTime() > new Date(b.joinedAt).getTime()
      })
      this.setState({users: users})
    } catch (error) {
      console.log('error :', error)
      this.setState({error: 'Failed to load users'})
    }
  }
}

export default withRouter(UsersListView)
