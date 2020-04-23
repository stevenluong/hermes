import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Title from './Common/Title';

import Dialog from '@material-ui/core/Dialog';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function Details({receipt, open, setOpen}) {
  //console.log(asset);
  //console.log(open);
  //console.log(action);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };
  //setOpen(editOpen);
  const handleClose = () => {
    setOpen(false);
  };
  var row = 0;
  if(receipt.analysis)
    row = receipt.analysis.split("\n").length;
  //console.log(sortedAssets)
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="lg"
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Title>Details</Title>
            <br/>
            <TextField
              disabled
              id="filled-multiline-static"
              label="Extract"
              multiline
              rows={row}
              fullWidth={true}
              defaultValue={receipt.analysis}
              variant="filled"
            />
          </div>
        </Fade>
      </Dialog>
  );
}
