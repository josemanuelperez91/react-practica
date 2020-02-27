import React from 'react';
import './Home.css';
import { TAGS_URL, ANUNCIOS_URL } from '../../constants/apiURLs';
import Filter from './Filter';
import Ad from './Ad';

// import { withRouter, Link } from 'react-router-dom';

class Home extends React.Component {
  state = {
    ads: null,
    tags: []
  };
  componentDidMount() {
    fetch(ANUNCIOS_URL, {
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
          ads: result.results
        });
      })
      .catch(err => {
        alert(err.message);
      });
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
    const loadedAds = this.state.ads;
    console.log(loadedAds);
    if (loadedAds !== null) {
      return (
        <div className="Home">
          <Filter tags={this.state.tags} onSubmit={this.onFilter}></Filter>
          <div className="Ads-grid">
            {loadedAds.map(ad => {
              return <Ad key={ad._id} data={ad}></Ad>;
            })}
          </div>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}
export default Home;
