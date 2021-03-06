import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";
import { withRouter } from "react-router";


class Errors extends Component {
   

   componentWillUpdate(nextProps) {
       if(this.props.location !== nextProps.location) {
           this.props.resetError()
       }
   }

    render(){
        return (
           
              this.props.error && 
              
              <div className="alert alert-danger" role="alert">
                  <div  className="mt-5">{ this.props.error}</div>
              </div>
                 
              
           
        )
    }
}

const mapStateToProps = state => {
    return {
        error : state.errors.message
    };
};


export default withRouter(connect(mapStateToProps, actions)(Errors));