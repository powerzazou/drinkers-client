import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BeerDetailsView from './BeerDetailsView'

class UserDetailsView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      details: null,
      error: false,
      userId: props.match.params.id
    }
  }
  render () {
    let content = ''
    const details = this.state.details
    if (this.state.error) {
      content = (<p>{this.state.error}</p>)
    } else if (details) {
      // Affichage simpliste : id, date de création, et toutes les infos sur les deux bières
      content = (
        <div>
          <p>ID: {details._id}</p>
          <p>Joined At : {details.joinedAt}</p>
          {['beer1', 'beer2'].map((beerKey) => {
            return <BeerDetailsView label={beerKey} properties={details[beerKey]} />
          })}
        </div>
      )
    } else {
      content = (<p>Loading ... </p>)
    }
    return (
      <div>
        <h2>User Details</h2>
        {content}
      </div>
    )
  }
  async componentDidMount () {
    try {
      const requestParams = { method: 'GET', mode: 'cors' }
      const details = await window.fetch(`https://cryptic-fjord-69206.herokuapp.com/users/${this.state.userId}`, requestParams).then((res) => res.json())
      this.setState({details: details})
    } catch (error) {
      console.log('error :', error)
      this.setState({error: 'Failed to load user details'})
    }
  }
}

export default withRouter(UserDetailsView)
