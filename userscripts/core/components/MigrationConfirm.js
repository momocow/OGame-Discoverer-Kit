import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { goog } from '@lib/utils'

export default class MigrationConfirm extends React.Component {
  static propTypes = {
    legacyVersion: PropTypes.number,
    targetVersion: PropTypes.number
  }

  componentDidMount () {
    this.open()
    console.log('open', this)
  }

  state = {
    open: false
  }

  open () {
    this.setState({
      open: true
    })
  }

  close () {
    this.setState({
      open: false
    })
  }

  render () {
    function id () {
      return 'ogdk-migration-' + goog.getRandomString()
    }

    const titleId = id()
    const descId = id()

    return (
      <Dialog
        open={this.state.open}
        disableBackdropClick
        onClose={() => this.close()}
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <DialogTitle id={titleId}>Data migration required!</DialogTitle>
        <DialogContent>
          <DialogContentText id={descId}>
            Data in your storage is formatted under v{this.props.legacyVersion},
            are you sure you want to upgrade them to v{this.props.targetVersion} now?
            <br />
            * You can upgrade storage data immediately
              or disable the script to prevent this dialog from showing up.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.close()} color="primary" autoFocus>
            Upgrade
          </Button>
          <Button onClick={() => this.close()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
