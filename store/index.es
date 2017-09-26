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

const reducer = combineReducers({
  mstFurnitures,
  furnitures,
})

const initState = reducer(undefined, {type: '@@INIT'})

const actionCreators = {
  ...mstFurnituresAC,
  ...furnituresAC,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const withBoundActionCreators = (func, dispatch=store.dispatch) =>
  func(mapDispatchToProps(dispatch))

export {
  initState,
  reducer,

  actionCreators,
  withBoundActionCreators,
}
