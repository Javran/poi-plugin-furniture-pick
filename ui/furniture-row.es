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
} from '../selectors'
import { PTyp } from '../ptyp'

class FurnitureRowImpl extends Component {
  static propTypes = {
    type: PTyp.number.isRequired,

    currentFurniture: PTyp.number.isRequired,
    furnitureList: PTyp.array.isRequired,
    getFurnitureInfoFunc: PTyp.func.isRequired,
  }

  render() {
    const {
      furnitureList,
      currentFurniture,
      getFurnitureInfoFunc,
      type,
    } = this.props
    const furniturePages = _.chunk(furnitureList,10)
    const currentFInfo = getFurnitureInfoFunc(currentFurniture)
    const furnitureBtn = (
      <ButtonGroup justified>
        <DropdownButton
          title={<div>{currentFInfo.name}</div>}
          id={`furniture-pick-type-${type}`}>
          {
            _.flatMap(
              furniturePages,
              (furniturePage, ind) => {
                const items = furniturePage.map(x => (
                  <MenuItem key={x.id} active={x.id === currentFurniture}>
                    {x.name}
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
      </ButtonGroup>
    )

    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{flex: 7, marginRight: 10}}>
          {
            currentFInfo.description ? (
              <OverlayTrigger
                placement="top"
                overlay={(
                  <Tooltip id={`furniture-pick-type-${type}-tooltip`}>
                    {
                      currentFInfo.description.map((d,ind) =>
                        <p key={_.identity(ind)} style={{margin: 0}}>{d}</p>
                      )
                    }
                  </Tooltip>
                )} >
                {furnitureBtn}
              </OverlayTrigger>
            ) : furnitureBtn
          }
        </div>
        <div style={{width: '6em', marginRight: 10}}>10,20</div>
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
  })
)(FurnitureRowImpl)

export { FurnitureRow }
