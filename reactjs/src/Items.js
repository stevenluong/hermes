import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Common/Title';

import Liability from './Liability';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default function Items({receipts}) {
  //var cleanedNews = props.news;

  var sortedItems = [];//.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))
  receipts.forEach(r => {
    if(!r.items)
      return false;
    r.items.forEach(i => {
      sortedItems.push(i);
    })
  })
  console.log(sortedItems);
  //console.log(sortedLiabilities)

  //const [item, setLiability] = React.useState({name:"",value:"", type:"", income:""})
  //const [action, setAction] = React.useState("new")
  //const [open, setOpen] = React.useState(false);
  //const [asset, setAsset] = React.useState({})
/*
  const handleEdit = (asset) => {
    console.log(asset);
    setAction("edit");
    setLiability(asset);
    setOpen(true);
  };
*/
  return (
    <React.Fragment>
      <Title id="liabilities">Favorite items</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Avg. Price</TableCell>
            <TableCell>Var</TableCell>
            <TableCell>Cheapest Location</TableCell>
            <TableCell>Price</TableCell>
            <TableCell padding="checkbox"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedItems.map(i => (
            <TableRow key={i.name}>
                <TableCell>{i.name}</TableCell>
                <TableCell>{i.avg}</TableCell>
                <TableCell>{i.var}</TableCell>
                <TableCell>{i.location}</TableCell>
                <TableCell>{i.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
