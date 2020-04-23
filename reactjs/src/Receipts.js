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
import Details from './Details';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import ViewListIcon from '@material-ui/icons/ViewList';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import IconButton from '@material-ui/core/IconButton';

export default function Receipts({receipts}) {
  //console.log(assets);
  var sortedReceipts = receipts.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))
  const [receipt, setReceipt] = React.useState({})
  //const [action, setAction] = React.useState("new")
  const [open, setOpen] = React.useState(false);
  //const [asset, setAsset] = React.useState({})

  const handleView = (receipt) => {
    console.log(receipt);
    //setAction("edit");
    setReceipt(receipt);
    setOpen(true);
  };

  //console.log(sortedAssets)
  return (
    <React.Fragment>
      <Title id="assets">Receipts</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Status</TableCell>
            <TableCell padding="checkbox">Details</TableCell>
            <TableCell padding="checkbox">Analysis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedReceipts.map(r => (
            <TableRow key={r._key}>
                <TableCell>{r.date}</TableCell>
                <TableCell>{r.total}</TableCell>
                <TableCell>{r.location}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell padding="checkbox">
                  <IconButton aria-label="view" onClick={() => handleView(r)}>
                    <ViewListIcon />
                  </IconButton>
                </TableCell>
                <TableCell padding="checkbox">
                  <IconButton aria-label="view" onClick={() => handleView(r)}>
                    <ViewComfyIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
          ))}

        </TableBody>
      </Table>
      <Details receipt={receipt} setOpen={setOpen} open={open}/>

    </React.Fragment>
  );
}
