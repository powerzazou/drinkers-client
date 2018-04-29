import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  backToHome (id) {
    this.props.history.push('/')
  }
  render () {
    return (
      <h1 onClick={() => { this.backToHome() }}>Drinkers Manager</h1>
    )
  }
}

export default withRouter(Header)
