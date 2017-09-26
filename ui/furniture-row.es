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
  currentFurnituresSelector,
  getFurnitureInfoFuncSelector,
  getFurnitureCoordFuncSelector,
} from '../selectors'
import { PTyp } from '../ptyp'

class FurnitureRowImpl extends Component {
  static propTypes = {
    type: PTyp.number.isRequired,

    currentFurniture: PTyp.number.isRequired,
    furnitureList: PTyp.array.isRequired,
    getFurnitureInfoFunc: PTyp.func.isRequired,
    getFurnitureCoordFunc: PTyp.func.isRequired,
  }

  render() {
    const {
      furnitureList,
      currentFurniture,
      getFurnitureInfoFunc,
      getFurnitureCoordFunc,
      type,
    } = this.props
    const furniturePages = _.chunk(furnitureList,10)
    const currentFInfo = getFurnitureInfoFunc(currentFurniture)
    const curCoord = getFurnitureCoordFunc(currentFurniture)
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{flex: 7, marginRight: 10}}>
          <ButtonGroup justified>
            <DropdownButton
              title={currentFInfo.name}
              id={`furniture-pick-type-${type}`}>
              {
                _.flatMap(
                  furniturePages,
                  (furniturePage, ind) => {
                    const items = furniturePage.map(x => {
                      const {id,name,description} = x
                      const active = id === currentFurniture
                      return description ? (
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
                          )}
                        >
                          <MenuItem active={active}>
                            {name}
                          </MenuItem>
                        </OverlayTrigger>
                      ) : (
                        <MenuItem key={id} active={active}>
                          {name}
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
        <Button style={{width: '4em'}}>
          <FontAwesome name="lock" />
        </Button>
      </div>
    )
  }
}

const FurnitureRow = connect(
  (state, {type}) => ({
    furnitureList: furnituresInfoSelectorByType(type)(state),
    currentFurniture: currentFurnituresSelector(state)[type],
    getFurnitureInfoFunc: getFurnitureInfoFuncSelector(state),
    getFurnitureCoordFunc: getFurnitureCoordFuncSelector(state),
  })
)(FurnitureRowImpl)

export { FurnitureRow }
