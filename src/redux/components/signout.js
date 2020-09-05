import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router-dom';
import logo from '../components/pictures/twitch.png'

class Signout extends Component {
 
    componentWillMount() {
        this.props.signoutUser()
    }


    render() {


        return (
            <div className="column justify-content-md-center">
              
                <Link to='/'>
                    <img src={logo} alt="game pic" className="logo2" />
                </Link>

                <h4 className="mt-5 signout-text"><i>A très bientôt sur votre catalogue !</i></h4>
                <div><iframe src="https://gifer.com/embed/3w4" width="400px" height="300px" frameBorder="0" allowFullScreen></iframe></div>
            </div>
        );
    }
}



export default connect(null, actions)(Signout);
