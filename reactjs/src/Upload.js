import React, { Component } from 'react';
import { Button,Grid, Row, Col,Table } from 'react-bootstrap';
class Upload extends Component {
    constructor() {
        super();
        this.state = {
            file:'',
            status:'Please upload a file'
        };
    }
    load(e){
        e.preventDefault();
        this.setState({
            file:e.target.files[0],
            status:"file loaded"
        });

    }
    send(e){
        e.preventDefault();
        console.log("submit");
        const formData = new FormData();
        formData.append('screen', this.state.file);
        this.setState({
            status:"uploading file ..."
        });
        fetch("http://slapps.fr:8088/uploads", {
            method: 'POST',
            body: formData
        })
        .then(res=>{
            this.setState({
                status:"... Uploaded"
            });
            return res.json()
        }).then(data=>{
            console.log(data);
            var path = data.path;
            var params = {
                path : path,
                date : new Date(),
                location : "test",
                comment : "test"
            };
            fetch("http://slapps.fr:3001/api/receipts",{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            }).then(res=>{
                this.setState({
                    status:"... Uploaded and Saved" 
                });   

            })
        })


    }

    render(){
        return(
                <div>
                {this.state.status===""?"":<p>{this.state.status}</p>}
                <form>
                <input type="file" onChange={(e)=>this.load(e)}/>
                <Button type="submit" onClick={(e)=>this.send(e)}>Submit</Button>
                </form>
                </div>
              )
    }
}

export default Upload;
