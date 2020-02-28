import React from 'react';
import './Home.css';
import { TAGS_URL } from '../../constants/apiURLs';
import Filter from './Filter';
import AdsGrid from './AdsGrid';

const _ = require('lodash');

// import { withRouter, Link } from 'react-router-dom';

class Home extends React.Component {
  state = {
    ads: null,
    tags: []
  };

  componentDidMount() {
    fetch(TAGS_URL, {
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
        this.setState({
          tags: result.results
        });
      })
      .catch(err => {
        alert(err.message);
      });
  }

  onFilter = ads => {
    this.setState({
      ads: ads
    });
  };

  render() {
    return (
      <div className="Home">
        <Filter tags={this.state.tags} onSubmit={this.onFilter}></Filter>
        <AdsGrid ads={this.state.ads}></AdsGrid>
      </div>
    );
  }
}
export default Home;
