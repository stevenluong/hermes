import React from 'react';
import Title from './Common/Title';

export default function Summary({user, receipts}) {
  var total = 0;
  receipts.forEach(r =>{
    if(r.total)
      total = total + r.total;
  })
  return (
    <React.Fragment>
      <Title id="summary">Summary</Title>
      <h2>Total : {total}{user.currency}</h2>
    </React.Fragment>
  );
}
