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

const normalizeDesc = raw => {
  const trimmed = raw.trim()
  return trimmed ? _.compact(trimmed.split('<br>')) : null
}

const getFurnitureInfoFuncSelector = createSelector(
  indexedMstFurnituresSelector,
  $furnitures =>
    id => {
      const $furniture = $furnitures[id]
      if (!$furniture)
        return {id, type: null, name: `ID: ${id}`, description: null}
      return {
        id,
        type: $furniture.api_type,
        name: $furniture.api_title,
        description: normalizeDesc($furniture.api_description),
      }
    }
)

const grouppedFurnituresSelector = createSelector(
  furnituresSelector,
  furnitures => _.groupBy(furnitures,'api_furniture_type')
)

const grouppedFurnituresInfoSelector = createSelector(
  grouppedFurnituresSelector,
  getFurnitureInfoFuncSelector,
  (grouppedFurnituresRaw, getFurnitureInfoFunc) => {
    const processFurnitureArr = fs => fs.map(x =>
      getFurnitureInfoFunc(x.api_id)
    )
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
  getFurnitureInfoFuncSelector,
}
