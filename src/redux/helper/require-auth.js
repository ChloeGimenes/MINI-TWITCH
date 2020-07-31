import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Composant d'ordre supérieur HOC
export default function(ChildComponent) {

    class RequireAuthentication extends Component {
    
        componentWillMount() {
            if(!this.props.isLoggedIn){
                this.props.history.push("/");
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.isLoggedIn){
                this.props.history.push("/")
            }
        }

        render() {
            
            return this.props.isLoggedIn && <ChildComponent />;
        }
    }

    const mapStateToProps = ( state) => {
        return {
            isLoggedIn : state.authentication.isLoggedIn
        }  
    };

    return withRouter(connect(mapStateToProps)(RequireAuthentication));
}


