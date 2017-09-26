const reducer = (state = null, action) => {
  if (action.type === '@poi-plugin-furniture-pick@MstFurnitures@Replace') {
    const {newState} = action
    return newState
  }

  if (action.type === '@@Response/kcsapi/api_start2') {
    return action.body.api_mst_furniture
  }
  return state
}

const actionCreators = {
  mstFurnituresReplace: newState => ({
    type: '@poi-plugin-furniture-pick@MstFurnitures@Replace',
    newState,
  }),
}

export {
  reducer,
  actionCreators,
}
