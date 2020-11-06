import React, { Component } from 'react';
import * as emailjs from 'emailjs-com';
import Recaptcha from 'react-recaptcha';
import logo3 from '../../redux/components/pictures/mario.png'


class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      message: '',
      isVerified: false,

    };
  }

  recaptchaLoaded() {
    console.log('captcha has loaded');
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified : true
      })
    }
  }

  resetForm() {
    this.setState({
      name: '',
      email: '',
      message: '',
     
    });
  }

  handleChange = (param, e) => {
    this.setState({ [param]: e.target.value });
  };

  handleSubmit = e => {

    e.preventDefault();
    
    if (this.state.isVerified) {
      alert('Message envoyé avec succés !');

      
      const { name, email, message } = this.state;
      let templateParams = {
        from_name: email,
        to_name: name,
        message_html: message,
      };

      emailjs.send('gmail', 'template_f0X8fBD2', templateParams, process.env.REACT_APP_EMAILJS);
      this.resetForm();

    } else {

      alert('Verifiez que vous êtes un humain ! ')
      
    }
   
  }


  render() {

    return (
      <div className="container-form-main">
     
        <form className="container-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="contact-logo-part">
          <img src={logo3}  alt="mario" className="logo3"/>  
        </div>
          <div className="contactform">
            <input
              type="text"
              name="name"
              value={this.state.name}
              className="text"
              onChange={this.handleChange.bind(this, 'name')}
              placeholder="NOM"
              required
            />
            
            <input
              type="email"
              name="email"
              value={this.state.email}
              className="text"
              onChange={this.handleChange.bind(this, 'email')}
              placeholder="EMAIL"
              required
            />
            
            <textarea
              className="textarea"
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.handleChange.bind(this, 'message')}
              placeholder="MESSAGE"
              required
            />
            <div className="buttons-container">
              <button
                className="button-send"
                type="submit"
                onClick={() => this.handleSubmit.bind(this)}
              >
                SUBMIT
              </button>

              <Recaptcha
                sitekey={process.env.REACT_APP_RECAPTCHA}
                render="explicit"
                onloadCallback={this.recaptchaLoaded.bind(this)}
                verifyCallback={this.verifyCallback.bind(this)}
                theme="dark"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Contact;
