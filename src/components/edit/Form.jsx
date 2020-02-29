import React from 'react';
import { getTags, getAdDetails } from '../../js/apiCalls';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      adData: {
        name: '',
        price: '',
        photo: '',
        type: 'sell',
        tags: [],
        description: ''
      },
      tags: []
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.adData);
  };

  handleInput = event => {
    let dataValue = event.target.value;
    if (event.target.name === 'price') {
      dataValue = Number(dataValue);
    }
    this.setState({
      adData: {
        ...this.state.adData,
        [event.target.name]: dataValue
      }
    });
  };

  handleTagSelection = event => {
    this.setState({
      adData: {
        ...this.state.adData,
        tags: Array.from(event.target.selectedOptions, item => item.value)
      }
    });
  };

  componentDidMount() {
    if (this.props.adIdentifier) {
      getAdDetails(this.props.adIdentifier).then(result => {
        if (result.success) {
          const resultData = result.result;
          const adDataLoaded = {
            name: resultData.name,
            price: Number(resultData.price),
            photo: resultData.photo,
            type: resultData.type,
            tags: resultData.tags,
            description: resultData.description
          };

          this.setState({
            adData: adDataLoaded
          });
        } else {
          if (result.error === 'Error: Not logged in') {
            this.props.history.push('/login');
          } else {
            console.error(result.error);
          }
        }
      });
    }
    getTags().then(result => {
      this.setState({
        tags: result.results
      });
    });
  }

  render() {
    const loadedTags = this.state.tags;

    return (
      <form className="Form" onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleInput}
          required
          placeholder="Name"
          name="name"
          defaultValue={this.state.adData.name}
        ></input>
        <input
          onChange={this.handleInput}
          required
          placeholder="Price"
          type="number"
          name="price"
          defaultValue={this.state.adData.price}
        ></input>
        <textarea
          onChange={this.handleInput}
          defaultValue={this.state.adData.description}
          placeholder="Description"
          name="description"
        ></textarea>

        <input
          onChange={this.handleInput}
          placeholder="Photo URL"
          required
          name="photo"
          defaultValue={this.state.adData.photo}
        ></input>

        <select
          multiple="multiple"
          onChange={this.handleTagSelection}
          name="tag"
        >
          {loadedTags.map(tag => {
            return (
              <option
                selected={this.state.adData.tags.find(selectedTag =>
                  selectedTag === tag ? 'selected' : ''
                )}
                key={tag}
                disabled={tag ? '' : 'disabled'}
                value={tag ? tag : ''}
              >
                {tag ? tag : 'Select one or more Tags'}
              </option>
            );
          })}
        </select>
        <label>
          Buy
          <input
            onChange={this.handleInput}
            value="buy"
            name="type"
            type="radio"
            checked={this.state.adData.type === 'buy' ? true : false}
          />
        </label>
        <label>
          Sell
          <input
            onChange={this.handleInput}
            value="sell"
            name="type"
            type="radio"
            checked={this.state.adData.type === 'sell' ? true : false}
          />
        </label>
        <button className="greenButton" type="submit">
          Submit
        </button>
      </form>
    );
  }
}
export default Form;
