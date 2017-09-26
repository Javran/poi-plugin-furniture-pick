import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ButtonToolbar, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import { FurnitureRow } from './furniture-row'
import { mapDispatchToProps } from '../store'
import { PTyp } from '../ptyp'

const furnitureTypes = [1,0,5,2,3,4]

class PickerMainImpl extends PureComponent {
  static propTypes = {
    uiPickedFurnituresReset: PTyp.func.isRequired,
    uiPickFurnitureRandomly: PTyp.func.isRequired,
  }

  render() {
    const {
      uiPickedFurnituresReset,
      uiPickFurnitureRandomly,
    } = this.props
    return (
      <div style={{margin: 10}}>
        <ButtonToolbar style={{display: 'flex', marginBottom: 10}}>
          <Button style={{flex: 1}} onClick={uiPickedFurnituresReset}>
            <FontAwesome name="undo" />
          </Button>
          <Button style={{flex: 1}} onClick={uiPickFurnitureRandomly}>
            <FontAwesome name="random" />
          </Button>
        </ButtonToolbar>
        {
          furnitureTypes.map(ft => (
            <FurnitureRow
              key={ft}
              type={ft}
            />
          ))
        }
      </div>
    )
  }
}

const PickerMain = connect(
  null,
  mapDispatchToProps
)(PickerMainImpl)

export { PickerMain }
