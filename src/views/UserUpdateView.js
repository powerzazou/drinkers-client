import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Pour gerer simplement tous les cas, qu'on patch 0, 1 ou 2 bières ...
function jsonToUrlEncoded (element, key, list = []) {
  if (typeof (element) === 'object') {
    for (var idx in element) { jsonToUrlEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list) }
  } else {
    list.push(key + '=' + encodeURIComponent(element))
  }
  return list.join('&')
}

class UserUpdateView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      details: null,
      error: false,
      userId: props.match.params.id,
      updates: {}
    }
  }
  onChangeBeer (beerKey, beerValue) {
    const nextUpdates = {...this.state.updates}
    nextUpdates[beerKey] = beerValue
    this.setState({updates: nextUpdates})
  }
  async onSubmitChanges () {
    const updates = this.state.updates
    const userId = this.state.userId
    try {
      const requestParams = {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: jsonToUrlEncoded(updates)
      }
      await window.fetch(`https://cryptic-fjord-69206.herokuapp.com/users/${userId}`, requestParams).then((res) => res.json())
      // Si c'est OK on redirect vers la page des détails de l'utilisateur, sinon, on affiche un message d'erreur
      this.props.history.push(`/users/${userId}`)
    } catch (error) {
      console.log('error :', error)
      this.setState({error: 'Failed to update user', updates: {}})
    }
  }
  render () {
    let content = ''
    const details = this.state.details
    if (this.state.error) {
      content = (<p>{this.state.error}</p>)
    } else if (details) {
      // Affichage simpliste : id, date de création, et deux champs permettant de modifier les beers id
      content = (
        <div>
          <p>ID: {details._id}</p>
          <p>Joined At : {details.joinedAt}</p>
          {['beer1', 'beer2'].map((beerKey, index) => {
            const defaultValue = (this.state.updates[beerKey]) ? this.state.updates[beerKey] : details[beerKey].id
            return (
              <div key={index}>
                <label>{beerKey}</label>
                <input type='text' defaultValue={defaultValue} onChange={(e) => { this.onChangeBeer(beerKey, e.target.value) }} />
              </div>
            )
          })}
          <button type='button' onClick={() => { this.onSubmitChanges() }}> Update ! </button>
        </div>
      )
    } else {
      content = (<p>Loading ... </p>)
    }
    return (
      <div>
        <h2>Update User</h2>
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

export default withRouter(UserUpdateView)
