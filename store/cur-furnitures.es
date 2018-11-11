/*
   this reducer keeps track of current set of furnitures selected in the game.
 */
import _ from 'lodash'
import { modifyObject } from 'subtender'

const initState = {
  // any `null` value indicates that piece of info is unknown.
  floor: null,
  wallpaper: null,
  window: null,
  wallhanging: null,
  shelf: null,
  desk: null,
}

const furnitureTypes = [
  /* 0 */ 'floor',
  /* 1 */ 'wallpaper',
  /* 2 */ 'window',
  /* 3 */ 'wallhanging',
  /* 4 */ 'shelf',
  /* 5 */ 'desk',
]

const reducer = (state = initState, action) => {
  if (action.type === '@poi-plugin-furniture-pick@CurFurnitures@Replace') {
    const {newState} = action
    return newState
  }

  /*
     NOTE: we could have tracked `@@Response/kcsapi/api_req_furniture/change`,
     whose return value is in a well-structured manner, but since an immediately
     followed api_port/port response have everything we need and is more common,
     we'll only deal with that.
   */

  /*
  if (action.type === "@@Response/kcsapi/api_req_furniture/change") {
    const raw = action.postBody
    const newState = {}
    _.keys(initState).forEach(fTyp => {
      const rawKey = `api_${fTyp}`
      newState[fTyp] = Number(raw[rawKey])
    })
    return newState
  }
  */

  if (action.type === "@@Response/kcsapi/api_port/port") {
    const rawArr = action.body.api_basic.api_furniture
    // modify state object through modifiers.
    // since most of api_port won't involve changing furnitures
    // hopefully we'll end up keeping the original object
    return _.flow(
      // chain modifiers to try modifying each property.
      furnitureTypes.map((ty, ind) => modifyObject(ty, () => rawArr[ind]))
    )(state)
  }

  /*
  // we could have handled this API, but since this only happens when a coin box
  // is opened, it won't change anything in terms of current furinitures.
  if (action.type === "@@Response/kcsapi/api_get_member/basic") {
    const rawArr = action.body.api_furniture
    return rawArrayToObj(rawArr)
  }
  */

  return state
}

const actionCreators = {
  curFurnituresReplace: newState => ({
    type: '@poi-plugin-furniture-pick@CurFurnitures@Replace',
    newState,
  }),
}

export {
  initState,
  reducer,
  actionCreators,
}
