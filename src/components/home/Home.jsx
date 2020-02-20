import React from 'react';
import './Home.css';
import { ANUNCIOS_URL } from '../../constants/apiURLs';
import Filter from './Filter';
// import { withRouter, Link } from 'react-router-dom';

class Home extends React.Component {
  state = {
    ads: null,
    filter: {
      name: ''
    }
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
  }
  onFilter = ads => {
    this.setState({
      ads: ads
    });
  };

  render() {
    const loadedAds = this.state.ads;
    if (loadedAds !== null) {
      return (
        <div className="Home">
          <Filter onSubmit={this.onFilter}></Filter>
          {loadedAds.map(ad => {
            return (
              <div key={ad._id}>
                <p>{ad.name}</p>
                <img src={ad.photo} />
              </div>
            );
          })}
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}
export default Home;
