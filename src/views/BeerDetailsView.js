import React, { PureComponent } from 'react'
import { flatten } from 'flat'

class BeerDetailsComponent extends PureComponent {
  render () {
    // Pour ce MVP, on applatit la donnée afin d'afficher la totalité des infos rapidement.
    // Selon les besoins, on pourrait limiter l'affichage a certaines infos pertinentes et faire un traitement adéquat pour les données complexes
    const beerDetails = flatten(this.props.properties)
    return (
      <div>
        <p>{this.props.label}</p>
        <ul>
          {Object.keys(beerDetails).map((detail) => {
            return <li>{detail}: {beerDetails[detail]}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default BeerDetailsComponent
