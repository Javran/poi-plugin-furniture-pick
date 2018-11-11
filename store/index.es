import {
  combineReducers,
  bindActionCreators,
} from 'redux'
import { store } from 'views/create-store'

import {
  reducer as mstFurnitures,
  actionCreators as mstFurnituresAC,
} from './mst-furnitures'
import {
  reducer as furnitures,
  actionCreators as furnituresAC,
} from './furnitures'

import {
  reducer as ui,
  actionCreators as uiAC,
} from './ui'

import {
  reducer as items,
  actionCreators as itemsAC,
} from './items'

import {
  reducer as curFurnitures,
  actionCreators as curFurnituresAC,
} from './cur-furnitures'


const reducer = combineReducers({
  mstFurnitures,
  furnitures,
  curFurnitures,
  items,
  ui,
})

const initState = reducer(undefined, {type: '@@INIT'})

const actionCreators = {
  ...mstFurnituresAC,
  ...furnituresAC,
  ...curFurnituresAC,
  ...itemsAC,
  ...uiAC,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const withBoundActionCreators = (func, dispatch=store.dispatch) =>
  func(mapDispatchToProps(dispatch))

export {
  initState,
  reducer,

  mapDispatchToProps,
  actionCreators,
  withBoundActionCreators,
}
