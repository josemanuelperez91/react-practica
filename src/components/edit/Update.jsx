import React from 'react';
import './Edit.css';
import Form from './Form';
import { putAd } from '../../js/apiCalls';
import { Link } from 'react-router-dom';

class Update extends React.Component {
  onUpdate = adData => {
    const adIdentifier = this.props.match.params.ID;
    putAd(adIdentifier, adData).then(response => {
      if (response.ok) {
        this.props.history.push('/home');
      }
    });
  };

  render() {
    return (
      <div className="Edit">
        <Form
          onSubmit={this.onUpdate}
          adIdentifier={this.props.match.params.ID}
        ></Form>
        <button>
          <Link to="/home">Back</Link>
        </button>
      </div>
    );
  }
}

export default Update;
