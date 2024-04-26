import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from '@mui/material/Typography';

export default function AboutVersioning(props) {
  return (
    <Dialog open={props.isOpen} onClose={props.handleClose} scroll="paper">
      <DialogTitle>About Versioning</DialogTitle>
      <DialogContent dividers={true}>
        <Typography gutterBottom>
          Going to use a funny SemVer for handling subtitle versioning. Instead of
          Major.Minor.Patch it'll be Stage.Completion.Patch. This is here to 
          set expectations since quick and rough translations tend to be... rough. Nobody 
          wants to make mistakes, but they can and do happen!
        </Typography>
        <Typography gutterBottom>
          Stage will be 1 for a single pass rough translation, 2 for a TL check and edit pass,
          and 3 for an in depth check and edit. Depending on available capacity, it might not go
          beyond 1 sometimes, but the target is at least 2.
        </Typography> 
        <Typography gutterBottom>
          Completion will be a number from 0-9 dictating how much progress has been made to reach the next Stage.
        </Typography> 
        <Typography gutterBottom>
          Patch will be quick fixes for any glaring or major errors.
        </Typography> 
      </DialogContent>
    </Dialog>
  );
}
