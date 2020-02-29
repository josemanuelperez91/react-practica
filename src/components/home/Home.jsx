import React from 'react';
import './Home.css';
import Filter from './Filter';
import AdsGrid from './AdsGrid';
import { getTags } from '../../js/apiCalls';

const _ = require('lodash');

class Home extends React.Component {
  state = {
    ads: null,
    tags: []
  };

  /**
   * AbortController is used to, in case
   * the session cookie is not valid and the API
   * returns a 'Not logged in error' , prevent the fetching
   * in componentDidMount to produce warnings in React due to 'memory leaks'
   */
  controller = new AbortController();
  componentWillUnmount() {
    this.controller.abort();
  }
  componentDidMount() {
    getTags().then(result => {
      this.setState({
        tags: result.results
      });
    });
  }

  signOut = () => {
    this.props.history.push('/login');
  };

  onFilter = result => {
    if (result.success) {
      this.setState({
        ads: result.results
      });
    } else {
      if (result.error === 'Error: Not logged in') {
        this.props.history.push('/login');
      } else {
        console.error(result.error);
      }
    }
  };

  render() {
    return (
      <div className="Home">
        <button onClick={this.signOut}>Sign Out</button>
        <Filter tags={this.state.tags} onSubmit={this.onFilter}></Filter>
        <AdsGrid ads={this.state.ads}></AdsGrid>
      </div>
    );
  }
}
export default Home;
