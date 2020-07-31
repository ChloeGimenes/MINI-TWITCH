import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Signout extends Component {
 
    componentWillMount() {
        this.props.signoutUser()
    }
    render() {

        return (
            <div className="row justify-content-md-center">
                <h1 className="mt-5">Au revoir !</h1>
            </div>
        );
    }
}



export default connect(null, actions)(Signout);
