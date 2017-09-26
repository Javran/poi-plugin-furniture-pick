import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  DropdownButton, MenuItem,
} from 'react-bootstrap'

import {
  furnituresInfoSelectorByType,
  currentFurnituresSelector,
} from '../selectors'
import { PTyp } from '../ptyp'

class FurnitureRowImpl extends Component {
  static propTypes = {
    type: PTyp.number.isRequired,

    currentFurniture: PTyp.number.isRequired,
    furnitureList: PTyp.array.isRequired,
  }

  render() {
    const {
      furnitureList,
      currentFurniture,
      type,
    } = this.props
    const furniturePages = _.chunk(furnitureList,10)
    return (
      <div>
        <DropdownButton title="" id={`furniture-pick-type-${type}`}>
          {
            _.flatMap(
              furniturePages,
              (furniturePage, ind) => {
                const items = furniturePage.map(x => (
                  <MenuItem key={x.id} active={x.id === currentFurniture}>
                    {x.name || `ID: ${x.id}`}
                  </MenuItem>
                ))
                if (ind+1 < furniturePages.length) {
                  const divider =
                    (<MenuItem divider key={`divider-${ind}`} />)
                  return [...items, divider]
                } else {
                  return items
                }
              }
            )
          }
        </DropdownButton>
      </div>
    )
  }
}

const FurnitureRow = connect(
  (state, {type}) => ({
    furnitureList: furnituresInfoSelectorByType(type)(state),
    currentFurniture: currentFurnituresSelector(state)[type],
  })
)(FurnitureRowImpl)

export { FurnitureRow }
