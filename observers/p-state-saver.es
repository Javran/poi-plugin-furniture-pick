import {
  createSelector,
} from 'reselect'
import { observer } from 'redux-observers'

import {
  extSelector,
} from '../selectors'

import { extStateToPState, savePState } from '../p-state'

let readyFlag = false

const setReady = () => {
  readyFlag = true
}

const pStateSaver = observer(
  createSelector(extSelector, extStateToPState),
  (_dispatch, cur, prev) => {
    if (!readyFlag) {
      return
    }
    if (cur !== prev) {
      setTimeout(() => savePState(cur))
    }
  }
)

export {
  setReady,
  pStateSaver,
}
