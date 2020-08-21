import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { generateElementId } from '@lib/utils/dom'

function tryToClose (doClose, decision, close, event, reason) {
  try {
    doClose = decision?.() ?? doClose
  } finally {
    if (doClose !== false) {
      close(event, reason)
    }
  }
}

export default function Confirm ({
  open,
  onClose,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText,
  cancelText,
  children,
  ...dialogProps
}) {
  const [titleId, descId] = R.times(() => generateElementId(), 2)
  return (
    <Dialog
      open={open}
      disableBackdropClick
      onClose={
        (event, reason) => tryToClose(true, onCancel, onClose, event, reason)
      }
      aria-labelledby={titleId}
      aria-describedby={descId}
      {...dialogProps}
    >
      <DialogTitle id={titleId}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={descId}>{message}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button className="confirm" color="primary" autoFocus onClick={
          (event) => tryToClose(true, onConfirm, onClose, event, 'confirm')
        }>
          {confirmText}
        </Button>
        <Button onClick={
          (event) => tryToClose(true, onCancel, onClose, event, 'cancel')
        }>
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Confirm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  children: PropTypes.node
}
