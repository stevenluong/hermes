import React, { Component } from 'react';
import Receipt from './Receipt.js';
class ReceiptsList extends Component {
    constructor() {
        super();
        this.state = {
            receipts:[],
        };
        this.load();
    }
    load(){
        var receipts = [];
        fetch("http://slapps.fr:3001/api/receipts",{
            method: 'GET'
        }).then(res=>{
                return res.json();
        }).then(res=>{
            console.log(res);
            res.map(r=>{
                receipts.push(r);
            })
            this.setState({receipts:receipts})
        })
    }
    render(){
        return(
                <div>
                <h2>Receipts</h2>
                {this.state.receipts.map(receipt=>
                                          <Receipt key={receipt.id} path={receipt.path} location={receipt.location} comment={receipt.comment} date={receipt.date}/> 
                        )}
                </div>
              )
    }
}
export default ReceiptsList;
