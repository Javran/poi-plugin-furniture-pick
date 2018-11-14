import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ButtonGroup,
  DropdownButton, MenuItem,
  Button,
  OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import {
  furnituresInfoSelectorByType,
  pickedFurnituresSelector,
  getFurnitureInfoFuncSelector,
  getFurnitureCoordFuncSelector,
} from '../selectors'
import { PTyp } from '../ptyp'

import { mapDispatchToProps } from '../store'

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
  }

  static defaultProps = {
    fId: null,
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
    const {fId, fType, fInfo} = this.props
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
              <div>TODO</div>
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
            '-'
          }
        </div>
        <Button
          style={{width: '3.6em'}}>
          <FontAwesome name="lock" />
        </Button>
      </div>
    )
  }

  renderOld() {
    const {
      furnitureList,
      pickedFurniture,
      getFurnitureInfoFunc,
      getFurnitureCoordFunc,
      type,
    } = this.props

    const furniturePages = _.chunk(furnitureList,10)
    const currentFInfo = getFurnitureInfoFunc(pickedFurniture.id)
    const curCoord = getFurnitureCoordFunc(pickedFurniture.id)
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{flex: 7, marginRight: 10}}>
          <ButtonGroup justified>
            <DropdownButton
              title={currentFInfo.name}
              onSelect={this.handleSelect}
              id={`furniture-pick-type-${type}`}>
              {
                _.flatMap(
                  furniturePages,
                  (furniturePage, ind) => {
                    const items = furniturePage.map(x => {
                      const {id,name,description} = x
                      const active = id === pickedFurniture.id

                      return (
                        <MenuItem
                          eventKey={id}
                          key={id} active={active}>
                          {
                            description ? (
                              <OverlayTrigger
                                key={id}
                                placement="left"
                                overlay={(
                                  <Tooltip id={`furniture-pick-tooltip-${id}`}>
                                    {
                                      description.map((d,dInd) =>
                                        <p key={_.identity(dInd)} style={{margin: 0}}>{d}</p>
                                      )
                                    }
                                  </Tooltip>
                                )}>
                                <div>{name}</div>
                              </OverlayTrigger>
                            ) : (
                              <div>{name}</div>
                            )
                          }
                        </MenuItem>
                      )
                    })
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
          </ButtonGroup>
        </div>
        <div
          style={{
            width: '6em',
            marginRight: 10,
            textAlign: 'center',
          }}>
          {
            curCoord ? curCoord.join(',') : '-'
          }
        </div>
        <Button
          onClick={this.handleToggle}
          style={{width: '4em'}}>
          <FontAwesome name={pickedFurniture.locked ? 'lock' : 'unlock'} />
        </Button>
      </div>
    )
  }
}

const FurnitureRow = connect(
  (state, ownProps) => {
    const {fType, fId} = ownProps
    const fInfo = getFurnitureInfoFuncSelector(state)(fId)
    return {
      fInfo,
      // furnitureList: furnituresInfoSelectorByType(type)(state),
      // pickedFurniture: pickedFurnituresSelector(state)[type],
      // getFurnitureInfoFunc: getFurnitureInfoFuncSelector(state),
      // getFurnitureCoordFunc: getFurnitureCoordFuncSelector(state),
    }
  },
  mapDispatchToProps,
)(FurnitureRowImpl)

export { FurnitureRow }
