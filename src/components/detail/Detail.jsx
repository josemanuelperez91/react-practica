import React from 'react';
import './Detail.css';
import { getAdDetails } from '../../js/apiCalls';
import { Link } from 'react-router-dom';
const _ = require('lodash');

class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      adData: {}
    };
  }
  componentDidMount() {
    const ID = this.props.match.params.ID;
    getAdDetails(ID).then(result => {
      if (result.success) {
        this.setState({
          adData: result.result
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
  render() {
    const loadedAdData = this.state.adData;

    if (!_.isEmpty(loadedAdData)) {
      const createDate = new Date(loadedAdData.createdAt).toLocaleString();
      const updateDate = new Date(loadedAdData.updatedAt).toLocaleString();

      return (
        <div className="Detail">
          <h1>{loadedAdData.name}</h1>
          <img alt={loadedAdData.name} src={loadedAdData.photo} />
          <p>Type: {loadedAdData.type}</p>
          <p>Price: {loadedAdData.price} €</p>
          <p id="description">{loadedAdData.description}</p>
          Tags:
          <ul>
            {loadedAdData.tags.map(tag => {
              return <li>{tag}</li>;
            })}
          </ul>
          <p>Created: {createDate}</p>
          <p>Last update: {updateDate}</p>
          <button>
            <Link to="/home">Back</Link>
          </button>
        </div>
      );
    } else {
      return <div className="Detail">LOADING AD...</div>;
    }
  }
}
export default Detail;
