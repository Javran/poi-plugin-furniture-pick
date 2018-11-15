import _ from 'lodash'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { MenuItem, OverlayTrigger, Tooltip } from 'react-bootstrap'

import { PTyp } from '../ptyp'
import {
  furnituresInfoSelectorByType,
} from '../selectors'

// TODO: we need a cleanup to settle on either descriptive furniture type or
// number as type, but not using both at the same time.
import { furnitureTypes } from '../store/cur-furnitures'

// FType is short for FurnitureType
class FTypeDropdownContentImpl extends Component {
  static propTypes = {
    // an optional furniture id for highlighting the current in-game choice
    hlId: PTyp.number,
    furniturePages: PTyp.array.isRequired,
  }

  static defaultProps = {
    hlId: null,
  }

  render() {
    const {hlId, furniturePages} = this.props
    return (
      <Fragment>
        {
          _.flatMap(
            furniturePages,
            (furniturePage, ind) => {
              const items = furniturePage.map(x => {
                const {id,name,description} = x
                const active = id === hlId
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
      </Fragment>
    )
  }
}

const FTypeDropdownContent = connect(
  (state, ownProps) => {
    const {fType} = ownProps
    const ftId = furnitureTypes.findIndex(x => x === fType)
    const furnitureList = furnituresInfoSelectorByType(ftId)(state)
    const furniturePages = _.chunk(furnitureList, 10)
    return {furniturePages}
  }
)(FTypeDropdownContentImpl)

export { FTypeDropdownContent }
