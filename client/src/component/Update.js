import React, { Component } from 'react';
import InputTextField from './InputTextField';

export default class Update extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            data: this.props.dataParentToChild
        }
    }

  render() {
    
    const {data} = this.state;
        return(
            <div>
                <p>=================</p>
                {data}
            </div>
        )
  }
}
