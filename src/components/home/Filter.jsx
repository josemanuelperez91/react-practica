import React from 'react';
import { ANUNCIOS_URL } from '../../constants/apiURLs';
import './Filter.css';
import { AD_LIMIT_PER_PAGE } from '../../constants/ui';

const _ = require('lodash');

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      tag: '',
      min: '',
      max: '',
      venta: '',
      limit: AD_LIMIT_PER_PAGE,
      skip: '',
      filterIsChanged: false
    };
  }

  previousPage = () => {
    let currentSkip = this.state.skip || 0;
    currentSkip = Number(currentSkip) - 15;

    if (currentSkip <= 0) {
      currentSkip = '';
    }

    this.setState(
      {
        skip: String(currentSkip)
      },
      () => this.retrieveAds()
    );
  };

  nextPage = () => {
    const currentSkip = this.state.skip || 0;
    this.setState(
      {
        skip: String(Number(currentSkip) + 15)
      },
      () => {
        this.retrieveAds();
      }
    );
  };

  componentDidMount() {
    this.retrieveAds();
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
      filterIsChanged: true
    });
  };

  retrieveAds = () => {
    const dynamicURL = this.handleURL();
    fetch(dynamicURL, {
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
      });
  };

  handleURL = () => {
    let filterParams = { ...this.state };
    if (filterParams.min || filterParams.max)
      filterParams.price = `${filterParams.min}-${filterParams.max}`;

    filterParams = _.omit(filterParams, 'max', 'min');
    filterParams = _.omitBy(filterParams, _.isEmpty);

    let url = new URL(ANUNCIOS_URL);
    url.search = new URLSearchParams(filterParams);
    return url;
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState(
      {
        skip: '',
        filterIsChanged: false
      },
      () => {
        this.retrieveAds();
      }
    );
  };

  render() {
    const loadedTags = this.props.tags;

    const page = this.state.skip
      ? (Number(this.state.skip) + 15) / this.state.limit
      : 1;

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
        <label>
          Venta
          <input
            value="true"
            onChange={this.handleInput}
            name="venta"
            type="radio"
          />
        </label>
        <label>
          Compra
          <input
            value="false"
            onChange={this.handleInput}
            name="venta"
            type="radio"
          />
        </label>
        <label>
          Todo
          <input
            value=""
            onChange={this.handleInput}
            name="venta"
            type="radio"
            defaultChecked={true}
          />
        </label>
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
        <button
          disabled={
            this.state.skip && !this.state.filterIsChanged ? '' : 'disabled'
          }
          onClick={this.previousPage}
          type="button"
        >
          ←
        </button>
        <span>Page: {page}</span>
        <button
          disabled={this.state.filterIsChanged ? 'disabled' : ''}
          onClick={this.nextPage}
          type="button"
        >
          →
        </button>
      </form>
    );
  }
}
export default Filter;
