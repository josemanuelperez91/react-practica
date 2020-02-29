import React from 'react';
import './Detail.css';
import { getAdDetails } from '../../js/apiCalls';
const _ = require('lodash');

class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      adData: {}
    };
  }
  returnToHome = () => {
    this.props.history.push('/home');
  };
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
          <button onClick={this.returnToHome}>Back</button>

          <p>{loadedAdData.name}</p>
          <p>{loadedAdData.price} €</p>
          <p>{loadedAdData.description}</p>
          <p>{loadedAdData.type}</p>
          <p>{createDate}</p>
          <p>{updateDate}</p>

          <img alt={loadedAdData.name} src={loadedAdData.photo} />
        </div>
      );
    } else {
      return <div className="Detail">LOADING AD...</div>;
    }
  }
}
export default Detail;
