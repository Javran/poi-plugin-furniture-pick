import _ from 'lodash'
import { modifyObject } from 'subtender'

const initState = {
  fBoxSmall: null,
  fBoxMedium: null,
  fBoxLarge: null,
  fCoin: null,
  fFairy: null,
}

const useitemToModifier = rawUseitem => {
  const useitems = _.keyBy(rawUseitem, 'api_id')
  const mkModifier = (id, propName) => {
    const val = _.get(useitems, [id, 'api_count'])
    return _.isInteger(val) ? modifyObject(propName, () => val) : _.identity
  }

  return _.flow([
    mkModifier(10, 'fBoxSmall'),
    mkModifier(11, 'fBoxMedium'),
    mkModifier(12, 'fBoxLarge'),
    mkModifier(52, 'fFairy'),
  ])
}

// TODO: Responses for: coin or box obtaining / consumption / musicbox
const reducer = (state = initState, action) => {
  if (action.type === '@poi-plugin-furniture-pick@Items@Replace') {
    const {newState} = action
    return newState
  }

  if (action.type === '@@Response/kcsapi/api_port/port') {
    const fCoin = _.get(action.body, ['api_basic', 'api_fcoin'])
    if (_.isInteger(fCoin))
      return modifyObject('fCoin', () => fCoin)(state)
  }

  if (action.type === '@@Response/kcsapi/api_get_member/require_info') {
    const modifier = useitemToModifier(_.get(action.body,'api_useitem'))
    return modifier(state)
  }

  if (action.type === '@@Response/kcsapi/api_get_member/useitem') {
    const modifier = useitemToModifier(action.body)
    return modifier(state)
  }

  return state
}

const actionCreators = {
  itemsReplace: newState => ({
    type: '@poi-plugin-furniture-pick@Items@Replace',
    newState,
  }),
}


export {
  reducer,
  actionCreators,
}
