import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { grouppedFurnituresInfoSelector } from '../selectors'

import { PTyp } from '../ptyp'

class PickerMainImpl extends Component {
  static propTypes = {
    grouppedFurnituresInfo: PTyp.object.isRequired,
  }

  render() {
    return (
      <div>furniture picker</div>
    )
  }
}

const PickerMain = connect(
  createStructuredSelector({
    grouppedFurnituresInfo: grouppedFurnituresInfoSelector,
  })
)(PickerMainImpl)

export { PickerMain }
