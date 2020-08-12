const PROVIDER_EVENT_NAME = 'dependency-provider'
const GLOBAL_NAME = Symbol.for(PROVIDER_EVENT_NAME)

function getDependencyMap () {
  if (typeof this[GLOBAL_NAME] === 'undefined') {
    this[GLOBAL_NAME] = new Map()
  }
  return this[GLOBAL_NAME]
}

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
