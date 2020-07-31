import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { setAuthentication } from "../actions/index";


class HeaderLog extends Component {
   

    renderFavLabel = () => {
        if(this.props.isLoggedIn){
            return "Favoris"
        } else {
            return " "
        }
    }

    renderAuthenticationLink = () => {
        if(this.props.isLoggedIn){
            return (
                <div>
                    <Link to={"/signout"} className="nav-link">
                        Déconnexion
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="header-log">
                    <Link to={"/signin"} className="header-log-item">
                        Connexion
                    </Link>
                    <Link to={"/signup"} className="header-log-item">
                        Inscription
                    </Link>
                </div>
            )
        }
    }

    render(){
        return (
           
               <div className="header-log">
                    <Link to={"/ressources"} >
                        {this.renderFavLabel()}
                    </Link>

                    {this.renderAuthenticationLink()}

                    {/* <a href="#" className="header-log-item">
                        Inscription
                    </a> */}
               </div>
           
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn : state.authentication.isLoggedIn
    };
};

const mapDispatchToProps = {
    setAuthentication
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLog);