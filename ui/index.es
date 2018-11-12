import { join } from 'path-extra'
import { createStructuredSelector } from 'reselect'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonToolbar, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import { ItemsView } from './items-view'
import { mapDispatchToProps } from '../store'
import { currentFurnituresSelectorNew } from '../selectors'
import { PTyp } from '../ptyp'

// furniture types following the in-game ordering
const ordFurnitureTypes = [
  'wallpaper',
  'floor',
  'desk',
  'window',
  'wallhanging',
  'shelf',
]

class PickerMainImpl extends Component {
  static propTypes = {
    curFurnitures: PTyp.object.isRequired,

    uiPickedFurnituresReset: PTyp.func.isRequired,
    uiPickFurnitureRandomly: PTyp.func.isRequired,
  }

  render() {
    const {
      uiPickedFurnituresReset,
      uiPickFurnitureRandomly,
      curFurnitures,
    } = this.props
    return (
      <div style={{margin: 10}}>
        <link
          rel="stylesheet"
          href={join(__dirname, '..', 'assets', 'furniture-pick.css')}
        />
        <ButtonToolbar style={{display: 'flex', marginBottom: 10}}>
          <Button style={{flex: 1}} onClick={uiPickedFurnituresReset}>
            <FontAwesome name="undo" />
          </Button>
          <Button style={{flex: 1}} onClick={uiPickFurnitureRandomly}>
            <FontAwesome name="random" />
          </Button>
        </ButtonToolbar>
        {
          ordFurnitureTypes.map(ft => (
            <div key={ft}>
              {ft} {curFurnitures[ft]}
            </div>
          ))
        }
        <ItemsView
          style={{marginTop: 10}}
        />
      </div>
    )
  }
}

const PickerMain = connect(
  createStructuredSelector({
    curFurnitures: currentFurnituresSelectorNew,
  }),
  mapDispatchToProps
)(PickerMainImpl)

export { PickerMain }
