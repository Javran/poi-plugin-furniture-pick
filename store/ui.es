import { modifyObject, modifyArray, not } from 'subtender'
import _ from 'lodash'
import { defaultFurnitures } from '../common'
import {
  currentFurnituresSelector,
  grouppedFurnituresInfoSelector,
  pickedFurnituresSelector,
} from '../selectors'

const initState = {
  pickedFurnitures: defaultFurnitures.map(id =>
    ({id, locked: false})
  ),
}

const reducer = (state = initState, action) => {
  if (action.type === '@poi-plugin-furniture-pick@Ui@Modify') {
    const {modifier} = action
    return modifier(state)
  }
  return state
}

const actionCreators = {
  uiModify: modifier => ({
    type: '@poi-plugin-furniture-pick@Ui@Modify',
    modifier,
  }),
  uiPickedFurnituresModify: modifier =>
    actionCreators.uiModify(
      modifyObject('pickedFurnitures',modifier)
    ),
  uiPickedFurnituresReset: () =>
    (dispatch, getState) => {
      const ids = currentFurnituresSelector(getState())
      dispatch(actionCreators.uiPickedFurnituresModify(() =>
        ids.map(id => ({id, locked: false}))))
    },
  uiPickFurniture: (id, type) =>
    actionCreators.uiPickedFurnituresModify(
      modifyArray(type, () => ({id, locked: false}))
    ),
  uiPickFurnitureRandomly: () =>
    (dispatch, getState) => {
      const state = getState()
      const grouppedFurnituresInfo = grouppedFurnituresInfoSelector(state)
      const pickedFurnitures = pickedFurnituresSelector(state)
      pickedFurnitures.map(({locked},type) => {
        if (!locked) {
          const candidates = grouppedFurnituresInfo[type]
          const chosen = _.sample(candidates)
          dispatch(actionCreators.uiPickFurniture(chosen.id, type))
        }
      })
    },
  uiToggleFurnitureLock: type =>
    actionCreators.uiPickedFurnituresModify(
      modifyArray(
        type,
        modifyObject('locked', not)
      )
    ),
}

export {
  reducer,
  actionCreators,
}
