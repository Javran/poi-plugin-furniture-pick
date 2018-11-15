import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ButtonGroup,
  DropdownButton,
  Button,
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import {
  getFurnitureInfoFuncSelector,
  getFurnitureCoordFuncSelector,
} from '../selectors'
import { PTyp } from '../ptyp'
import { mapDispatchToProps } from '../store'

import { FTypeDropdownContent } from './ftype-dropdown-content'

class FurnitureRowImpl extends Component {
  static propTypes = {
    // type: PTyp.number.isRequired,

    // pickedFurniture: PTyp.object.isRequired,
    // furnitureList: PTyp.array.isRequired,
    // getFurnitureInfoFunc: PTyp.func.isRequired,
    // getFurnitureCoordFunc: PTyp.func.isRequired,
    // uiPickFurniture: PTyp.func.isRequired,
    // uiToggleFurnitureLock: PTyp.func.isRequired,
    fType: PTyp.string.isRequired,
    fId: PTyp.number,
    fInfo: PTyp.object.isRequired,
    coordDesc: PTyp.array,
  }

  static defaultProps = {
    fId: null,
    coordDesc: null,
  }

  /*
  handleSelect = id => {
    const {uiPickFurniture, type} = this.props
    uiPickFurniture(id, type)
  }

  handleToggle = () => {
    const {uiToggleFurnitureLock, type} = this.props
    uiToggleFurnitureLock(type)
  }
  */
  render() {
    const {fId, fType, fInfo, coordDesc} = this.props
    return (
      <div
        key={fType}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <div style={{marginRight: 10, width: '25em'}}>
          <ButtonGroup justified>
            <DropdownButton
              title={fInfo.name}>
              <FTypeDropdownContent
                fType={fType}
                hlId={fId}
              />
            </DropdownButton>
          </ButtonGroup>
        </div>
        <div
          style={{
            width: '4em',
            marginRight: 10,
            textAlign: 'center',
          }}>
          {
            coordDesc === null ? '-' : coordDesc.join(',')
          }
        </div>
        <Button
          style={{width: '3.6em'}}>
          <FontAwesome name="lock" />
        </Button>
      </div>
    )
  }
}

const FurnitureRow = connect(
  (state, {fId}) => {
    const fInfo = getFurnitureInfoFuncSelector(state)(fId)
    const coordDesc = getFurnitureCoordFuncSelector(state)(fId)
    return {
      fInfo,
      coordDesc,
    }
  },
  mapDispatchToProps,
)(FurnitureRowImpl)

export { FurnitureRow }
