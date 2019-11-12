import React, { Component } from 'react';
import { Button,Grid, Row, Col,Table } from 'react-bootstrap';
//import logo from './logo.svg';
import './App.css';
import Upload from './Upload.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

        render() {
        return (
                <div>
                <Upload/>
                                </div>
               );

    }
}
export default App;
