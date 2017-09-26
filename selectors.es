import { createSelector } from 'reselect'
import _ from 'lodash'

import {
  extensionSelectorFactory,
  basicSelector,
} from 'views/utils/selectors'

import { initState } from './store'

const extSelector = createSelector(
  extensionSelectorFactory('poi-plugin-furniture-pick'),
  ext => _.isEmpty(ext) ? initState : ext)

const furnituresSelector = createSelector(
  extSelector,
  ext => ext.furnitures || []
)

const mstFurnituresSelector = createSelector(
  extSelector,
  ext => ext.mstFurnitures || []
)

const currentFurnituresSelector = createSelector(
  basicSelector,
  b => _.get(
    b,'api_furniture',
    [1,38,72,102,133,164]
  )
)

const indexedMstFurnituresSelector = createSelector(
  mstFurnituresSelector,
  mstFurnitures => _.keyBy(mstFurnitures,'api_id')
)

const grouppedFurnituresSelector = createSelector(
  furnituresSelector,
  furnitures => _.groupBy(furnitures,'api_furniture_type')
)

const grouppedFurnituresInfoSelector = createSelector(
  grouppedFurnituresSelector,
  indexedMstFurnituresSelector,
  (grouppedFurnituresRaw, $furnitures) => {
    const processFurniture = fData => {
      const id = fData.api_id
      const $furniture = $furnitures[id]
      if (!$furniture)
        return {id}
      return {
        id,
        type: $furniture.api_type,
        name: $furniture.api_title,
        description: $furniture.api_description,
      }
    }
    const processFurnitureArr = fs => fs.map(processFurniture)
    return _.mapValues(grouppedFurnituresRaw, processFurnitureArr)
  }
)

const furnituresInfoSelectorByType = _.memoize(ty =>
  createSelector(
    grouppedFurnituresInfoSelector,
    d => _.get(d,ty,[])
  )
)

export {
  extSelector,
  currentFurnituresSelector,
  grouppedFurnituresInfoSelector,
  furnituresInfoSelectorByType,
}
