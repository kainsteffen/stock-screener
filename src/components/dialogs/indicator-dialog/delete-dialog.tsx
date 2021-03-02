import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

export interface DeleteDialogProps {
  title: string;
  description: string;
  onConfirm: Function;
}

export default function DeleteDialog(props: DeleteDialogProps) {
  const [open, setOpen] = React.useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    props.onConfirm();
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={onOpen}
        variant="outlined"
        color="secondary"
        startIcon={<DeleteIcon />}
      >
        <Typography>Delete</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
