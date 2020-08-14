import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { generateElementId } from '@lib/utils/dom'

export default function Confirm ({
  open,
  onClose,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText,
  cancelText,
  children
}) {
  const [ titleId ] = React.useState(generateElementId)
  const [ descId ] = React.useState(generateElementId)
  return (
    <Dialog
      open={open}
      disableBackdropClick
      onClose={onClose}
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <DialogTitle id={titleId}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={descId}>{message}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary" autoFocus>
          {confirmText}
        </Button>
        <Button onClick={onCancel}>
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
