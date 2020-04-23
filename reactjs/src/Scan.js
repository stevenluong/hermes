import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Title from './Common/Title';
import moment from 'moment';

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
  input: {
    display: 'none',
  },
}));

export default function Scan({user, receipts, setReceipts}) {
  const classes = useStyles();
  const [file, setFile] = React.useState(null)
  const [redirect, setRedirect] = React.useState(false)
  const [filename, setFilename] = React.useState("Please scan")
  const handleFileChange = (e) => {
    //console.log(e);
    e.preventDefault();
    console.log(e.target.files[0])
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    //console.log(file);
    //setSimulation({...simulation, rate:e.target.value});
  };
  //var url = "http://hermes-node.slapps.fr/uploads"; //PROD
  var url = "http://localhost:8088/uploads"; //LOCAL
  const renderRedirect = () => {
    if(redirect){
      return(
        <Redirect to={{ pathname: '/' }}/>
      )
    }

  }
  const handleSubmit = () => {
    console.log(file);
    if(!file)
      return false;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', user._key);
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(res=>{
        return res.json();
    }).then(data=>{
        console.log(data);
        data.date = moment().format("DD/MM/YYYY");
        data.status = "NEW";
        setReceipts([...receipts,data]);
        setRedirect(true);
    })
  };
  const handleFilenameChange = () => {
    //setSimulation({...simulation, rate:e.target.value});
  };
  //console.log(simulations);
  return (
    <React.Fragment>
    <Grid container direction="row" spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
        <Title>Scan</Title>
        {renderRedirect()}
        <br/>
        <input
            accept="image/*"
            id="file"
            multiple
            className={classes.input}
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file">
        <Button variant="outlined" color="primary" component="span">
          Scan
        </Button>
      </label>
        <br/>
      <TextField
          id="filename"
          label="Filename"
          variant="outlined"
          onChange={handleFilenameChange}
          value={filename}
        />
        <br/>
        <label>
          <Button
          component="span"
          variant="contained"
          color="primary"
          endIcon={<CloudUploadIcon/>}
          onClick = {handleSubmit}
        >
          Submit
        </Button>
        </label>
        <br/>
        </Paper>
      </Grid>
    </Grid>
    </React.Fragment>
  );
}
