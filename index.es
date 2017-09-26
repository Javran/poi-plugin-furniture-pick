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
  setTimeout(() => {
    try {
      const pState = loadPState()
      if (pState) {
        const {furnitures, mstFurnitures} = pState
        withBoundActionCreators(bac => {
          bac.furnituresReplace(furnitures)
          bac.mstFurnituresReplace(mstFurnitures)
        })
      }
    } finally {
      setReady()
    }
  })
}

export {
  pluginDidLoad,
  pluginWillUnload,
  reactClass,
  reducer,
}
