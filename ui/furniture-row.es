import React, { Component } from 'react'
import { connect } from 'react-redux'

import { furnituresInfoSelectorByType } from '../selectors'
import { PTyp } from '../ptyp'

class FurnitureRowImpl extends Component {
  static propTypes = {
    furnitureList: PTyp.array.isRequired,
  }

  render() {
    const {furnitureList} = this.props
    return (
      <div>{JSON.stringify(furnitureList.map(x => x ? x.name : 'N/A'))}</div>
    )
  }
}

const FurnitureRow = connect(
  (state, {type}) => ({
    furnitureList: furnituresInfoSelectorByType(type)(state),
  })
)(FurnitureRowImpl)

export { FurnitureRow }
