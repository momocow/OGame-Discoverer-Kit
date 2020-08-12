import NSP from './namespace'

function getDependencyMap () {
  if (typeof NSP.dependencies === 'undefined') {
    NSP.dependencies = new Map()
  }
  return NSP.dependencies
}

export const PROVIDER_EVENT_NAME = 'dependencies-provider'

export function provide (name, value) {
  const dependencies = getDependencyMap()
  dependencies.set(name, value)
  document.dispatchEvent(new CustomEvent(PROVIDER_EVENT_NAME, {
    detail: { name, value, ogdk: true }
  }))
}

function handleProviderEvent (callback, event) {
  if (event.detail.ogdk) { // event identity check
    callback(event.detail.value)
  }
}

export async function depend (name) {
  const dependencies = getDependencyMap()
  if (dependencies.has(name)) {
    return dependencies.get(name)
  }
  return new Promise((resolve) => {
    const _handleProviderEvent = handleProviderEvent.bind(
      undefined,
      (...args) => {
        document.removeEventListener(PROVIDER_EVENT_NAME, _handleProviderEvent)
        resolve(...args)
      }
    )
    document.addEventListener(PROVIDER_EVENT_NAME, _handleProviderEvent)
  })
}
