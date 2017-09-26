const reducer = (state = null, action) => {
  if (action.type === '@poi-plugin-furniture-pick@Furnitures@Replace') {
    const {newState} = action
    return newState
  }

  if (action.type === '@@Response/kcsapi/api_get_member/require_info') {
    return action.body.api_furniture
  }
  return state
}

const actionCreators = {
  furnituresReplace: newState => ({
    type: '@poi-plugin-furniture-pick@Furnitures@Replace',
    newState,
  }),
}

export {
  reducer,
  actionCreators,
}
