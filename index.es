import { store } from 'views/create-store'

import {
  reducer,
  withBoundActionCreators,
} from './store'
import {
  globalSubscribe,
  globalUnsubscribe as pluginWillUnload,
} from './observers'

import { setReady } from './observers/p-state-saver'
import { loadPState } from './p-state'
import { PickerMain as reactClass } from './ui'
import { currentFurnituresSelector } from './selectors'

const pluginDidLoad = () => {
  globalSubscribe()
  setTimeout(() => withBoundActionCreators(bac => {
    try {
      const pState = loadPState()
      if (pState) {
        const {furnitures, mstFurnitures} = pState
        bac.furnituresReplace(furnitures)
        bac.mstFurnituresReplace(mstFurnitures)
      }
    } finally {
      const ids = currentFurnituresSelector(store.getState())
      ids.map((id,ind) => bac.uiPickFurniture(id,ind))
      setReady()
    }
  }))
}

export {
  pluginDidLoad,
  pluginWillUnload,
  reactClass,
  reducer,
}
