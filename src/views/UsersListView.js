import React, { Component } from 'react'

class UsersListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: null,
      error: false
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
        <table style={{border: '1px solid black', borderCollapse: 'collapse'}}>
          <tr>
            <th style={cellStyle}>ID</th>
            <th style={cellStyle}>joined at</th>
          </tr>
          {users.map((user) => {
            return (
              <tr>
                <td style={cellStyle}>{user._id}</td>
                <td style={cellStyle}>{user.joinedAt}</td>
              </tr>)
          })}
        </table>
      )
    } else {
      content = (<p>Loading ... </p>)
    }
    return (
      <div>
        <h2>User List</h2>
        {content}
      </div>
    )
  }
  async componentDidMount () {
    try {
      const requestParams = { method: 'GET', mode: 'cors' }
      const users = await window.fetch('https://cryptic-fjord-69206.herokuapp.com/users', requestParams).then((res) => res.json())
      this.setState({users: users})
    } catch (error) {
      console.log('error :', error)
      this.setState({error: 'Failed to load users'})
    }
  }
}

export default UsersListView
