import React from 'react'
import ReactDOM from 'react-dom'

import { Local, VERSION } from '@lib/storage'
import MigrationConfirm from './components/MigrationConfirm'

(function () {
  const document = unsafeWindow.document
  const rootEl = document.createElement('div')
  rootEl.id = 'ogdk-root'
  document.body.appendChild(rootEl)

  if (Local.isStale()) {
    ReactDOM.render(
      <MigrationConfirm
        legacyVersion={Local.getVersion()}
        targetVersion={VERSION} />,
      rootEl
    )
  }
})()
