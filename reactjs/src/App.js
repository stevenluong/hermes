import React, { Component } from 'react';
import { Button,Grid, Row, Col,Table } from 'react-bootstrap';
//import logo from './logo.svg';
import './App.css';
//import io from 'socket.io-client';
//const socket = io('https://translator-node.slapps.fr');

class App extends Component {
    constructor() {
        super();

        //socket.emit('message', "hello from client");
        this.state = {
            serverOK: false,
            file:'',
            imagePreviewUrl: '',
            readyToSubmit: false,
            result:[],
            status:''
        };
/*
        socket.on('status', (status) => {
            console.log("status",status);
            this.setState({serverOK : true}); 
        });
        socket.on('progress', (progress) => {
            console.log("progress:",progress);
            if(progress.progress){
                this.setState({status:progress.status+'-'+Math.round(progress.progress*100)+"%"});
            }else{
                this.setState({status:progress.status});
                //     this.loading.setContent(progress.status);
            }
        });
        socket.on('result', (result) => {
            console.log("result:",result);
            var r = "";
            r = result.split(/\r?\n/);
            console.log("result:",r);
            this.setState({result:r});
            //this.loading.dismissAll()
            //this.result = result;
        });
*/
    }

    load(e){
        e.preventDefault();
        //let reader = new FileReader();
        this.setState({
            file:e.target.files[0],
            status:"file loaded"
        });

        /*
        var image = new Image();
        reader.onloadend = () => {
            image.onload = (imageEvent)=> {
                var canvas = document.createElement('canvas');
                var max_size = 2000;
                var width = image.width;
                console.log(width);
                var height = image.height;
                console.log(height);
                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height;
                        height = max_size;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                var dataUrl = canvas.toDataURL('image/jpeg');
                this.setState({
                    file: file,
                    imagePreviewUrl: dataUrl,//reader.result
                    readyToSubmit:true,
                });
                //console.log(reader.result);
                console.log(dataUrl);
            }
            image.src=reader.result;
        }
        reader.readAsDataURL(file)
        */
    }
    send(e){
        e.preventDefault();
        console.log("submit");
        const formData = new FormData();
        formData.append('screen', this.state.file);
        this.setState({
            status:"uploading file ..."
        });
        //socket.emit('image', this.state.imagePreviewUrl);
        fetch("http://slapps.fr:8088/uploads", {
            method: 'POST',
            mode:"no-cors",
            //headers: {'Content-Type':'multipart/form-data'},
            body: formData
        })
        .then(res=>{
            //TODO Why not "OK"?
            this.setState({
                status:"... Uploaded"
            });
            console.log(res);
        })
        

    }
    /*
    analyseLocal(e){
        e.preventDefault();
        console.log("Local");
    }
    */
    render() {
        return (
                <div>
                {this.state.status===""?"":<p>{this.state.status}</p>}
                <form>
                <input type="file" onChange={(e)=>this.load(e)}/>
                <Button type="submit" onClick={(e)=>this.send(e)}>Submit</Button>
                </form>
                </div>
               );
        /*
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} height="400"/>);
        } 
        return (

                <div>
                <p>Server is currently {this.state.serverOK?<span style={{color:"green"}}>Active</span>:<span style={{color:"red"}}>Down</span>}
                </p>
                <form onSubmit={(e)=>this.send(e)}>
                <input 
                type="file" 
                onChange={(e)=>this.load(e)} />
                {this.state.status===""?"":<p>{this.state.status}</p>}
                {this.state.result.map(r=>
                <p>{r}</p>
                                          )}
                {this.state.readyToSubmit?<Button type="submit"
                    onClick={(e)=>this.send(e)}>Submit</Button>:""
                }
                {this.state.readyToSubmit?<Button type="submit"
                    onClick={(e)=>this.analyseLocal(e)}>Local</Button>:""
                }
                </form>

                <div>
                {$imagePreview}
                </div>
                </div> 
               );
               */
        
    }
}
export default App;
