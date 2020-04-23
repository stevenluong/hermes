import React, { Component } from 'react';
import { Button,Grid, Row, Col,Table } from 'react-bootstrap';
//import logo from './logo.svg';
import './App.css';
import Upload from './Upload.js';
import ReceiptsList from './ReceiptsList.js';

class App extends Component {
    constructor() {
        super();
        var url = window.location.href;  
        var s = url.split('/');
        this.state = {
            display:s[s.length-1]
        };
    }
n
    render() {
        return (
                <div>
                {this.state.display=="Upload" &&
                <Upload/>
                }
                {this.state.display=="List" &&
                <ReceiptsList/>
                }
                </div>
               );

    }
}
export default App;
