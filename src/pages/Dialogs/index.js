import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";



function AlertDialog(
    {
        openAlert,
        header,
        closeAlertDialog,
        handleSubmit
    }
){
      return (
              <Dialog
                open={openAlert}
                onClose={closeAlertDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {`Delete ${header}`}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this Item ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeAlertDialog} color="primary">
                    Close
                  </Button>
                  <Button onClick={handleSubmit} color="primary" autoFocus>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
      );
  };

  export default AlertDialog;