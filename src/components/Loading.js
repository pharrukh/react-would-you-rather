import React, { Component } from "react";
import ReactLoading from 'react-loading';

class Loading extends Component {
    render() {
        return <div className="loading-sign">
            <ReactLoading type='bars' color='#fee715ff' height='3em' width='6em' />
        </div>
    }
}

export default Loading