import React from 'react';
import './Login.css';
import { LOGIN_URL } from '../../constants/apiURLs';
import { withRouter, Link } from 'react-router-dom';

class Login extends React.Component {
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

  handleSubmit = event => {
    event.preventDefault();

    fetch(LOGIN_URL, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(this.state),
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        this.props.history.push('/home');
      })
      .catch(err => {
        alert(err.message);
      });
  };
  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            name="username"
            onChange={this.handleInput}
            placeholder="username"
            type="text"
          />
          <input
            autoComplete="password"
            name="password"
            onChange={this.handleInput}
            placeholder="password"
            type="password"
          />
          <button type="submit">Sign In</button>
          <button type="button">
            <Link to="/register">I dont have an accout</Link>
          </button>
        </form>
      </div>
    );
  }
}
export default withRouter(Login);
