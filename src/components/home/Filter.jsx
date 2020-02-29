import React from 'react';
import './Filter.css';

import { AD_LIMIT_PER_PAGE } from '../../constants/appConstants';
import { getAds, createURLQuery } from '../../js/apiCalls';

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
      () => this.loadAds()
    );
  };

  nextPage = () => {
    const currentSkip = this.state.skip || 0;
    this.setState(
      {
        skip: String(Number(currentSkip) + 15)
      },
      () => {
        this.loadAds();
      }
    );
  };

  componentDidMount() {
    this.loadAds();
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
      filterIsChanged: true
    });
  };

  loadAds = () => {
    const query = createURLQuery({ ...this.state });
    getAds(query).then(result => {
      this.props.onSubmit(result);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState(
      {
        skip: '',
        filterIsChanged: false
      },
      () => {
        this.loadAds();
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
          Sell
          <input
            value="true"
            onChange={this.handleInput}
            name="venta"
            type="radio"
          />
        </label>
        <label>
          Buy
          <input
            value="false"
            onChange={this.handleInput}
            name="venta"
            type="radio"
          />
        </label>
        <label>
          All
          <input
            value=""
            onChange={this.handleInput}
            name="venta"
            type="radio"
            defaultChecked={true}
          />
        </label>
        <select
          defaultValue={loadedTags[0]}
          onChange={this.handleInput}
          name="tag"
        >
          {loadedTags.map(tag => {
            return (
              <option key={tag} value={tag ? tag : ''}>
                {tag ? tag : 'Select a Tag'}
              </option>
            );
          })}
        </select>
        <button id="filterButton">Filter</button>

        <button
          className="pagination"
          disabled={
            this.state.skip && !this.state.filterIsChanged ? '' : 'disabled'
          }
          onClick={this.previousPage}
          type="button"
        >
          Previous
        </button>
        <div className="pagination ">Page: {page}</div>
        <button
          className="pagination"
          disabled={this.state.filterIsChanged ? 'disabled' : ''}
          onClick={this.nextPage}
          type="button"
        >
          Next
        </button>
      </form>
    );
  }
}
export default Filter;
