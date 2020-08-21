import Confirm from '@lib/components/Confirm'
import { Local, VERSION as targetVersion } from '@lib/storage'
import { generateElementId } from '@lib/utils/dom'
import React from 'react'


export default class App extends React.Component {
  state = {
    elementId: generateElementId(),
    isUpgradeConfirmOpened: false,
    currentVersion: Local.getVersion()
  }

  openUpgradeConfirm () {
    this.setState({
      currentVersion: Local.getVersion(),
      isUpgradeConfirmOpened: true
    }) 
  }

  componentDidMount () {
    if (Local.isStale()) {
      this.setState({
        currentVersion: Local.getVersion(),
        isUpgradeConfirmOpened: true
      })
    }
  }

  render () {
    const currentVersion = Local.getVersion()
    return (
      <div id={this.state.elementId}>
        <Confirm
          open={this.state.isUpgradeConfirmOpened}
          title="🚀 OGDK: Storage upgrade"
          message="Click to upgrade data in your storage or you can disable OGDK manually."
          onClose={() => this.setState({ isUpgradeConfirmOpened: false })}
          onConfirm={() => Local.upgrade(currentVersion, targetVersion)}
        >
          <ul>
            <li>Current version: v{currentVersion}</li>
            <li>Target version: v{targetVersion}</li>
          </ul>
        </Confirm>
      </div>
    )
  }
}
