import React from 'react';
import Ad from './Ad';
import './AdsGrid.css';

class AdsGrid extends React.Component {
  render() {
    const loadedAds = this.props.ads;
    if (loadedAds !== null) {
      return (
        <div className="AdsGrid">
          {loadedAds.map(ad => {
            return <Ad key={ad._id} data={ad}></Ad>;
          })}
        </div>
      );
    } else {
      return <div className="AdsGrid">LOADING ADS...</div>;
    }
  }
}
export default AdsGrid;
