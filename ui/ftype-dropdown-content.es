import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

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
    fType: PTyp.string.isRequired,
    // an optional furniture id for highlighting the current in-game choice
    hlId: PTyp.number,
  }

  static defaultProps = {
    hlId: null,
  }

  render() {
    const {fType} = this.props
    return (
      <Fragment>
        {fType}
      </Fragment>
    )
  }
}

const FTypeDropdownContent = connect(
  (state, ownProps) => {
    const {fType} = ownProps
    const ftId = furnitureTypes.findIndex(x => x === fType)
    // console.log(furnituresInfoSelectorByType(ftId)(state))
    return {}
  }
)(FTypeDropdownContentImpl)

export { FTypeDropdownContent }
