import React from 'react';
import { ANUNCIOS_URL } from '../../constants/apiURLs';

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      tag: ''
    };
  }
  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();

    const url = new URL(ANUNCIOS_URL);
    url.search = new URLSearchParams(this.state);

    fetch(url, {
      method: 'get',
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(result => {
        this.props.onSubmit(result);
      })
      .catch(err => {
        alert(err.message);
      });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          onChange={this.handleInput}
          placeholder="Name"
          type="text"
        />
        <button>Filter</button>
      </form>
    );
  }
}
export default Filter;