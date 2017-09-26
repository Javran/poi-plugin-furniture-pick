import { modifyObject, modifyArray, not } from 'subtender'
import { defaultFurnitures } from '../common'

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
  uiPickFurniture: (id, type) =>
    actionCreators.uiPickedFurnituresModify(
      modifyArray(type, () => ({id, locked: false}))
    ),
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
