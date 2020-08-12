import React, { Component } from 'react';
import * as emailjs from 'emailjs-com';


class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      message: '',

    };
  }
  handleSubmit = e => {
    e.preventDefault();
    const { name, email, message } = this.state;
    let templateParams = {
      from_name: email,
      to_name: name,
      message_html: message,
    };

    emailjs.send('gmail', 'template_f0X8fBD2', templateParams, 'user_2puqpCKuOLP7C2RXBLYZm');
    this.resetForm();
    
  };
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
  render() {
    return (
      <div className="container-form-main">
     
        
        <form className="container-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="contactform">
            <input
              type="text"
              name="name"
              value={this.state.name}
              className="text-primary"
              onChange={this.handleChange.bind(this, 'name')}
              placeholder="NAME"
              required
            />
            
            <input
              type="email"
              name="email"
              value={this.state.email}
              className="text-primary"
              onChange={this.handleChange.bind(this, 'email')}
              placeholder="EMAIL"
              required
            />
            
            <textarea
              className="textarea text-primary"
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.handleChange.bind(this, 'message')}
              placeholder="YOUR MESSAGE"
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
            </div>
          </div>
        </form>
     
      </div>
    );
  }
}
export default Contact;
