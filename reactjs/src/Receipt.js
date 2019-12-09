import React, { Component } from 'react';

class Receipt extends Component {
    render(){
        return(
                <div>
                {this.props.date} 
                <br/> <img src={"http://slapps.fr:8088/"+this.props.path}/>
                <br/>
                <i>
                Location - {this.props.location}
                <br/>
                Comment - {this.props.comment}
                <br/>
                Analysis - {this.props.output}
                </i>
                <br/>
                </div>
                )
    }
}
export default Receipt;
