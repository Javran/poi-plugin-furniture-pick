import { ensureDirSync, readJsonSync, writeJsonSync } from 'fs-extra'
import { join } from 'path-extra'

const $version = 'initial'

const extStateToPState = extState => {
  // note that curFurnitures is not being stored on purpose
  // as api_port is easily available and it's unlikely that
  // anyone want to see furnitures during battle or before logging into
  // the game, we are safe.
  const {mstFurnitures, furnitures, items} = extState
  return {mstFurnitures, furnitures, items}
}

const getPStateFilePath = () => {
  const {APPDATA_PATH} = window
  const path = join(APPDATA_PATH,'furniture-pick')
  ensureDirSync(path)
  return join(path,'p-state.json')
}

const savePState = pState => {
  const path = getPStateFilePath()
  try {
    writeJsonSync(path, {...pState, $version})
  } catch (err) {
    console.error('Error while writing to p-state file', err)
  }
}

const updatePState = oldPState => {
  if (
    oldPState && typeof oldPState === 'object' &&
    oldPState.$version === $version
  ) {
    const {$version: _ignored, ...pState} = oldPState
    return pState
  }

  throw new Error('failed to update the p-state')
}

const loadPState = () => {
  try {
    return updatePState(readJsonSync(getPStateFilePath()))
  } catch (err) {
    if (err.syscall !== 'open' || err.code !== 'ENOENT') {
      console.error('Error while loading config', err)
    }
  }
  return null
}

export {
  extStateToPState,
  savePState,
  loadPState,
}
