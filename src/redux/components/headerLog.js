import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { setAuthentication } from "../actions/index";


class HeaderLog extends Component {
   

    renderFavLabel = () => {
        if(this.props.isLoggedIn){
            return "Catalogue"
        } else {
            return " "
        }
    }

    renderAuthenticationLink = () => {
        if(this.props.isLoggedIn){
            return (
                <div className="">
                    <Link to={"/signout"} className="lien" id="lien-log">
                        Déconnexion
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="list-item-log">
                    <Link to={"/signin"} className="lien" id="lien-log">
                        Connexion
                    </Link>
                    <Link to={"/signup"} className="lien" id="lien-log">
                        Inscription
                    </Link>
                </div>
            )
        }
    }

    render(){
        return (
           
               <div className="list-item-log">
                    <Link to={"/ressources"} className="lien" id="lien-log">
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