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

const pluginDidLoad = () => {
  globalSubscribe()
  setTimeout(() => withBoundActionCreators(bac => {
    try {
      const pState = loadPState()
      if (pState) {
        const {furnitures, mstFurnitures} = pState
        bac.furnituresReplace(furnitures)
        bac.mstFurnituresReplace(mstFurnitures)

        // change introduced in 0.1.0: now store keeps track of 'items'
        if ('items' in pState) {
          const {items} = pState
          bac.itemsReplace(items)
        }
      }
    } finally {
      bac.uiPickedFurnituresReset()
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
