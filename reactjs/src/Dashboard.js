import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Receipts from './Receipts';
import Items from './Items';

import Summary from './Summary';

const useStyles = makeStyles(theme => ({

  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 150,
  },
}));

export default function Dashboard({user, receipts}) {
  const classes = useStyles();

  return (
    <React.Fragment>
    <Grid container direction="row" spacing={3}>
      <Grid item xs={12} md={12} lg={6}>
        <Paper className={classes.paper}>
          <Receipts receipts={receipts}/>
        </Paper>
        <br/>
        <Paper className={classes.paper}>
          <Summary user={user} receipts={receipts}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Paper className={classes.paper}>
          <Items receipts={receipts}/>
        </Paper>
      </Grid>
    </Grid>
    </React.Fragment>
  );
}
