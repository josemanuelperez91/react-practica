import React from 'react';
import { ANUNCIOS_URL } from '../../constants/apiURLs';
import './Filter.css';

const _ = require('lodash');

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      tag: '',
      min: '',
      max: ''
    };
  }

  componentDidMount() {}

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    let filterParams = { ...this.state };
    if (filterParams.min || filterParams.max)
      filterParams.price = `${filterParams.min}-${filterParams.max}`;
    filterParams = _.omit(filterParams, 'max', 'min');
    filterParams = _.omitBy(filterParams, _.isEmpty);

    const url = new URL(ANUNCIOS_URL);
    url.search = new URLSearchParams(filterParams);

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
        this.props.onSubmit(result.results);
      })
      .catch(err => {
        alert(err.message);
      });
  };
  render() {
    const loadedTags = this.props.tags;
    return (
      <form className="Filter" onSubmit={this.handleSubmit}>
        <input
          name="name"
          onChange={this.handleInput}
          placeholder="Name"
          type="text"
        />
        <input
          onChange={this.handleInput}
          name="min"
          type="number"
          placeholder="min price"
          max={this.state.max}
        />
        <input
          onChange={this.handleInput}
          name="max"
          type="number"
          placeholder="max price"
          min={this.state.min}
        />

        <select onChange={this.handleInput} name="tag">
          {loadedTags.map(tag => {
            return (
              <option key={tag} value={tag}>
                {tag}
              </option>
            );
          })}
        </select>
        <button>Filter</button>
      </form>
    );
  }
}
export default Filter;
