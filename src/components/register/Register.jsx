import React from 'react';
import { signUp } from '../../js/apiCalls';
import { withRouter, Link } from 'react-router-dom';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleRepeatPassword = event => {
    if (event.target.value !== this.state.password) {
      event.target.setCustomValidity('Passwords must match');
    } else {
      event.target.setCustomValidity('');
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    signUp({ ...this.state }).then(response => {
      if (response.ok) {
        this.props.history.push('/login');
      }
    });
  };
  render() {
    return (
      <div className="Register">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            required
            name="username"
            onChange={this.handleInput}
            placeholder="username"
            type="text"
          />
          <input
            required
            autoComplete="password"
            name="password"
            onChange={this.handleInput}
            placeholder="password"
            type="password"
          />
          <input
            required
            autoComplete=""
            name="confirm-password"
            placeholder="repeat password"
            type="password"
            onLoad={this.handleRepeatPassword}
            onChange={this.handleRepeatPassword}
          />
          <button className="greenButton" type="submit">
            Sign Up
          </button>
          <button type="button">
            <Link to="/login">I have an accout</Link>
          </button>
        </form>
      </div>
    );
  }
}
export default withRouter(Register);
