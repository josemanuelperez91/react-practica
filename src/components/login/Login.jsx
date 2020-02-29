import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { signIn } from '../../js/apiCalls';
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

    signIn({ ...this.state }).then(response => {
      if (response.ok) {
        this.props.history.push('/home');
      }
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
          <button className="greenButton" type="submit">
            Sign In
          </button>
          <button type="button">
            <Link to="/register">I dont have an accout</Link>
          </button>
        </form>
      </div>
    );
  }
}
export default withRouter(Login);
