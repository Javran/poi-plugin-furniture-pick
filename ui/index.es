import React, { PureComponent } from 'react'

import { FurnitureRow } from './furniture-row'

// from 74EO 0=床, 1=壁紙, 2=窓, 3=壁掛け, 4=家具, 5=机

const furnitureTypes = [1,0,5,2,3,4]

class PickerMain extends PureComponent {
  render() {
    return (
      <div style={{margin: 10}}>
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

export { PickerMain }
